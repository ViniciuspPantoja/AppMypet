import profileService from "@/app/services/profile.service";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { homeStyles } from "../styles/home.styles";

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const profile = profileService.buildUserProfile();
    setDisplayName(profile?.displayName || profile?.email || null);
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
            <MaterialCommunityIcons
              name="bell-outline"
              size={18}
              color="#5A1520"
            />
          </Pressable>
        </View>

        {/* ── Hero Banner ── */}
        <View style={homeStyles.heroBanner}>
          <View style={homeStyles.heroIconWrapper}>
            <MaterialCommunityIcons
              name="map-marker-path"
              size={22}
              color="#F5ECD7"
            />
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
              style={homeStyles.card}
              onPress={() => router.push("/petmap")}
            >
              <View style={homeStyles.cardIconWrapper}>
                <MaterialCommunityIcons
                  name="map-search-outline"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabel}>Pet Map</Text>
              <Text style={homeStyles.cardDesc}>Locais pet friendly</Text>
            </Pressable>

            <Pressable
              style={homeStyles.card}
              onPress={() => router.push("/my-pet")}
            >
              <View style={homeStyles.cardIconWrapper}>
                <MaterialCommunityIcons
                  name="paw-outline"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabel}>Meu perfil</Text>
              <Text style={homeStyles.cardDesc}>Seu perfil e pets</Text>
            </Pressable>
          </View>

          <View style={homeStyles.gridRow}>
            <Pressable
              style={homeStyles.card}
              onPress={() => router.push("/vaccines")}
            >
              <View style={homeStyles.cardIconWrapper}>
                <MaterialCommunityIcons
                  name="needle"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabel}>Vacinas</Text>
              <Text style={homeStyles.cardDesc}>Carteirinha do pet</Text>
            </Pressable>

            <Pressable
              style={homeStyles.card}
              onPress={() => router.push("/partners")}
            >
              <View style={homeStyles.cardIconWrapper}>
                <MaterialCommunityIcons
                  name="handshake-outline"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabel}>Parceiros</Text>
              <Text style={homeStyles.cardDesc}>Clínicas e shops</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Divisor ── */}
        <View style={homeStyles.divider}>
          <View style={homeStyles.dividerLine} />
          <MaterialCommunityIcons
            name="paw"
            size={14}
            color="rgba(245, 236, 215, 0.45)"
          />
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
              <View style={homeStyles.quickIconWrapper}>
                <MaterialCommunityIcons name="calendar-month-outline" size={18} color="#F5ECD7" />
              </View>
              <Text style={homeStyles.quickLabel}>Consulta</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/plans")}
            >
              <View style={homeStyles.quickIconWrapper}>
                <MaterialCommunityIcons name="star-outline" size={18} color="#F5ECD7" />
              </View>
              <Text style={homeStyles.quickLabel}>Planos</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/nearby")}
            >
              <View style={homeStyles.quickIconWrapper}>
                <MaterialCommunityIcons name="map-marker-outline" size={18} color="#F5ECD7" />
              </View>
              <Text style={homeStyles.quickLabel}>Perto</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/estoque")}
            >
              <View style={homeStyles.quickIconWrapper}>
                <MaterialCommunityIcons name="warehouse" size={18} color="#F5ECD7" />
              </View>
              <Text style={homeStyles.quickLabel}>Estoque</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/settings")}
            >
              <View style={homeStyles.quickIconWrapper}>
                <MaterialCommunityIcons name="cog-outline" size={18} color="#F5ECD7" />
              </View>
              <Text style={homeStyles.quickLabel}>Config.</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
