import { partnersStyles as styles } from "@/app/styles/partners.styles";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
    Alert,
    Linking,
    Pressable,
    SafeAreaView,
    ScrollView,
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
