import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { Pet, UserProfile } from "@/types/pet.types";
import { isValidEmail, validateBirthDate } from "@/utils/validators";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";

export interface UpdateCurrentUserProfileInput {
  displayName: string;
  birthDate?: string;
  email?: string;
}

export interface MyPetEditFormData {
  displayName: string;
  birthDate: string;
  email: string;
}

export interface MyPetScreenData {
  userProfile: UserProfile | null;
  pets: Pet[];
  editForm: MyPetEditFormData;
}

function getAuthInstance() {
  return getAuth(getFirebaseApp());
}

function getDbInstance() {
  return getFirestoreDb();
}

function formatCreatedAt(value?: string | null): string {
  if (!value) {
    return new Date().toLocaleDateString("pt-BR");
  }

  return new Date(value).toLocaleDateString("pt-BR");
}

function buildUserProfile(): UserProfile | null {
  const auth = getAuthInstance();

  if (!auth.currentUser) {
    return null;
  }

  return {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email || "",
    displayName: auth.currentUser.displayName || "Usuário",
    photoUrl: auth.currentUser.photoURL || undefined,
    createdAt: formatCreatedAt(auth.currentUser.metadata?.creationTime),
  };
}

function buildEditForm(userProfile: UserProfile | null): MyPetEditFormData {
  return {
    displayName: userProfile?.displayName || "",
    birthDate: userProfile?.birthDate || "",
    email: userProfile?.email || "",
  };
}

async function getCurrentUserPets(): Promise<Pet[]> {
  const auth = getAuthInstance();
  const db = getDbInstance();

  if (!auth.currentUser) {
    return [];
  }

  const petsQuery = query(
    collection(db, "pets"),
    where("tutorUid", "==", auth.currentUser.uid),
  );

  const petsSnapshot = await getDocs(petsQuery);

  return petsSnapshot.docs.map((petDoc) => {
    const data = petDoc.data() as Omit<Pet, "id">;
    return {
      id: petDoc.id,
      ...data,
    };
  });
}

async function loadMyPetScreenData(): Promise<MyPetScreenData> {
  const userProfile = buildUserProfile();

  if (!userProfile) {
    return {
      userProfile: null,
      pets: [],
      editForm: buildEditForm(null),
    };
  }

  const pets = await getCurrentUserPets();

  return {
    userProfile,
    pets,
    editForm: buildEditForm(userProfile),
  };
}

function validateMyPetProfileInput(input: MyPetEditFormData): string | null {
  if (!input.displayName.trim()) {
    return "Nome é obrigatório.";
  }

  if (input.birthDate) {
    const birthDateResult = validateBirthDate(input.birthDate);
    if (!birthDateResult.isValid) {
      return birthDateResult.error || "Data inválida.";
    }
  }

  if (input.email && !isValidEmail(input.email)) {
    return "Email inválido.";
  }

  return null;
}

async function updateCurrentUserProfile(
  input: UpdateCurrentUserProfileInput,
): Promise<UserProfile> {
  const auth = getAuthInstance();
  const db = getDbInstance();

  if (!auth.currentUser) {
    throw new Error("Usuário não autenticado.");
  }

  if (input.email && auth.currentUser.email !== input.email) {
    await updateEmail(auth.currentUser, input.email);
  }

  await updateProfile(auth.currentUser, {
    displayName: input.displayName.trim(),
  });

  await setDoc(
    doc(db, "users", auth.currentUser.uid),
    {
      displayName: input.displayName.trim(),
      birthDate: input.birthDate || null,
      email: input.email || null,
    },
    { merge: true },
  );

  return {
    uid: auth.currentUser.uid,
    email: input.email || auth.currentUser.email || "",
    displayName: input.displayName.trim(),
    photoUrl: auth.currentUser.photoURL || undefined,
    birthDate: input.birthDate,
    createdAt: formatCreatedAt(auth.currentUser.metadata?.creationTime),
  };
}

const profileService = {
  buildUserProfile,
  buildEditForm,
  getCurrentUserPets,
  loadMyPetScreenData,
  validateMyPetProfileInput,
  updateCurrentUserProfile,
};

export default profileService;
