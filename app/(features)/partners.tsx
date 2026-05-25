import { partnersStyles as styles } from "@/app/styles/partners.styles";
import { getFirestoreDb } from "@/database/firebase/firebase";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
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

interface CompanyDocument {
  businessName?: string;
  businessSegment?: string;
  isPartner?: boolean;
  website?: string;
  address?: string;
  summary?: string;
}

const FALLBACK_PARTNER_TEXT = {
  summary:
    "Empresa cadastrada como parceira no app. Você pode abrir o site para ver mais detalhes.",
  address: "Endereço não informado",
};

function getPartnerCategory(segment?: string): PartnerCategory {
  if (!segment) return "Loja";
  if (segment.includes("Clínica")) return "Clínica";
  if (segment.includes("Hotel")) return "Hotel";
  if (segment.includes("Banho")) return "Banho e Tosa";
  if (segment.includes("Hospital")) return "Hospital";
  return "Loja";
}

function getPartnerAccent(segment?: string): string {
  if (!segment) return "#5b2132";
  if (segment.includes("Clínica")) return "#5b2132";
  if (segment.includes("Hotel")) return "#3d6d58";
  if (segment.includes("Banho")) return "#3c5a8a";
  if (segment.includes("Hospital")) return "#7a3e8e";
  return "#b46a3c";
}

function getPartnerEmoji(segment?: string): string {
  if (!segment) return "🤝";
  if (segment.includes("Clínica")) return "🏥";
  if (segment.includes("Hotel")) return "🏨";
  if (segment.includes("Banho")) return "✂️";
  if (segment.includes("Hospital")) return "🚑";
  return "🛒";
}

function getPartnerSummary(segment?: string): string {
  if (!segment) return FALLBACK_PARTNER_TEXT.summary;
  if (segment.includes("Clínica")) {
    return "Atendimento veterinário com consultas, vacinação e exames rápidos.";
  }
  if (segment.includes("Hotel")) {
    return "Hospedagem premium para pets com recreação e alimentação personalizada.";
  }
  if (segment.includes("Banho")) {
    return "Banho, tosa e cuidados de estética para o seu pet.";
  }
  if (segment.includes("Hospital")) {
    return "Pronto atendimento e suporte veterinário para urgências.";
  }
  return "Produtos e serviços especiais para pets em um só lugar.";
}

export default function PartnersScreen() {
  const router = useRouter();
  const db = useMemo(() => getFirestoreDb(), []);
  const [partners, setPartners] = useState<PartnerCard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPartners() {
      try {
        setLoading(true);
        const snap = await getDocs(
          query(collection(db, "companies"), where("isPartner", "==", true)),
        );

        const items = snap.docs
          .map((doc) => {
            const company = doc.data() as CompanyDocument;
            const name = company.businessName?.trim() || "Empresa parceira";
            const segment = company.businessSegment?.trim();

            return {
              id: doc.id,
              name,
              category: getPartnerCategory(segment),
              summary: company.summary?.trim() || getPartnerSummary(segment),
              address: company.address?.trim() || FALLBACK_PARTNER_TEXT.address,
              website:
                company.website?.trim() ||
                `https://www.google.com/search?q=${encodeURIComponent(name)}`,
              accent: getPartnerAccent(segment),
              emoji: getPartnerEmoji(segment),
            } as PartnerCard;
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        setPartners(items);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar os parceiros.");
      } finally {
        setLoading(false);
      }
    }

    void loadPartners();
  }, [db]);

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
            Empresas marcadas como parceiras no Firebase aparecem aqui com o
            mesmo padrão visual.
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

        {loading ? (
          <View style={styles.footerNote}>
            <Text style={styles.footerNoteText}>Carregando parceiros...</Text>
          </View>
        ) : partners.length > 0 ? (
          partners.map((partner) => (
            <View
              key={partner.id}
              style={[styles.card, { borderLeftColor: partner.accent }]}
            >
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.logoBubble,
                    { backgroundColor: partner.accent },
                  ]}
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
          ))
        ) : (
          <View style={styles.footerNote}>
            <Text style={styles.footerNoteText}>
              Nenhuma empresa foi marcada como parceira ainda.
            </Text>
          </View>
        )}

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            Cadastre uma empresa, marque a opção de parceira e ela aparecerá
            automaticamente aqui.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
