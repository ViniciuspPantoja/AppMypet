import { getFirebaseApp } from "@/database/firebase/firebase";
import { Pet, UserProfile } from "@/types/pet.types";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { myPetStyles } from "../styles/my-pet.styles";

export default function MyPetScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

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

  async function loadUserData() {
    try {
      const auth = getAuth(getFirebaseApp());

      if (auth.currentUser) {
        setUserProfile({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email || "",
          displayName: auth.currentUser.displayName || "Usuário",
          photoUrl: auth.currentUser.photoURL || undefined,
          createdAt: new Date(
            auth.currentUser.metadata?.creationTime || Date.now(),
          ).toLocaleDateString("pt-BR"),
        });

        setPets([
          {
            id: "1",
            name: "Max",
            species: "Cachorro",
            breed: "Golden Retriever",
            age: 3,
            weight: 32,
            registrationDate: "2023-05-15",
          },
          {
            id: "2",
            name: "Luna",
            species: "Gato",
            breed: "Persa",
            age: 2,
            weight: 4.5,
            registrationDate: "2023-08-20",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
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
          </View>
          <View style={myPetStyles.avatarActions}>
            {!userProfile?.photoUrl ? (
              <Pressable
                onPress={handleAddPhoto}
                style={myPetStyles.avatarActionButton}
              >
                <Text style={myPetStyles.avatarActionText}>Adicionar foto</Text>
              </Pressable>
            ) : (
              <>
                <Pressable
                  onPress={handleChangePhoto}
                  style={myPetStyles.avatarActionButton}
                >
                  <Text style={myPetStyles.avatarActionText}>Trocar</Text>
                </Pressable>
                <Pressable
                  onPress={handleDeletePhoto}
                  style={myPetStyles.avatarActionButtonDanger}
                >
                  <Text style={myPetStyles.avatarActionText}>Remover</Text>
                </Pressable>
              </>
            )}
          </View>

          <View style={myPetStyles.card}>
            <Text style={myPetStyles.name}>
              {userProfile?.displayName || "Usuário"}
            </Text>
            <Text style={myPetStyles.email}>{userProfile?.email}</Text>

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

            <Pressable style={myPetStyles.actionButton}>
              <Text style={myPetStyles.actionButtonText}>Editar perfil</Text>
            </Pressable>
          </View>
        </View>

        <View style={myPetStyles.section}>
          <View style={myPetStyles.sectionHeader}>
            <Text style={myPetStyles.sectionTitle}>Seção dos pets</Text>
            <Pressable style={myPetStyles.sectionAction}>
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
                <Pressable key={pet.id} style={myPetStyles.petCard}>
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

                  <Text style={myPetStyles.petChevron}>→</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
