import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { CompanySignupData, UserSignupData } from "@/types/signup.types";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    type UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function getAuthInstance() {
  return getAuth(getFirebaseApp());
}

function getDbInstance() {
  return getFirestoreDb();
}

async function signIn(
  email: string,
  password: string,
): Promise<UserCredential> {
  const auth = getAuthInstance();
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

async function signOutCurrentUser(): Promise<void> {
  const auth = getAuthInstance();
  await signOut(auth);
}

async function sendPasswordReset(email: string): Promise<void> {
  const auth = getAuthInstance();
  await sendPasswordResetEmail(auth, email.trim(), {
    url: "https://mypetzone-3ff92.firebaseapp.com",
    handleCodeInApp: false,
  });
}

async function registerUserAccount(
  data: UserSignupData,
): Promise<UserCredential> {
  const auth = getAuthInstance();
  const db = getDbInstance();

  const credential = await createUserWithEmailAndPassword(
    auth,
    data.email.trim(),
    data.password,
  );

  await updateProfile(credential.user, {
    displayName: data.displayName.trim(),
  });

  await setDoc(doc(db, "users", credential.user.uid), {
    email: data.email,
    displayName: data.displayName.trim(),
    birthDate: data.birthDate,
    accountType: "user",
    createdAt: new Date().toISOString(),
  });

  return credential;
}

async function registerCompanyAccount(
  data: CompanySignupData,
): Promise<UserCredential> {
  const auth = getAuthInstance();
  const db = getDbInstance();

  const credential = await createUserWithEmailAndPassword(
    auth,
    data.email.trim(),
    data.password,
  );

  await updateProfile(credential.user, {
    displayName: data.businessName,
  });

  await setDoc(doc(db, "companies", credential.user.uid), {
    email: data.email,
    cnpj: data.cnpj.replace(/[^\d]/g, ""),
    businessName: data.businessName,
    businessSegment: data.businessSegment,
    accountType: "company",
    createdAt: new Date().toISOString(),
  });

  return credential;
}

const authService = {
  signIn,
  signOutCurrentUser,
  sendPasswordReset,
  registerUserAccount,
  registerCompanyAccount,
};

export default authService;
