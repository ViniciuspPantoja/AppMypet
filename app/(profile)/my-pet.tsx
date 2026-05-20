import { FormInput } from "@/components/form-input";
import { StatusMessage, StatusType } from "@/components/status-message";
import { useAuth } from "@/contexts/AuthContext";
import { listPetsByTutor } from "@/database/sqlite/pets";
import { updateUserProfile } from "@/database/sqlite/users";
import { Pet, UserProfile } from "@/types/pet.types";
import {
    formatDate,
    isValidEmail,
    validateBirthDate,
} from "@/utils/validators";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { myPetStyles } from "../styles/my-pet.styles";

export default function MyPetScreen() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
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

  const loadUserData = useCallback(async () => {
    try {
      if (!user) {
        setUserProfile(null);
        setPets([]);
        return;
      }

      const petsList = await listPetsByTutor(user.id);

      setUserProfile({
        uid: user.id,
        email: user.email,
        displayName: user.displayName || "Usuário",
        photoUrl: user.photoUrl,
        birthDate: user.birthDate,
        createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR"),
      });

      setPets(petsList);

      setEditForm({
        displayName: user.displayName || "",
        birthDate: user.birthDate || "",
        email: user.email,
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

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

  async function handleAddPhoto() {
    const uri = await pickImageFromLibrary();
    if (!uri) return;
    setUserProfile((prev) => (prev ? { ...prev, photoUrl: uri } : prev));
  }

  async function handleChangePhoto() {
    const uri = await pickImageFromLibrary();
    if (!uri) return;
    setUserProfile((prev) => (prev ? { ...prev, photoUrl: uri } : prev));
  }

  function handleDeletePhoto() {
    Alert.alert("Remover foto", "Deseja remover a foto de perfil?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () =>
          setUserProfile((prev) =>
            prev ? { ...prev, photoUrl: undefined } : prev,
          ),
      },
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
      <ScrollView contentContainerStyle={myPetStyles.scrollContent}>
        <View style={myPetStyles.header}>
          <Pressable
            style={myPetStyles.backButton}
            onPress={() => router.back()}
          >
            <Text style={myPetStyles.backButtonText}>← Voltar</Text>
          </Pressable>
        </View>

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
              onPress={
                userProfile?.photoUrl ? handleChangePhoto : handleAddPhoto
              }
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
                  onChangeText={(v) => setEditForm((p) => ({ ...p, email: v }))}
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
              </>
            )}

            {!isEditing && (
              <View style={myPetStyles.infoGrid}>
                <View style={myPetStyles.infoItem}>
                  <Text style={myPetStyles.infoLabel}>Data de nascimento</Text>
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
            )}

            {/* Bottom action: when editing, show Save/Cancel; otherwise show Edit */}
            {isEditing ? (
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Pressable
                  style={myPetStyles.actionButton}
                  onPress={async () => {
                    if (!user) return;

                    if (!editForm.displayName.trim()) {
                      setStatus({
                        message: "Nome é obrigatório.",
                        type: "error",
                      });
                      return;
                    }

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

                    if (editForm.email && !isValidEmail(editForm.email)) {
                      setStatus({ message: "Email inválido.", type: "error" });
                      return;
                    }

                    try {
                      setSaving(true);
                      const updated = await updateUserProfile(user.id, {
                        displayName: editForm.displayName.trim(),
                        birthDate: editForm.birthDate || undefined,
                        email: editForm.email.trim(),
                        photoUrl: userProfile?.photoUrl,
                      });

                      await refreshUser();

                      setUserProfile({
                        uid: updated.id,
                        email: updated.email,
                        displayName: updated.displayName,
                        photoUrl: updated.photoUrl,
                        birthDate: updated.birthDate,
                        createdAt: new Date(updated.createdAt).toLocaleDateString(
                          "pt-BR",
                        ),
                      });

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
                <Text style={myPetStyles.actionButtonText}>Editar perfil</Text>
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
                  <Text style={myPetStyles.modalTitle}>Perfil atualizado</Text>
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
            <Pressable
              style={myPetStyles.sectionAction}
              onPress={() => router.push("/pet-register")}
            >
              <Text style={myPetStyles.sectionActionText}>+ Adicionar</Text>
            </Pressable>
          </View>

          {pets.length === 0 ? (
            <View style={myPetStyles.emptyState}>
              <Text style={myPetStyles.emptyEmoji}>🐾</Text>
              <Text style={myPetStyles.emptyTitle}>Nenhum pet cadastrado</Text>
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
                        {pet.species === "Cachorro" ? "🐕" : "🐈"}
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
    </SafeAreaView>
  );
}
