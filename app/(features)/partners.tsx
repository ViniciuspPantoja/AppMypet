import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
    Alert,
    Linking,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type PartnerCategory =
  | "Clínica"
  | "Loja"
  | "Hotel"
  | "Banho e Tosa"
  | "Hospital";

interface PartnerCard {
  id: string;
  name: string;
  category: PartnerCategory;
  summary: string;
  address: string;
  website: string;
  accent: string;
  emoji: string;
}

export default function PartnersScreen() {
  const router = useRouter();

  const partners = useMemo<PartnerCard[]>(
    () => [
      {
        id: "1",
        name: "PetCare Clínica",
        category: "Clínica",
        summary:
          "Atendimento veterinário completo com consultas, vacinação e exames rápidos.",
        address: "Av. das Nações, 1200",
        website: "https://example.com/petcare",
        accent: "#5b2132",
        emoji: "🏥",
      },
      {
        id: "2",
        name: "Mundo Pet Shop",
        category: "Loja",
        summary:
          "Acessórios, rações e medicamentos veterinários com retirada no mesmo dia.",
        address: "Rua Central, 88",
        website: "https://example.com/mundopet",
        accent: "#b46a3c",
        emoji: "🛒",
      },
      {
        id: "3",
        name: "Paws Resort",
        category: "Hotel",
        summary:
          "Hospedagem premium para pets com recreação, monitoramento e alimentação personalizada.",
        address: "Estrada do Bosque, 450",
        website: "https://example.com/pawsresort",
        accent: "#3d6d58",
        emoji: "🏨",
      },
      {
        id: "4",
        name: "Spa & Tosa Lux",
        category: "Banho e Tosa",
        summary:
          "Banho, tosa higiênica e estética com produtos pensados para pele sensível.",
        address: "Av. Jardim, 310",
        website: "https://example.com/spatosa",
        accent: "#3c5a8a",
        emoji: "✂️",
      },
      {
        id: "5",
        name: "Hospital Vet 24h",
        category: "Hospital",
        summary:
          "Emergência veterinária 24 horas, internação e pronto atendimento para casos urgentes.",
        address: "Rua da Saúde, 999",
        website: "https://example.com/hospitalvet24h",
        accent: "#7a3e8e",
        emoji: "🚑",
      },
    ],
    [],
  );

  async function openPartnerSite(url: string) {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert(
          "Link indisponível",
          "Não foi possível abrir o site do parceiro.",
        );
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o site do parceiro.");
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>‹ Voltar</Text>
          </Pressable>
          <Text style={styles.title}>Marketplace de Parceiros</Text>
          <Text style={styles.subtitle}>
            Empresas mockadas para você cadastrar manualmente e transformar em
            parceiros reais.
          </Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🤝</Text>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>Espaço para parceiros pet</Text>
            <Text style={styles.heroDescription}>
              Cada card abaixo traz um resumo rápido e um botão de acesso ao
              site oficial.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Parceiros em destaque</Text>
          <Text style={styles.sectionCount}>{partners.length} empresas</Text>
        </View>

        {partners.map((partner) => (
          <View
            key={partner.id}
            style={[styles.card, { borderLeftColor: partner.accent }]}
          >
            <View style={styles.cardTopRow}>
              <View
                style={[styles.logoBubble, { backgroundColor: partner.accent }]}
              >
                <Text style={styles.logoText}>{partner.emoji}</Text>
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardName}>{partner.name}</Text>
                <Text style={styles.cardCategory}>{partner.category}</Text>
              </View>
            </View>

            <Text style={styles.cardSummary}>{partner.summary}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Endereço</Text>
              <Text style={styles.metaValue}>{partner.address}</Text>
            </View>

            <View style={styles.cardActions}>
              <Pressable
                style={styles.siteButton}
                onPress={() => openPartnerSite(partner.website)}
              >
                <Text style={styles.siteButtonText}>Acessar site</Text>
              </Pressable>
              <Text style={styles.siteHint}>{partner.website}</Text>
            </View>
          </View>
        ))}

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            Você pode editar essa lista manualmente no arquivo da tela e trocar
            os dados dos parceiros.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7efe4",
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 18,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(91, 33, 50, 0.08)",
    marginBottom: 12,
  },
  backButtonText: {
    color: "#5b2132",
    fontWeight: "800",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2a1f24",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "#5e4f55",
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 24,
    padding: 18,
    backgroundColor: "#5b2132",
    marginBottom: 18,
  },
  heroEmoji: {
    fontSize: 34,
  },
  heroTextBlock: {
    flex: 1,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },
  heroDescription: {
    color: "rgba(255,255,255,0.82)",
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2a1f24",
  },
  sectionCount: {
    color: "#7d6e73",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  logoBubble: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 28,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2a1f24",
  },
  cardCategory: {
    marginTop: 4,
    color: "#b46a3c",
    fontWeight: "800",
  },
  cardSummary: {
    color: "#4c4347",
    lineHeight: 21,
    marginBottom: 14,
  },
  metaRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1e6dc",
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#8a7a80",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    color: "#2a1f24",
    fontWeight: "700",
  },
  cardActions: {
    gap: 8,
    marginTop: 6,
  },
  siteButton: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#5b2132",
  },
  siteButtonText: {
    color: "#fff",
    fontWeight: "900",
  },
  siteHint: {
    color: "#8a7a80",
    fontSize: 12,
  },
  footerNote: {
    marginTop: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(91, 33, 50, 0.06)",
  },
  footerNoteText: {
    color: "#5e4f55",
    lineHeight: 20,
  },
});
