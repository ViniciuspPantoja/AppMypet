import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";

import { getFirebaseAuth } from "../../database/firebase/firebase";
import { loginStyles } from "../styles/login.styles";

type AccountType = "usuario" | "empresa";

export default function LoginScreen() {
  const router = useRouter();
  const auth = useMemo(() => getFirebaseAuth(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function ensureAccountTypeSelected() {
    if (!accountType) {
      setStatus("Selecione se deseja entrar como usuario ou empresa.");
      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (!ensureAccountTypeSelected()) {
      return;
    }

    if (!email || !password) {
      setStatus("Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Conectando...");
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      setStatus(`Login OK (${accountType}): ${credential.user.email}`);
      router.replace("/(tabs)");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer login.";
      setStatus(`Falha no login: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleSignup() {
    router.push("/signup-type");
  }

  function handleGuestAccess() {
    setStatus("Entrando como visitante...");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.card}>
        {/* ── Ícone topo ───────────────────────── */}
        <View style={loginStyles.appIconWrapper}>
          <Text style={loginStyles.appIcon}>🐾</Text>
        </View>

        {/* ── Nome do app ───────────────────────── */}
        <Text style={loginStyles.appName}>my petZone</Text>

        {/* ── Título / contexto ────────────────── */}
        <Text style={loginStyles.subtitle}>
          Escolha como deseja acessar para encontrar lugares pet‑friendly perto
          de você.
        </Text>

        {/* ── Seletor tipo conta ───────────────── */}
        <View style={loginStyles.typeSelectorRow}>
          <Pressable
            style={[
              loginStyles.typeButton,
              accountType === "usuario" && loginStyles.typeButtonActive,
            ]}
            onPress={() => setAccountType("usuario")}
            disabled={loading}
          >
            <Text
              style={[
                loginStyles.typeButtonText,
                accountType === "usuario" && loginStyles.typeButtonTextActive,
              ]}
            >
              Usuário
            </Text>
          </Pressable>

          <Pressable
            style={[
              loginStyles.typeButton,
              accountType === "empresa" && loginStyles.typeButtonActive,
            ]}
            onPress={() => setAccountType("empresa")}
            disabled={loading}
          >
            <Text
              style={[
                loginStyles.typeButtonText,
                accountType === "empresa" && loginStyles.typeButtonTextActive,
              ]}
            >
              Empresa
            </Text>
          </Pressable>
        </View>

        {/* ── Inputs ───────────────────────────── */}
        <TextInput
          style={loginStyles.input}
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        {/* ── Esqueci senha ────────────────────── */}
        <Pressable disabled={loading}>
          <Text style={loginStyles.forgotPassword}>Esqueci minha senha</Text>
        </Pressable>

        {/* ── Botões principais ───────────────── */}
        <View style={loginStyles.buttonsRow}>
          <Pressable
            style={loginStyles.primaryButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#7B1E2E" />
            ) : (
              <Text style={loginStyles.primaryButtonText}>Entrar</Text>
            )}
          </Pressable>

          <Pressable
            style={loginStyles.secondaryButton}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={loginStyles.secondaryButtonText}>Criar conta</Text>
          </Pressable>
        </View>

        {/* ── Visitante ───────────────────────── */}
        <Pressable
          style={loginStyles.guestButton}
          onPress={handleGuestAccess}
          disabled={loading}
        >
          <Text style={loginStyles.guestButtonText}>Entrar como visitante</Text>
        </Pressable>

        {/* ── Status / feedback ───────────────── */}
        {!!status && <Text style={loginStyles.statusText}>{status}</Text>}
      </View>
    </SafeAreaView>
  );
}
