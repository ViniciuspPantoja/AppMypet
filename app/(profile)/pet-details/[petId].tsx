import { useAuth } from "@/contexts/AuthContext";
import { getPetByIdForTutor } from "@/database/sqlite/pets";
import { listVaccinesByPet } from "@/database/sqlite/vaccines";
import { Pet } from "@/types/pet.types";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { petDetailsStyles } from "../../styles/pet-details.styles";

interface VaccineItem {
  id: string;
  name: string;
  date: string;
  nextDue: string;
}

export default function PetDetailsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ petId?: string }>();
  const petId = useMemo(() => String(params.petId || ""), [params.petId]);

  const [pet, setPet] = useState<Pet | null>(null);
  const [vaccines, setVaccines] = useState<VaccineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPetDetails = useCallback(async () => {
    try {
      if (!user || !petId) {
        setPet(null);
        setVaccines([]);
        return;
      }

      const matchedPet = await getPetByIdForTutor(petId, user.id);
      if (!matchedPet) {
        setPet(null);
        setVaccines([]);
        return;
      }

      setPet(matchedPet);

      const vaccineRows = await listVaccinesByPet(user.id, petId);
      setVaccines(
        vaccineRows.map((v) => ({
          id: v.id,
          name: v.name,
          date: v.applicationDate,
          nextDue: v.nextDue,
        })),
      );
    } finally {
      setLoading(false);
    }
  }, [petId, user]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadPetDetails();
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
                {pet.species === "Gato" ? "🐈" : "🐕"}
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
          <Text style={petDetailsStyles.sectionTitle}>Carteirinha de vacinas</Text>

          {vaccines.length === 0 ? (
            <View style={petDetailsStyles.sectionCard}>
              <Text style={petDetailsStyles.emptyText}>
                Nenhuma vacina registrada para este pet.
              </Text>
            </View>
          ) : (
            vaccines.map((vaccine) => (
              <View key={vaccine.id} style={petDetailsStyles.vaccineCard}>
                <View style={petDetailsStyles.vaccineHeader}>
                  <Text style={petDetailsStyles.vaccineName}>
                    {vaccine.name}
                  </Text>
                </View>
                <Text style={petDetailsStyles.vaccineMeta}>
                  Aplicação em {vaccine.date}
                </Text>
                <Text style={petDetailsStyles.vaccineMeta}>
                  Próximo reforço: {vaccine.nextDue}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
