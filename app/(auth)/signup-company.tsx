import { FormInput } from "@/components/form-input";
import { StatusMessage, StatusType } from "@/components/status-message";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { CompanySignupData } from "@/types/signup.types";
import {
    formatCNPJ,
    isValidCNPJ,
    isValidEmail,
    isValidPassword,
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
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { signupStyles } from "../styles/signup.styles.company";

const BUSINESS_SEGMENTS = [
  "Clínica Veterinária",
  "Pet Shop",
  "Hotel para Animais",
  "Restaurante/Cafeteria Pet-Friendly",
  "Parque para Cães",
  "Treinamento de Cães",
  "Serviço de Banho e Tosa",
  "Alimentação Natural para Pets",
  "Consultoria Comportamental",
  "Seguros para Animais",
  "Fotografia de Animais",
  "Outro",
];

export default function SignupCompanyScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const db = useMemo(() => getFirestoreDb(), []);

  // Estado do formulário
  const [formData, setFormData] = useState<CompanySignupData>({
    email: "",
    cnpj: "",
    password: "",
    businessName: "",
    businessSegment: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<StatusType>("success");
  const [showSegmentModal, setShowSegmentModal] = useState(false);

  // Limpar mensagem de status após alguns segundos
  useEffect(() => {
    if (statusMessage && statusType === "success") {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, statusType]);

  function handleFieldChange(field: keyof CompanySignupData, value: string) {
    let processedValue = value;

    // Formatar CNPJ automaticamente
    if (field === "cnpj") {
      const cleanValue = value.replace(/[^\d]/g, "").slice(0, 14);
      processedValue = formatCNPJ(cleanValue);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    // Limpar erro do campo quando começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  }

  function handleFieldBlur(field: keyof CompanySignupData) {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Validar campo ao sair do foco
    validateField(field);
  }

  function validateField(field: keyof CompanySignupData): boolean {
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

    if (field === "cnpj") {
      if (!formData.cnpj) {
        newErrors.cnpj = "CNPJ é obrigatório";
        isValid = false;
      } else if (!isValidCNPJ(formData.cnpj)) {
        newErrors.cnpj = "CNPJ inválido";
        isValid = false;
      } else {
        delete newErrors.cnpj;
      }
    }

    if (field === "businessName") {
      if (!formData.businessName) {
        newErrors.businessName = "Nome fantasia é obrigatório";
        isValid = false;
      } else if (formData.businessName.length < 3) {
        newErrors.businessName = "Nome deve ter no mínimo 3 caracteres";
        isValid = false;
      } else {
        delete newErrors.businessName;
      }
    }

    if (field === "businessSegment") {
      if (!formData.businessSegment) {
        newErrors.businessSegment = "Ramo de atuação é obrigatório";
        isValid = false;
      } else {
        delete newErrors.businessSegment;
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

    // Validar CNPJ
    if (!formData.cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório";
      isFormValid = false;
    } else if (!isValidCNPJ(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido";
      isFormValid = false;
    }

    // Validar nome fantasia
    if (!formData.businessName) {
      newErrors.businessName = "Nome fantasia é obrigatório";
      isFormValid = false;
    } else if (formData.businessName.length < 3) {
      newErrors.businessName = "Nome deve ter no mínimo 3 caracteres";
      isFormValid = false;
    }

    // Validar ramo de atuação
    if (!formData.businessSegment) {
      newErrors.businessSegment = "Ramo de atuação é obrigatório";
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
      cnpj: true,
      businessName: true,
      businessSegment: true,
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

      // Atualizar perfil com nome da empresa
      await updateProfile(userCredential.user, {
        displayName: formData.businessName,
      });

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, "companies", userCredential.user.uid), {
        email: formData.email,
        cnpj: formData.cnpj.replace(/[^\d]/g, ""),
        businessName: formData.businessName,
        businessSegment: formData.businessSegment,
        accountType: "company",
        createdAt: new Date().toISOString(),
      });

      setStatusMessage("Conta criada com sucesso!");
      setStatusType("success");
      router.replace("/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      setStatusMessage(`Erro: ${message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={signupStyles.container}>
      <ScrollView
        contentContainerStyle={signupStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={signupStyles.card}>
          <View style={signupStyles.appIconWrapper}>
            <Text style={signupStyles.appIcon}>🐾</Text>
          </View>

          <Text style={signupStyles.title}>Cadastro de Empresa</Text>
          <Text style={signupStyles.subtitle}>
            Complete os dados da sua empresa para criar sua conta.
          </Text>

          {!!statusMessage && (
            <StatusMessage
              type={statusType}
              message={statusMessage}
              visible={!!statusMessage}
              onDismiss={() => setStatusMessage("")}
            />
          )}

          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Dados da Empresa</Text>

            <FormInput
              placeholder="Nome da empresa"
              value={formData.businessName}
              onChangeText={(v) => handleFieldChange("businessName", v)}
              onBlur={() => handleFieldBlur("businessName")}
              error={errors.businessName}
              touched={touched.businessName}
              editable={!loading}
            />

            <FormInput
              placeholder="contato@empresa.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(v) => handleFieldChange("email", v)}
              onBlur={() => handleFieldBlur("email")}
              error={errors.email}
              touched={touched.email}
              editable={!loading}
            />

            <FormInput
              placeholder="00.000.000/0000-00"
              keyboardType="numeric"
              value={formData.cnpj}
              onChangeText={(v) => handleFieldChange("cnpj", v)}
              onBlur={() => handleFieldBlur("cnpj")}
              error={errors.cnpj}
              touched={touched.cnpj}
              editable={!loading}
              maxLength={18}
            />
          </View>

          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Ramo de Atuação</Text>

            <Pressable
              onPress={() => setShowSegmentModal(true)}
              style={signupStyles.inputLikeButton}
              disabled={loading}
            >
              <Text
                style={[
                  signupStyles.inputLikeButtonText,
                  !formData.businessSegment &&
                    signupStyles.inputLikeButtonPlaceholder,
                ]}
              >
                {formData.businessSegment || "Selecione o ramo"}
              </Text>
            </Pressable>

            {errors.businessSegment && touched.businessSegment && (
              <Text style={signupStyles.errorText}>
                {errors.businessSegment}
              </Text>
            )}
          </View>

          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Segurança</Text>

            <FormInput
              placeholder="Senha (Mínimo de 6 caracteres)"
              secureTextEntry
              value={formData.password}
              onChangeText={(v) => handleFieldChange("password", v)}
              onBlur={() => handleFieldBlur("password")}
              error={errors.password}
              touched={touched.password}
              editable={!loading}
            />
          </View>

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
                <ActivityIndicator color="#fff" />
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

          <Modal
            visible={showSegmentModal}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setShowSegmentModal(false)}
          >
            <SafeAreaView style={signupStyles.modalContainer}>
              <View style={signupStyles.modalHeader}>
                <Text style={signupStyles.modalTitle}>Selecione o ramo</Text>
                <Pressable onPress={() => setShowSegmentModal(false)}>
                  <Text style={signupStyles.modalCloseText}>Fechar</Text>
                </Pressable>
              </View>

              <FlatList
                data={BUSINESS_SEGMENTS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      handleFieldChange("businessSegment", item);
                      setShowSegmentModal(false);
                    }}
                    style={signupStyles.modalItem}
                  >
                    <Text style={signupStyles.modalItemText}>{item}</Text>
                  </Pressable>
                )}
              />
            </SafeAreaView>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
