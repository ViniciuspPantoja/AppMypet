import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { Pet } from "@/types/pet.types";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { petDetailsStyles } from "../../styles/pet-details.styles";

interface VaccineItem {
  id: string;
  name: string;
  date: string;
  nextDue: string;
  status?: string;
  petId?: string;
  tutorUid?: string;
}

export default function PetDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ petId?: string }>();
  const petId = useMemo(() => String(params.petId || ""), [params.petId]);

  const [pet, setPet] = useState<Pet | null>(null);
  const [vaccines, setVaccines] = useState<VaccineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPetDetails = useCallback(async () => {
    try {
      const auth = getAuth(getFirebaseApp());
      const db = getFirestoreDb();

      if (!auth.currentUser || !petId) {
        setPet(null);
        setVaccines([]);
        return;
      }

      const petsByTutorSnapshot = await getDocs(
        query(
          collection(db, "pets"),
          where("tutorUid", "==", auth.currentUser.uid),
        ),
      );

      const matchedPet = petsByTutorSnapshot.docs.find(
        (docItem) => docItem.id === petId,
      );

      if (!matchedPet) {
        setPet(null);
        setVaccines([]);
        return;
      }

      const petData = matchedPet.data() as Omit<Pet, "id">;
      setPet({ id: matchedPet.id, ...petData });

      const vaccinesSnapshot = await getDocs(
        query(
          collection(db, "vaccines"),
          where("tutorUid", "==", auth.currentUser.uid),
          where("petId", "==", matchedPet.id),
        ),
      );

      setVaccines(
        vaccinesSnapshot.docs.map((vacDoc) => ({
          id: vacDoc.id,
          ...(vacDoc.data() as Omit<VaccineItem, "id">),
        })),
      );
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useFocusEffect(
    useCallback(() => {
      loadPetDetails();
    }, [loadPetDetails]),
  );

  const vaccineCount = vaccines.length;

  if (loading) {
    return (
      <SafeAreaView style={petDetailsStyles.safeArea}>
        <View style={petDetailsStyles.header}>
          <Pressable
            onPress={() => router.back()}
            style={petDetailsStyles.backButton}
          >
            <Text style={petDetailsStyles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={petDetailsStyles.headerTitle}>Detalhes do pet</Text>
        </View>
        <View style={petDetailsStyles.section}>
          <View style={petDetailsStyles.sectionCard}>
            <Text style={petDetailsStyles.emptyText}>Carregando pet...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!pet) {
    return (
      <SafeAreaView style={petDetailsStyles.safeArea}>
        <View style={petDetailsStyles.header}>
          <Pressable
            onPress={() => router.back()}
            style={petDetailsStyles.backButton}
          >
            <Text style={petDetailsStyles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={petDetailsStyles.headerTitle}>Detalhes do pet</Text>
        </View>
        <View style={petDetailsStyles.section}>
          <View style={petDetailsStyles.sectionCard}>
            <View style={petDetailsStyles.emptyState}>
              <Text style={petDetailsStyles.emptyEmoji}>🐾</Text>
              <Text style={petDetailsStyles.emptyText}>Pet não encontrado</Text>
              <Text style={petDetailsStyles.emptySubtext}>
                Volte ao perfil e tente abrir outro card.
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={petDetailsStyles.safeArea}>
      <ScrollView contentContainerStyle={petDetailsStyles.scrollContent}>
        <View style={petDetailsStyles.header}>
          <Pressable
            onPress={() => router.back()}
            style={petDetailsStyles.backButton}
          >
            <Text style={petDetailsStyles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={petDetailsStyles.headerTitle}>Detalhes do pet</Text>
        </View>

        <View style={petDetailsStyles.hero}>
          <View style={petDetailsStyles.heroCard}>
            <View style={petDetailsStyles.avatarWrap}>
              <Text style={petDetailsStyles.avatarEmoji}>
                {pet.species === "Cachorro"
                  ? "🐕"
                  : pet.species === "Gato"
                    ? "🐈"
                    : pet.species === "Pássaro"
                      ? "🐦"
                      : pet.species === "Peixe"
                        ? "🐟"
                        : "🐾"}
              </Text>
            </View>
            <Text style={petDetailsStyles.petName}>{pet.name}</Text>
            <Text style={petDetailsStyles.petSubtitle}>
              {pet.species} • {pet.breed}
              {pet.sex ? ` • ${pet.sex}` : ""}
            </Text>

            <View style={petDetailsStyles.quickStats}>
              <View style={petDetailsStyles.statCard}>
                <Text style={petDetailsStyles.statLabel}>Idade</Text>
                <Text style={petDetailsStyles.statValue}>{pet.age} anos</Text>
              </View>
              <View style={petDetailsStyles.statCard}>
                <Text style={petDetailsStyles.statLabel}>Peso</Text>
                <Text style={petDetailsStyles.statValue}>{pet.weight} kg</Text>
              </View>
              <View style={petDetailsStyles.statCard}>
                <Text style={petDetailsStyles.statLabel}>Vacinas</Text>
                <Text style={petDetailsStyles.statValue}>{vaccineCount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={petDetailsStyles.section}>
          <Text style={petDetailsStyles.sectionTitle}>Informações do pet</Text>
          <View style={petDetailsStyles.sectionCard}>
            <View style={petDetailsStyles.infoGrid}>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Nome</Text>
                <Text style={petDetailsStyles.infoValue}>{pet.name}</Text>
              </View>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Espécie</Text>
                <Text style={petDetailsStyles.infoValue}>{pet.species}</Text>
              </View>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Raça</Text>
                <Text style={petDetailsStyles.infoValue}>{pet.breed}</Text>
              </View>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Sexo</Text>
                <Text style={petDetailsStyles.infoValue}>
                  {pet.sex || "Não informado"}
                </Text>
              </View>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Idade</Text>
                <Text style={petDetailsStyles.infoValue}>{pet.age} anos</Text>
              </View>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Peso</Text>
                <Text style={petDetailsStyles.infoValue}>{pet.weight} kg</Text>
              </View>
              <View style={petDetailsStyles.infoRow}>
                <Text style={petDetailsStyles.infoLabel}>Tutor</Text>
                <Text style={petDetailsStyles.infoValue}>
                  {pet.tutorName || "Não informado"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={petDetailsStyles.section}>
          <Text style={petDetailsStyles.sectionTitle}>Vacinas do pet</Text>
          <View style={petDetailsStyles.sectionCard}>
            {vaccines.length > 0 ? (
              vaccines.map((vaccine) => (
                <View key={vaccine.id} style={petDetailsStyles.vaccineCard}>
                  <View style={petDetailsStyles.vaccineHeader}>
                    <Text style={petDetailsStyles.vaccineName}>
                      {vaccine.name}
                    </Text>
                    <Text style={petDetailsStyles.vaccineStatus}>Aplicada</Text>
                  </View>
                  <Text style={petDetailsStyles.vaccineMeta}>
                    Aplicação em {vaccine.date}
                  </Text>
                  <Text style={petDetailsStyles.vaccineDates}>
                    Próximo reforço: {vaccine.nextDue}
                  </Text>
                </View>
              ))
            ) : (
              <View style={petDetailsStyles.emptyState}>
                <Text style={petDetailsStyles.emptyEmoji}>💉</Text>
                <Text style={petDetailsStyles.emptyText}>
                  Nenhuma vacina vinculada
                </Text>
                <Text style={petDetailsStyles.emptySubtext}>
                  Aqui aparecerão as vacinas cadastradas para este pet.
                </Text>
              </View>
            )}

            <Pressable
              style={petDetailsStyles.sectionAction}
              onPress={() => router.push("/vaccines")}
            >
              <Text style={petDetailsStyles.sectionActionText}>
                Ver carteirinha completa
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={petDetailsStyles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}
