import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import authService from "@/app/services/auth.service";
import { StatusMessage, StatusType } from "@/components/status-message";
import { isValidEmail } from "@/utils/validators";
import { loginStyles } from "../styles/login.styles";

type AccountType = "usuario" | "empresa";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(false);
  const [failedPasswordAttempts, setFailedPasswordAttempts] = useState(0);
  const [status, setStatus] = useState({
    message: "",
    type: "error" as StatusType,
  });

  function ensureAccountTypeSelected() {
    if (!accountType) {
      setStatus({
        message: "Selecione se deseja entrar como usuario ou empresa.",
        type: "error",
      });
      return false;
    }

    return true;
  }

  async function handleLogin() {
    if (!ensureAccountTypeSelected()) {
      return;
    }

    if (!email || !password) {
      setStatus({ message: "Preencha e-mail e senha.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await authService.signIn(email, password);
      setFailedPasswordAttempts(0);
      router.replace("/home");
    } catch (error) {
      const errorCode =
        typeof error === "object" && error !== null && "code" in error
          ? String(error.code)
          : "";
      const isWrongPasswordError = [
        "auth/wrong-password",
        "auth/invalid-credential",
        "auth/invalid-login-credentials",
      ].includes(errorCode);

      if (isWrongPasswordError) {
        const nextAttempts = failedPasswordAttempts + 1;
        setFailedPasswordAttempts(nextAttempts);

        if (nextAttempts >= 3) {
          Alert.alert(
            "Senha incorreta",
            "Você já tentou três vezes. Digite seu e-mail no campo acima e toque em 'Esqueci minha senha' para receber o link de redefinição.",
            [
              {
                text: "Agora não",
                style: "cancel",
              },
              {
                text: "Enviar e-mail",
                onPress: () => {
                  void handleForgotPassword();
                },
              },
            ],
          );
          setFailedPasswordAttempts(0);
          setStatus({ message: "", type: "error" });
          return;
        }

        setStatus({
          message: `Senha incorreta. Tentativa ${nextAttempts} de 3.`,
          type: "error",
        });
        return;
      }

      const message =
        error instanceof Error ? error.message : "Erro ao fazer login.";
      setStatus({ message: `Falha no login: ${message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function handleSignup() {
    router.push("/signup-type");
  }

  function handleGuestAccess() {
    router.replace("/home");
  }

  async function handleForgotPassword() {
    if (!email) {
      setStatus({
        message: "Informe seu e-mail para recuperar a senha.",
        type: "error",
      });
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({ message: "Informe um e-mail válido.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await authService.sendPasswordReset(email);
      setStatus({
        message: "Enviamos um e-mail com instruções para redefinir sua senha.",
        type: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao enviar e-mail de redefinição.";
      setStatus({
        message: `Não foi possível recuperar a senha: ${message}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView
        style={loginStyles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={loginStyles.card}>
            {/* ── Ícone topo ───────────────────────── */}
            <View style={loginStyles.appIconWrapper}>
              <Text style={loginStyles.appIcon}>🐾</Text>
            </View>

            {/* ── Nome do app ───────────────────────── */}
            <Text style={loginStyles.appName}>my petZone</Text>

            {/* ── Título / contexto ────────────────── */}
            <Text style={loginStyles.subtitle}>
              Escolha como deseja acessar para encontrar lugares pet‑friendly
              perto de você.
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
                    accountType === "usuario" &&
                      loginStyles.typeButtonTextActive,
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
                    accountType === "empresa" &&
                      loginStyles.typeButtonTextActive,
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
              placeholderTextColor="#8B5E3C"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <TextInput
              style={loginStyles.input}
              placeholder="Senha"
              placeholderTextColor="#8B5E3C"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />

            {/* ── Esqueci senha ────────────────────── */}
            <Pressable disabled={loading} onPress={handleForgotPassword}>
              <Text style={loginStyles.forgotPassword}>
                Esqueci minha senha
              </Text>
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
              <Text style={loginStyles.guestButtonText}>
                Entrar como visitante
              </Text>
            </Pressable>

            <StatusMessage
              type={status.type}
              message={status.message}
              visible={!!status.message}
              onDismiss={() => setStatus({ message: "", type: "error" })}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
