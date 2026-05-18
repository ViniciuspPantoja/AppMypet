import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { signupStyles } from "../styles/signup.styles.type";

export default function SignupTypeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSelectUser() {
    setLoading(true);
    router.push("/signup-user");
  }

  function handleSelectCompany() {
    setLoading(true);
    router.push("/signup-company");
  }

  function handleGoBack() {
    router.replace("/login");
  }

  return (
    <SafeAreaView style={signupStyles.container}>
      <ScrollView
        contentContainerStyle={signupStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={signupStyles.card}>
          {/* ── Ícone topo ───────────────────────────────────────── */}
          <View style={signupStyles.appIconWrapper}>
            <Text style={signupStyles.appIcon}>🐾</Text>
          </View>

          {/* ── Título ────────────────────────────────────────────── */}
          <Text style={signupStyles.title}>Criar conta</Text>

          {/* ── Subtítulo ──────────────────────────────────────────── */}
          <Text style={signupStyles.subtitle}>
            Escolha qual tipo de conta deseja criar para aproveitarmelhor a
            experiência no MyPetZone.
          </Text>

          {/* ── Seletor de tipo ───────────────────────────────────── */}
          <View style={signupStyles.typeSelectorRow}>
            {/* ─ Usuário ─────────────────────────────────────────── */}
            <Pressable
              style={signupStyles.typeButton}
              onPress={handleSelectUser}
              disabled={loading}
            >
              <Text style={{ fontSize: 28, marginBottom: 6 }}>👤</Text>
              <Text style={signupStyles.typeButtonText}>Usuário</Text>
            </Pressable>

            {/* ─ Empresa ────────────────────────────────────────── */}
            <Pressable
              style={signupStyles.typeButton}
              onPress={handleSelectCompany}
              disabled={loading}
            >
              <Text style={{ fontSize: 28, marginBottom: 6 }}>🏢</Text>
              <Text style={signupStyles.typeButtonText}>Empresa</Text>
            </Pressable>
          </View>

          {/* ── Descrições ────────────────────────────────────────── */}
          <View style={signupStyles.formSection}>
            <Text style={[signupStyles.subtitle, { marginBottom: 16 }]}>
              <Text style={{ fontWeight: "700" }}>Usuário:</Text> Para quem quer
              encontrar lugares pet-friendly e compartilhar experiências.
            </Text>
          </View>

          <View style={signupStyles.formSection}>
            <Text style={[signupStyles.subtitle, { marginBottom: 16 }]}>
              <Text style={{ fontWeight: "700" }}>Empresa:</Text> Para negócios
              que desejam ser descobertos por amantes de animais.
            </Text>
          </View>

          {/* ── Botões ────────────────────────────────────────────── */}
          <View style={signupStyles.buttonRow}>
            <Pressable
              style={[
                signupStyles.secondaryButton,
                loading && signupStyles.primaryButtonDisabled,
              ]}
              onPress={handleGoBack}
              disabled={loading}
            >
              <Text style={signupStyles.secondaryButtonText}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
