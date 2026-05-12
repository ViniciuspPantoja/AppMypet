import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";

import { getFirebaseAuth } from "../database/firebase/firebase";
import { loginStyles } from "./styles/login.styles";

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

  async function handleCreateAccount() {
    if (!ensureAccountTypeSelected()) {
      return;
    }

    if (!email || !password) {
      setStatus("Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Criando conta...");
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      setStatus(`Conta ${accountType} criada: ${credential.user.email}`);
      router.replace("/(tabs)");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      setStatus(`Falha ao criar conta: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleGuestAccess() {
    setStatus("Entrando como visitante...");
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Login Firebase</Text>
        <Text style={loginStyles.subtitle}>
          Escolha o tipo de acesso antes de entrar ou criar conta.
        </Text>

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
              Usuario
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

        <View style={loginStyles.buttonsRow}>
          <Pressable
            style={loginStyles.primaryButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={loginStyles.primaryButtonText}>Entrar</Text>
            )}
          </Pressable>

          <Pressable
            style={loginStyles.secondaryButton}
            onPress={handleCreateAccount}
            disabled={loading}
          >
            <Text style={loginStyles.secondaryButtonText}>Criar conta</Text>
          </Pressable>
        </View>

        <Pressable
          style={loginStyles.guestButton}
          onPress={handleGuestAccess}
          disabled={loading}
        >
          <Text style={loginStyles.guestButtonText}>Entrar como visitante</Text>
        </Pressable>

        {!!status && <Text style={loginStyles.statusText}>{status}</Text>}
      </View>
    </SafeAreaView>
  );
}
