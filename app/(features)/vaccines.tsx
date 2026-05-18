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
        {/* ── Header ── */}
        <View style={vaccinesStyles.header}>
          <Pressable
            onPress={() => router.back()}
            style={vaccinesStyles.backButton}
          >
            <Text style={vaccinesStyles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={vaccinesStyles.headerTitle}>Carteirinha de Vacinas</Text>
        </View>

        {/* ── Patinhas decorativas ── */}
        <Text style={[vaccinesStyles.pawDecor, { top: 60, right: 16 }]}>
          🐾
        </Text>
        <Text style={[vaccinesStyles.pawDecor, { top: 160, left: -8 }]}>
          🐾
        </Text>

        {/* ── Alerta vacinas próximas ── */}
        {upcomingVaccines.length > 0 && (
          <View style={vaccinesStyles.alertSection}>
            <Text style={vaccinesStyles.alertTitle}>
              ⚠️ {upcomingVaccines.length} vacinação(ões) vencendo em breve
            </Text>
            <Text style={vaccinesStyles.alertDescription}>
              Fique em dia com a saúde do seu pet nos próximos 30 dias
            </Text>
          </View>
        )}

        {/* ── Botão adicionar ── */}
        <View style={vaccinesStyles.actionSection}>
          <Pressable style={vaccinesStyles.addButton} onPress={() => {}}>
            <Text style={vaccinesStyles.addButtonText}>
              + Adicionar Vacinação
            </Text>
          </Pressable>
        </View>

        {/* ── Histórico ── */}
        <View style={vaccinesStyles.section}>
          <Text style={vaccinesStyles.sectionTitle}>
            Histórico de Vacinações
          </Text>

          {vaccines.length > 0 ? (
            vaccines.map((vaccine) => (
              <View key={vaccine.id} style={vaccinesStyles.vaccineCard}>
                {/* Nome + status */}
                <View style={vaccinesStyles.vaccineCardHeader}>
                  <Text style={vaccinesStyles.vaccineName}>{vaccine.name}</Text>
                  <Text style={vaccinesStyles.vaccineStatus}>✓ Aplicada</Text>
                </View>

                {/* Infos em linha */}
                <View style={vaccinesStyles.vaccineCardInfo}>
                  <View style={vaccinesStyles.infoRow}>
                    <Text style={vaccinesStyles.infoLabel}>Pet</Text>
                    <Text style={vaccinesStyles.infoValue}>
                      {vaccine.petName}
                    </Text>
                  </View>
                  <View style={vaccinesStyles.infoRow}>
                    <Text style={vaccinesStyles.infoLabel}>Data aplicação</Text>
                    <Text style={vaccinesStyles.infoValue}>{vaccine.date}</Text>
                  </View>
                  <View style={vaccinesStyles.infoRow}>
                    <Text style={vaccinesStyles.infoLabel}>
                      Próximo reforço
                    </Text>
                    <Text style={vaccinesStyles.infoValue}>
                      {vaccine.nextDue}
                    </Text>
                  </View>
                </View>

                {/* Botão editar */}
                <Pressable style={vaccinesStyles.editButton} onPress={() => {}}>
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
                Comece adicionando a primeira vacinação do seu pet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
