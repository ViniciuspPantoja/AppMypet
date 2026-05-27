import { FormInput } from "@/components/form-input";
import { StatusMessage, StatusType } from "@/components/status-message";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { Pet, UserProfile } from "@/types/pet.types";
import {
    formatDate,
    isValidEmail,
    validateBirthDate,
} from "@/utils/validators";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
    getAuth,
    updateEmail,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { myPetStyles } from "../styles/my-pet.styles";

function getSpeciesEmoji(species: string) {
  switch (species) {
    case "Cachorro":
      return "🐕";
    case "Gato":
      return "🐈";
    case "Pássaro":
      return "🐦";
    case "Peixe":
      return "🐟";
    default:
      return "🐾";
  }
}

export default function MyPetScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    birthDate: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: StatusType }>({
    message: "",
    type: "success",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState<string>("");

  const loadUserData = useCallback(async () => {
    try {
      const auth = getAuth(getFirebaseApp());
      const db = getFirestoreDb();

      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        const petsQuery = query(
          collection(db, "pets"),
          where("tutorUid", "==", auth.currentUser.uid),
        );

        const userData = userDoc.exists() ? userDoc.data() : {};
        const birthDate =
          typeof userData.birthDate === "string" ? userData.birthDate : "";

        setUserProfile({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email || "",
          displayName: auth.currentUser.displayName || "Usuário",
          birthDate,
          photoUrl: auth.currentUser.photoURL || undefined,
          createdAt: new Date(
            auth.currentUser.metadata?.creationTime || Date.now(),
          ).toLocaleDateString("pt-BR"),
        });

        const petsSnapshot = await getDocs(petsQuery);
        setPets(
          petsSnapshot.docs.map((petDoc) => {
            const data = petDoc.data() as Omit<Pet, "id">;
            return {
              id: petDoc.id,
              ...data,
            };
          }),
        );

        // Inicializa dados do formulário de edição
        setEditForm({
          displayName: auth.currentUser.displayName || "",
          birthDate,
          email: auth.currentUser.email || "",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData]),
  );

  async function pickImageFromLibrary() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso às suas fotos para selecionar uma imagem de perfil.",
        );
        return null;
      }

      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.cancelled === true) return null;

      // Newer Expo returns result.assets; support both shapes
      const uri = result.assets?.[0]?.uri ?? result.uri;
      return uri ?? null;
    } catch (err) {
      console.warn("Image pick error", err);
      return null;
    }
  }

  async function handleDeletePet(id: string) {
    if (!id) return;
    try {
      setDeleting(true);
      const db = getFirestoreDb();
      await deleteDoc(doc(db, "pets", id));
      setPets((prev) => prev.filter((p) => p.id !== id));
      setDeleteModalVisible(false);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível excluir o pet.");
    } finally {
      setDeleting(false);
    }
  }

  async function pickImageFromCamera() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de acesso à câmera para tirar uma foto na hora.",
        );
        return null;
      }

      const result: any = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.cancelled === true) return null;

      const uri = result.assets?.[0]?.uri ?? result.uri;
      return uri ?? null;
    } catch (err) {
      console.warn("Camera pick error", err);
      return null;
    }
  }

  async function updateProfilePhoto(source: "camera" | "library") {
    const uri =
      source === "camera"
        ? await pickImageFromCamera()
        : await pickImageFromLibrary();

    if (!uri) return;

    setUserProfile((prev) => (prev ? { ...prev, photoUrl: uri } : prev));
  }

  function handleAvatarPress() {
    Alert.alert("Foto de perfil", "Escolha como deseja enviar sua foto.", [
      {
        text: "Tirar foto",
        onPress: () => {
          void updateProfilePhoto("camera");
        },
      },
      {
        text: "Escolher da galeria",
        onPress: () => {
          void updateProfilePhoto("library");
        },
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  if (loading) {
    return (
      <SafeAreaView style={myPetStyles.safeArea}>
        <View style={myPetStyles.hero}>
          <Text>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={myPetStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={myPetStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={myPetStyles.header}>
            <Pressable
              style={myPetStyles.backButton}
              onPress={() => router.back()}
            >
              <Text style={myPetStyles.backButtonText}>‹</Text>
            </Pressable>
          </View>
          <Modal
            visible={deleteModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setDeleteModalVisible(false)}
          >
            <View style={myPetStyles.modalOverlay}>
              <View style={myPetStyles.modalContent}>
                <Text style={myPetStyles.modalTitle}>Excluir pet</Text>
                <ScrollView style={{ width: "100%" }}>
                  {pets.filter((p) => p.tutorUid === userProfile?.uid)
                    .length === 0 ? (
                    <Text
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        marginTop: 8,
                      }}
                    >
                      Nenhum pet vinculado encontrado.
                    </Text>
                  ) : (
                    pets
                      .filter((p) => p.tutorUid === userProfile?.uid)
                      .map((p) => (
                        <View key={p.id} style={myPetStyles.petDeleteRow}>
                          <Text style={{ color: "#fff", fontWeight: "800" }}>
                            {p.name} • {p.species}
                          </Text>
                          <Pressable
                            style={({ pressed }) => [
                              myPetStyles.petDeleteButton,
                              pressed && {
                                opacity: 0.88,
                                transform: [{ scale: 0.97 }],
                              },
                            ]}
                            onPress={() => {
                              setConfirmDeleteId(p.id);
                              setConfirmDeleteName(p.name);
                            }}
                            disabled={deleting}
                            hitSlop={8}
                          >
                            {deleting ? (
                              <ActivityIndicator color="#fff" />
                            ) : (
                              <Text style={myPetStyles.petDeleteButtonText}>
                                Excluir
                              </Text>
                            )}
                          </Pressable>
                        </View>
                      ))
                  )}
                </ScrollView>
                <Pressable
                  style={[myPetStyles.modalButton, { marginTop: 12 }]}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text style={myPetStyles.modalButtonText}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            visible={!!confirmDeleteId}
            transparent
            animationType="fade"
            onRequestClose={() => setConfirmDeleteId(null)}
          >
            <View style={myPetStyles.modalOverlay}>
              <View style={myPetStyles.modalContent}>
                <Text style={myPetStyles.modalTitle}>
                  Excluir {confirmDeleteName}?
                </Text>
                <Text style={myPetStyles.modalMessage}>
                  Esta ação não pode ser desfeita.
                </Text>

                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Pressable
                    style={({ pressed }) => [
                      myPetStyles.modalButton,
                      { flex: 1 },
                      pressed && { opacity: 0.88 },
                    ]}
                    onPress={() => setConfirmDeleteId(null)}
                  >
                    <Text style={myPetStyles.modalButtonText}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      [
                        myPetStyles.modalButton,
                        {
                          flex: 1,
                          backgroundColor: "#FF6B6B",
                          borderColor: "rgba(255,107,107,0.9)",
                        },
                      ],
                      pressed && { opacity: 0.88 },
                    ]}
                    onPress={() => {
                      if (confirmDeleteId) {
                        handleDeletePet(confirmDeleteId);
                        setConfirmDeleteId(null);
                      }
                    }}
                  >
                    <Text style={myPetStyles.modalButtonText}>Excluir</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <View style={myPetStyles.hero}>
            <View style={myPetStyles.avatarWrap}>
              {userProfile?.photoUrl ? (
                <Image
                  source={{ uri: userProfile.photoUrl }}
                  style={myPetStyles.avatarImage}
                />
              ) : (
                <Text style={myPetStyles.avatarPlaceholder}>👤</Text>
              )}

              <Pressable
                style={myPetStyles.avatarEditButton}
                onPress={handleAvatarPress}
              >
                <Text style={myPetStyles.avatarEditIcon}>✏️</Text>
              </Pressable>
            </View>
            {/* Avatar edit badge is used instead of separate action buttons */}

            <View style={myPetStyles.card}>
              {!!status.message && (
                <StatusMessage
                  type={status.type}
                  message={status.message}
                  visible={!!status.message}
                  onDismiss={() => setStatus({ message: "", type: "success" })}
                />
              )}

              {isEditing ? (
                <>
                  <FormInput
                    placeholder="Nome"
                    value={editForm.displayName}
                    onChangeText={(v) =>
                      setEditForm((p) => ({ ...p, displayName: v }))
                    }
                    editable={!saving}
                  />

                  <FormInput
                    placeholder="Email"
                    value={editForm.email}
                    onChangeText={(v) =>
                      setEditForm((p) => ({ ...p, email: v }))
                    }
                    editable={!saving}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <FormInput
                    placeholder="DD/MM/AAAA"
                    value={editForm.birthDate}
                    onChangeText={(v) =>
                      setEditForm((p) => ({ ...p, birthDate: formatDate(v) }))
                    }
                    editable={!saving}
                    maxLength={10}
                  />

                  {/* form inputs only; save/cancel rendered below to replace the Edit button */}
                </>
              ) : (
                <>
                  <Text style={myPetStyles.name}>
                    {userProfile?.displayName || "Usuário"}
                  </Text>
                  <Text style={myPetStyles.email}>{userProfile?.email}</Text>

                  <View style={myPetStyles.infoGrid}>
                    <View style={myPetStyles.infoItem}>
                      <Text style={myPetStyles.infoLabel}>
                        Data de nascimento
                      </Text>
                      <Text style={myPetStyles.infoValue}>
                        {userProfile?.birthDate || "Não informado"}
                      </Text>
                    </View>

                    <View style={myPetStyles.infoItem}>
                      <Text style={myPetStyles.infoLabel}>Membro desde</Text>
                      <Text style={myPetStyles.infoValue}>
                        {userProfile?.createdAt || "Não informado"}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {/* Bottom action: when editing, show Save/Cancel; otherwise show Edit */}
              {isEditing ? (
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Pressable
                    style={myPetStyles.actionButton}
                    onPress={async () => {
                      // Delegate to save handler
                      const auth = getAuth(getFirebaseApp());
                      const db = getFirestoreDb();
                      if (!auth.currentUser) return;

                      // Validate name
                      if (!editForm.displayName.trim()) {
                        setStatus({
                          message: "Nome é obrigatório.",
                          type: "error",
                        });
                        return;
                      }

                      // Validate birth date if provided
                      if (editForm.birthDate) {
                        const res = validateBirthDate(editForm.birthDate);
                        if (!res.isValid) {
                          setStatus({
                            message: res.error || "Data inválida.",
                            type: "error",
                          });
                          return;
                        }
                      }

                      // Validate email format
                      if (editForm.email && !isValidEmail(editForm.email)) {
                        setStatus({
                          message: "Email inválido.",
                          type: "error",
                        });
                        return;
                      }

                      try {
                        setSaving(true);
                        // Update email if changed
                        if (
                          editForm.email &&
                          auth.currentUser.email !== editForm.email
                        ) {
                          try {
                            await updateEmail(auth.currentUser, editForm.email);
                          } catch (emailErr) {
                            const msg =
                              emailErr instanceof Error
                                ? emailErr.message
                                : String(emailErr);
                            setStatus({
                              message: `Erro ao atualizar email: ${msg}`,
                              type: "error",
                            });
                            setSaving(false);
                            return;
                          }
                        }

                        if (editForm.password) {
                          await updatePassword(
                            auth.currentUser,
                            editForm.password,
                          );
                        }

                        // Update auth profile
                        await updateProfile(auth.currentUser, {
                          displayName: editForm.displayName.trim(),
                        });

                        // Update firestore user doc
                        await setDoc(
                          doc(db, "users", auth.currentUser.uid),
                          {
                            displayName: editForm.displayName.trim(),
                            birthDate: editForm.birthDate || null,
                            email: editForm.email || null,
                          },
                          { merge: true },
                        );

                        setUserProfile((prev) =>
                          prev
                            ? {
                                ...prev,
                                displayName: editForm.displayName.trim(),
                                birthDate: editForm.birthDate || prev.birthDate,
                                email: editForm.email || prev.email,
                              }
                            : prev,
                        );

                        setStatus({ message: "", type: "success" });
                        setShowSuccessModal(true);
                        setIsEditing(false);
                      } catch (err) {
                        const msg =
                          err instanceof Error
                            ? err.message
                            : "Erro ao atualizar perfil.";
                        setStatus({ message: `Erro: ${msg}`, type: "error" });
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving}
                  >
                    <Text style={myPetStyles.actionButtonText}>
                      {saving ? "Salvando..." : "Salvar"}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[myPetStyles.actionButton, { marginLeft: 8 }]}
                    onPress={() => {
                      setIsEditing(false);
                      setEditForm({
                        displayName: userProfile?.displayName || "",
                        birthDate: userProfile?.birthDate || "",
                        email: userProfile?.email || "",
                        password: "",
                      });
                      setStatus({ message: "", type: "success" });
                    }}
                    disabled={saving}
                  >
                    <Text style={myPetStyles.actionButtonText}>Cancelar</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={myPetStyles.actionButton}
                  onPress={() => {
                    setIsEditing(true);
                    setEditForm({
                      displayName: userProfile?.displayName || "",
                      birthDate: userProfile?.birthDate || "",
                      email: userProfile?.email || "",
                    });
                    setStatus({ message: "", type: "success" });
                  }}
                >
                  <Text style={myPetStyles.actionButtonText}>
                    Editar perfil
                  </Text>
                </Pressable>
              )}

              <Modal
                visible={showSuccessModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSuccessModal(false)}
              >
                <View style={myPetStyles.modalOverlay}>
                  <View style={myPetStyles.modalContent}>
                    <Text style={myPetStyles.modalTitle}>
                      Perfil atualizado
                    </Text>
                    <Text style={myPetStyles.modalMessage}>
                      Seu perfil foi atualizado com sucesso.
                    </Text>
                    <Pressable
                      style={myPetStyles.modalButton}
                      onPress={() => setShowSuccessModal(false)}
                    >
                      <Text style={myPetStyles.modalButtonText}>OK</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>

          <View style={myPetStyles.section}>
            <View style={myPetStyles.sectionHeader}>
              <Text style={myPetStyles.sectionTitle}>Seção dos pets</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  style={myPetStyles.sectionAction}
                  onPress={() => router.push("/pet-register")}
                >
                  <Text style={myPetStyles.sectionActionText}>+ Adicionar</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    myPetStyles.sectionDelete,
                    pressed && myPetStyles.sectionDeletePressed,
                  ]}
                  onPress={() => setDeleteModalVisible(true)}
                >
                  <Text style={myPetStyles.sectionDeleteText}>- Excluir</Text>
                </Pressable>
              </View>
            </View>

            {pets.length === 0 ? (
              <View style={myPetStyles.emptyState}>
                <Text style={myPetStyles.emptyEmoji}>🐾</Text>
                <Text style={myPetStyles.emptyTitle}>
                  Nenhum pet cadastrado
                </Text>
                <Text style={myPetStyles.emptyText}>
                  Adicione o primeiro pet para começar a preencher esta área.
                </Text>
              </View>
            ) : (
              <View style={myPetStyles.petList}>
                {pets.map((pet) => (
                  <View key={pet.id} style={myPetStyles.petCard}>
                    <View style={myPetStyles.petAvatarWrap}>
                      {pet.photoUrl ? (
                        <Image
                          source={{ uri: pet.photoUrl }}
                          style={myPetStyles.petAvatarImage}
                        />
                      ) : (
                        <Text style={myPetStyles.petAvatarEmoji}>
                          {getSpeciesEmoji(pet.species)}
                        </Text>
                      )}
                    </View>

                    <View style={myPetStyles.petContent}>
                      <Text style={myPetStyles.petName}>{pet.name}</Text>
                      <Text style={myPetStyles.petMeta}>
                        {pet.species} • {pet.breed}
                      </Text>
                      <View style={myPetStyles.petInfoRow}>
                        <Text style={myPetStyles.petInfoText}>
                          {pet.age} ano{pet.age > 1 ? "s" : ""}
                        </Text>
                        <Text style={myPetStyles.petInfoText}>
                          {pet.weight}kg
                        </Text>
                      </View>
                    </View>

                    <Pressable
                      onPress={() =>
                        router.push({
                          pathname: "/pet-details/[petId]",
                          params: { petId: pet.id },
                        })
                      }
                      style={myPetStyles.petChevronButton}
                    >
                      <Text style={myPetStyles.petChevron}>→</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
