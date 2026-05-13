import { vaccinesStyles } from "@/app/styles/vaccines.styles";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

interface Vaccine {
  id: string;
  name: string;
  date: string;
  nextDue: string;
  petName: string;
}

export default function VaccinesScreen() {
  const router = useRouter();

  // Mock data
  const vaccines: Vaccine[] = [
    {
      id: "1",
      name: "Raiva",
      date: "15/03/2025",
      nextDue: "15/03/2026",
      petName: "Max",
    },
    {
      id: "2",
      name: "V10",
      date: "20/02/2025",
      nextDue: "20/02/2026",
      petName: "Max",
    },
    {
      id: "3",
      name: "Raiva",
      date: "10/04/2025",
      nextDue: "10/04/2026",
      petName: "Luna",
    },
  ];

  const upcomingVaccines = vaccines.filter(
    (v) =>
      new Date(v.nextDue) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  );

  return (
    <SafeAreaView style={vaccinesStyles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={vaccinesStyles.header}>
          <Pressable
            onPress={() => router.back()}
            style={vaccinesStyles.backButton}
          >
            <Text style={vaccinesStyles.backButtonText}>← Voltar</Text>
          </Pressable>
          <Text style={vaccinesStyles.headerTitle}>Vacinas</Text>
        </View>

        {/* Upcoming Vaccines Alert */}
        {upcomingVaccines.length > 0 && (
          <View style={vaccinesStyles.alertSection}>
            <Text style={vaccinesStyles.alertTitle}>⚠️ Vacinas Próximas</Text>
            <Text style={vaccinesStyles.alertDescription}>
              Você tem {upcomingVaccines.length} vacinação(ões) vencendo nos
              próximos 30 dias
            </Text>
          </View>
        )}

        {/* Add New Vaccine Button */}
        <View style={vaccinesStyles.actionSection}>
          <Pressable style={vaccinesStyles.addButton}>
            <Text style={vaccinesStyles.addButtonText}>
              + Adicionar Vacinação
            </Text>
          </Pressable>
        </View>

        {/* Vaccines List Section */}
        <View style={vaccinesStyles.section}>
          <Text style={vaccinesStyles.sectionTitle}>
            Histórico de Vacinações
          </Text>

          {vaccines.length > 0 ? (
            vaccines.map((vaccine) => (
              <View key={vaccine.id} style={vaccinesStyles.vaccineCard}>
                <View style={vaccinesStyles.vaccineCardHeader}>
                  <Text style={vaccinesStyles.vaccineName}>{vaccine.name}</Text>
                  <Text style={vaccinesStyles.vaccineStatus}>✓ Aplicada</Text>
                </View>

                <View style={vaccinesStyles.vaccineCardInfo}>
                  <View style={vaccinesStyles.infoRow}>
                    <Text style={vaccinesStyles.infoLabel}>Pet:</Text>
                    <Text style={vaccinesStyles.infoValue}>
                      {vaccine.petName}
                    </Text>
                  </View>
                  <View style={vaccinesStyles.infoRow}>
                    <Text style={vaccinesStyles.infoLabel}>
                      Data aplicação:
                    </Text>
                    <Text style={vaccinesStyles.infoValue}>{vaccine.date}</Text>
                  </View>
                  <View style={vaccinesStyles.infoRow}>
                    <Text style={vaccinesStyles.infoLabel}>
                      Próximo reforço:
                    </Text>
                    <Text style={vaccinesStyles.infoValue}>
                      {vaccine.nextDue}
                    </Text>
                  </View>
                </View>

                <Pressable style={vaccinesStyles.editButton}>
                  <Text style={vaccinesStyles.editButtonText}>Editar</Text>
                </Pressable>
              </View>
            ))
          ) : (
            <View style={vaccinesStyles.emptyState}>
              <Text style={vaccinesStyles.emptyStateEmoji}>💉</Text>
              <Text style={vaccinesStyles.emptyStateText}>
                Nenhuma vacinação registrada
              </Text>
              <Text style={vaccinesStyles.emptyStateSubtext}>
                Comece adicionando uma vacinação do seu pet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
