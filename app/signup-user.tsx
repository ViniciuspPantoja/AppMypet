import { FormInput } from "@/components/form-input";
import { StatusMessage, StatusType } from "@/components/status-message";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { UserSignupData } from "@/types/signup.types";
import {
    formatDate,
    isValidEmail,
    isValidPassword,
    validateBirthDate
} from "@/utils/validators";
import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { signupStyles } from "./styles/signup.styles.user";

export default function SignupUserScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const db = useMemo(() => getFirestoreDb(), []);

  // Estado do formulário
  const [formData, setFormData] = useState<UserSignupData>({
    email: "",
    birthDate: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("success");

  // Limpar mensagem de status após alguns segundos
  useEffect(() => {
    if (statusMessage && statusType === "success") {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, statusType]);

  function handleFieldChange(field: keyof UserSignupData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpar erro do campo quando começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  }

  function handleFieldBlur(field: keyof UserSignupData) {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validar campo ao sair do foco
    validateField(field);
  }

  function validateField(field: keyof UserSignupData): boolean {
    const newErrors = { ...errors };
    let isValid = true;

    if (field === "email") {
      if (!formData.email) {
        newErrors.email = "Email é obrigatório";
        isValid = false;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Email inválido";
        isValid = false;
      } else {
        delete newErrors.email;
      }
    }

    if (field === "birthDate") {
      const validation = validateBirthDate(formData.birthDate);
      if (!validation.isValid) {
        newErrors.birthDate = validation.error || "Data inválida";
        isValid = false;
      } else {
        delete newErrors.birthDate;
      }
    }

    if (field === "password") {
      if (!formData.password) {
        newErrors.password = "Senha é obrigatória";
        isValid = false;
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = "Senha deve ter no mínimo 6 caracteres";
        isValid = false;
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
    return isValid;
  }

  function validateForm(): boolean {
    let isFormValid = true;
    const newErrors: Record<string, string> = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
      isFormValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Email inválido";
      isFormValid = false;
    }

    // Validar data de nascimento
    const birthDateValidation = validateBirthDate(formData.birthDate);
    if (!birthDateValidation.isValid) {
      newErrors.birthDate = birthDateValidation.error || "Data inválida";
      isFormValid = false;
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isFormValid = false;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
      isFormValid = false;
    }

    setErrors(newErrors);
    setTouched({
      email: true,
      birthDate: true,
      password: true,
    });

    return isFormValid;
  }

  async function handleSignup() {
    if (!validateForm()) {
      setStatusMessage("Por favor, preencha todos os campos corretamente.");
      setStatusType("error");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("Criando sua conta...");
      setStatusType("success");

      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password,
      );

      // Atualizar perfil com nome exibível
      await updateProfile(userCredential.user, {
        displayName: "User",
      });

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: formData.email,
        birthDate: formData.birthDate,
        accountType: "user",
        createdAt: new Date().toISOString(),
      });

      setStatusMessage("✓ Conta criada com sucesso! Redirecionando...");
      setStatusType("success");

      // Aguardar 2 segundos antes de redirecionar
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      setStatusMessage(`Erro: ${message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  function handleGoBack() {
    router.back();
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
            <Text style={signupStyles.appIcon}>👤</Text>
          </View>

          {/* ── Título ────────────────────────────────────────────── */}
          <Text style={signupStyles.title}>Criar conta de Usuário</Text>

          {/* ── Subtítulo ──────────────────────────────────────────── */}
          <Text style={signupStyles.subtitle}>
            Preencha os dados abaixo para criar sua conta e começar a explorar
            lugares pet-friendly.
          </Text>

          {/* ── Status message ────────────────────────────────────── */}
          {statusMessage && (
            <StatusMessage
              type={statusType}
              message={statusMessage}
              visible={!!statusMessage}
            />
          )}

          {/* ── Seção de campos pessoais ──────────────────────────── */}
          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Informações Pessoais</Text>

            <FormInput
              label="Email"
              placeholder="seu.email@exemplo.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => handleFieldChange("email", value)}
              onBlur={() => handleFieldBlur("email")}
              error={errors.email}
              touched={touched.email}
              editable={!loading}
            />

            <FormInput
              label="Data de Nascimento"
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              value={formData.birthDate}
              onChangeText={(value) =>
                handleFieldChange("birthDate", formatDate(value))
              }
              onBlur={() => handleFieldBlur("birthDate")}
              error={errors.birthDate}
              touched={touched.birthDate}
              hint="Você deve ter pelo menos 18 anos"
              editable={!loading}
              maxLength={10}
            />
          </View>

          {/* ── Seção de senha ────────────────────────────────────── */}
          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Segurança</Text>

            <FormInput
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleFieldChange("password", value)}
              onBlur={() => handleFieldBlur("password")}
              error={errors.password}
              touched={touched.password}
              editable={!loading}
              hint="Use uma senha forte com números e caracteres especiais"
            />
          </View>

          {/* ── Botões ────────────────────────────────────────────── */}
          <View style={signupStyles.buttonRow}>
            <Pressable
              style={[
                signupStyles.primaryButton,
                loading && signupStyles.primaryButtonDisabled,
              ]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#7B1E2E" />
              ) : (
                <Text style={signupStyles.primaryButtonText}>Criar Conta</Text>
              )}
            </Pressable>

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
