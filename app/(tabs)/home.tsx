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
              color="#F5ECD7"
            />
          </Pressable>
        </View>

        {/* ── Hero Banner ── */}
        <View style={homeStyles.heroBanner}>
          <View style={homeStyles.heroIconWrapper}>
            <MaterialCommunityIcons
              name="map-marker-path"
              size={24}
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
              style={homeStyles.cardCream}
              onPress={() => router.push("/petmap")}
            >
              <View style={homeStyles.cardIconWrapperWine}>
                <MaterialCommunityIcons
                  name="map-search-outline"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabelDark}>Pet Map</Text>
              <Text style={homeStyles.cardDescDark}>Locais pet friendly</Text>
            </Pressable>

            <Pressable
              style={homeStyles.cardWine}
              onPress={() => router.push("/my-pet")}
            >
              <View style={homeStyles.cardIconWrapperTerracotta}>
                <MaterialCommunityIcons
                  name="paw-outline"
                  size={22}
                  color="#F5ECD7"
                />
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
                <MaterialCommunityIcons
                  name="needle"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabelLight}>Vacinas</Text>
              <Text style={homeStyles.cardDescLight}>Carteirinha do pet</Text>
            </Pressable>

            <Pressable
              style={homeStyles.cardTerracotta}
              onPress={() => router.push("/partners")}
            >
              <View style={homeStyles.cardIconWrapperTerracottaDark}>
                <MaterialCommunityIcons
                  name="handshake-outline"
                  size={22}
                  color="#F5ECD7"
                />
              </View>
              <Text style={homeStyles.cardLabelLight}>Parceiros</Text>
              <Text style={homeStyles.cardDescLight}>Clínicas e shops</Text>
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
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={18}
                color="#F5ECD7"
              />
              <Text style={homeStyles.quickLabel}>Consulta</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/plans")}
            >
              <MaterialCommunityIcons
                name="star-outline"
                size={18}
                color="#F5ECD7"
              />
              <Text style={homeStyles.quickLabel}>Planos</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/nearby")}
            >
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={18}
                color="#F5ECD7"
              />
              <Text style={homeStyles.quickLabel}>Perto</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/pet-shop")}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={18}
                color="#F5ECD7"
              />
              <Text style={homeStyles.quickLabel}>Pet Shop</Text>
            </Pressable>

            <Pressable
              style={homeStyles.quickPill}
              onPress={() => router.push("/settings")}
            >
              <MaterialCommunityIcons
                name="cog-outline"
                size={18}
                color="#F5ECD7"
              />
              <Text style={homeStyles.quickLabel}>Config.</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
