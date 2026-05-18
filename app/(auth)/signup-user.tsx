import { FormInput } from "@/components/form-input";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { UserSignupData } from "@/types/signup.types";
import {
    formatDate,
    isValidEmail,
    isValidPassword,
    validateBirthDate,
} from "@/utils/validators";
import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { signupStyles } from "../styles/signup.styles.user";

// ── Tipos ────────────────────────────────────────────────────
type FormErrors = Record<string, string>;
type FormTouched = Record<string, boolean>;
type FeedbackType = "success" | "error";

// ── Constantes ───────────────────────────────────────────────
const REDIRECT_DELAY = 2000;

// ── Validadores por campo ────────────────────────────────────
function validateEmailField(email: string): string {
  if (!email) return "Email é obrigatório";
  if (!isValidEmail(email)) return "Email inválido";
  return "";
}

function validateBirthDateField(birthDate: string, required = true): string {
  if (!birthDate) {
    return required ? "Data de nascimento é obrigatória" : "";
  }
  const result = validateBirthDate(birthDate);
  return result.isValid ? "" : (result.error ?? "Data inválida");
}

function validatePasswordField(password: string): string {
  if (!password) return "Senha é obrigatória";
  if (!isValidPassword(password))
    return "Senha deve ter no mínimo 6 caracteres";
  return "";
}

// ── Componente ───────────────────────────────────────────────
export default function SignupUserScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const db = useMemo(() => getFirestoreDb(), []);

  const [formData, setFormData] = useState<UserSignupData>({
    email: "",
    birthDate: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [loading, setLoading] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("success");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // ── Handlers de campo ────────────────────────────────────────
  function updateField(field: keyof UserSignupData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function blurField(field: keyof UserSignupData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = getFieldError(field);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  function getFieldError(field: keyof UserSignupData): string {
    if (field === "email") return validateEmailField(formData.email);
    if (field === "birthDate")
      return validateBirthDateField(formData.birthDate, false);
    if (field === "password") return validatePasswordField(formData.password);
    return "";
  }

  // ── Validação do formulário completo ─────────────────────────
  function validateAll(): boolean {
    const newErrors: FormErrors = {
      email: validateEmailField(formData.email),
      birthDate: validateBirthDateField(formData.birthDate),
      password: validatePasswordField(formData.password),
    };

    // Remove campos sem erro
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    setTouched({ email: true, birthDate: true, password: true });
    return Object.keys(newErrors).length === 0;
  }

  // ── Submit ───────────────────────────────────────────────────
  async function handleSignup() {
    if (!validateAll()) {
      setFeedbackType("error");
      setFeedbackTitle("Não foi possível criar a conta");
      setFeedbackMessage("Preencha todos os campos corretamente.");
      setFeedbackVisible(true);
      return;
    }

    try {
      setLoading(true);

      const credential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password,
      );

      await updateProfile(credential.user, { displayName: "User" });

      await setDoc(doc(db, "users", credential.user.uid), {
        email: formData.email,
        birthDate: formData.birthDate,
        accountType: "user",
        createdAt: new Date().toISOString(),
      });

      setFeedbackType("success");
      setFeedbackTitle("Conta criada com sucesso");
      setFeedbackMessage(
        "Sua conta foi criada. Redirecionando para o login...",
      );
      setFeedbackVisible(true);
      setTimeout(() => router.replace("/login"), REDIRECT_DELAY);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      setFeedbackType("error");
      setFeedbackTitle("Não foi possível criar a conta");
      setFeedbackMessage(message);
      setFeedbackVisible(true);
    } finally {
      setLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────
  return (
    <SafeAreaView style={signupStyles.container}>
      <ScrollView
        contentContainerStyle={signupStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={signupStyles.card}>
          {/* Ícone */}
          <View style={signupStyles.appIconWrapper}>
            <Text style={signupStyles.appIcon}>🐾</Text>
          </View>

          {/* Cabeçalho */}
          <Text style={signupStyles.title}>Criar conta</Text>
          <Text style={signupStyles.subtitle}>
            Preencha os dados abaixo e comece a explorar lugares pet-friendly.
          </Text>

          {/* Seção: Informações Pessoais */}
          <View style={signupStyles.formSection}>
            <FormInput
              placeholder="seu.email@exemplo.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(v) => updateField("email", v)}
              onBlur={() => blurField("email")}
              error={errors.email}
              touched={touched.email}
              editable={!loading}
            />

            <FormInput
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              value={formData.birthDate}
              onChangeText={(v) => updateField("birthDate", formatDate(v))}
              onBlur={() => blurField("birthDate")}
              error={errors.birthDate}
              touched={touched.birthDate}
              editable={!loading}
              maxLength={10}
            />
          </View>

          {/* Seção: Segurança */}
          <View style={signupStyles.formSection}>
            <FormInput
              placeholder="Senha (Mínimo de 6 caracteres)"
              secureTextEntry
              value={formData.password}
              onChangeText={(v) => updateField("password", v)}
              onBlur={() => blurField("password")}
              error={errors.password}
              touched={touched.password}
              editable={!loading}
            />
          </View>

          {/* Botões */}
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
                <Text style={signupStyles.primaryButtonText}>Criar conta</Text>
              )}
            </Pressable>

            <Pressable
              style={signupStyles.secondaryButton}
              onPress={() => router.replace("/signup-type")}
              disabled={loading}
            >
              <Text style={signupStyles.secondaryButtonText}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal visible={feedbackVisible} transparent animationType="fade">
        <View style={signupStyles.modalBackdrop}>
          <View style={signupStyles.modalCard}>
            <Text
              style={[
                signupStyles.feedbackIcon,
                feedbackType === "success"
                  ? signupStyles.feedbackIconSuccess
                  : signupStyles.feedbackIconError,
              ]}
            >
              {feedbackType === "success" ? "✓" : "!"}
            </Text>
            <Text style={signupStyles.feedbackTitle}>{feedbackTitle}</Text>
            <Text style={signupStyles.feedbackMessage}>{feedbackMessage}</Text>
            <Pressable
              style={signupStyles.feedbackButton}
              onPress={() => setFeedbackVisible(false)}
            >
              <Text style={signupStyles.feedbackButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
