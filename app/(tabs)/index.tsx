import { getFirebaseApp } from "@/database/firebase/firebase";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../styles/home.styles";

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || auth.currentUser.email);
    }
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={homeStyles.header}>
          <View style={homeStyles.headerLeft}>
            <Text style={homeStyles.headerTitle}>MyPetZone</Text>
            <Text style={homeStyles.headerGreeting}>
              Olá, {displayName || "Usuário"} 🐾
            </Text>
          </View>
          <Pressable
            style={homeStyles.notifButton}
            onPress={() => router.push("/notifications")}
          >
            <Text style={homeStyles.notifIcon}>🔔</Text>
          </Pressable>
        </View>

        {/* ── Hero Banner ── */}
        <View style={homeStyles.heroBanner}>
          <View style={homeStyles.heroIconWrapper}>
            <Text style={homeStyles.heroIcon}>🗺️</Text>
          </View>
          <View style={homeStyles.heroContent}>
            <Text style={homeStyles.heroTitle}>Seu pet merece passear!</Text>
            <Text style={homeStyles.heroDescription}>
              Encontre locais pet friendly perto de você
            </Text>
            <Pressable
              style={homeStyles.heroButton}
              onPress={() => router.push("/petmap")}
            >
              <Text style={homeStyles.heroButtonText}>Explorar agora →</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Section Cards ── */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionLabel}>O que quer fazer?</Text>

          <View style={homeStyles.gridRow}>
            <Pressable
              style={homeStyles.cardCream}
              onPress={() => router.push("/petmap")}
            >
              <View style={homeStyles.cardIconWrapperWine}>
                <Text style={homeStyles.cardIcon}>🗺️</Text>
              </View>
              <Text style={homeStyles.cardLabelDark}>Pet Map</Text>
              <Text style={homeStyles.cardDescDark}>Locais pet friendly</Text>
            </Pressable>

            <Pressable
              style={homeStyles.cardWine}
              onPress={() => router.push("/my-pet")}
            >
              <View style={homeStyles.cardIconWrapperTerracotta}>
                <Text style={homeStyles.cardIcon}>�</Text>
              </View>
              <Text style={homeStyles.cardLabelLight}>Meu perfil</Text>
              <Text style={homeStyles.cardDescLight}>Seu perfil e pets</Text>
            </Pressable>
          </View>

          <View style={homeStyles.gridRow}>
            <Pressable
              style={homeStyles.cardWine}
              onPress={() => router.push("/vaccines")}
            >
              <View style={homeStyles.cardIconWrapperDark}>
                <Text style={homeStyles.cardIcon}>💉</Text>
              </View>
              <Text style={homeStyles.cardLabelLight}>Vacinas</Text>
              <Text style={homeStyles.cardDescLight}>Carteirinha do pet</Text>
            </Pressable>

            <Pressable
              style={homeStyles.cardTerracotta}
              onPress={() => router.push("/partners")}
            >
              <View style={homeStyles.cardIconWrapperTerracottaDark}>
                <Text style={homeStyles.cardIcon}>🤝</Text>
              </View>
              <Text style={homeStyles.cardLabelLight}>Parceiros</Text>
              <Text style={homeStyles.cardDescLight}>Clínicas e shops</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Divisor ── */}
        <View style={homeStyles.divider}>
          <View style={homeStyles.dividerLine} />
          <Text style={homeStyles.dividerIcon}>🐾</Text>
          <View style={homeStyles.dividerLine} />
        </View>

        {/* ── Section Quick Shortcuts ── */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionLabel}>Atalhos rápidos</Text>

          <View style={homeStyles.quickRow}>
            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/appointment")}
            >
              <Text style={homeStyles.quickIcon}>📅</Text>
              <Text style={homeStyles.quickLabel}>Consulta</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/plans")}
            >
              <Text style={homeStyles.quickIcon}>⭐</Text>
              <Text style={homeStyles.quickLabel}>Planos</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/nearby")}
            >
              <Text style={homeStyles.quickIcon}>📍</Text>
              <Text style={homeStyles.quickLabel}>Perto</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/pet-shop")}
            >
              <Text style={homeStyles.quickIcon}>🛒</Text>
              <Text style={homeStyles.quickLabel}>Pet Shop</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/settings")}
            >
              <Text style={homeStyles.quickIcon}>⚙️</Text>
              <Text style={homeStyles.quickLabel}>Config.</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
