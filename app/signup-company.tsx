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
import { signupStyles } from "./styles/signup.styles.company";

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

  function handleSelectSegment(segment: string) {
    handleFieldChange("businessSegment", segment);
    setShowSegmentModal(false);
    setTouched((prev) => ({
      ...prev,
      businessSegment: true,
    }));
    validateField("businessSegment");
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
            <Text style={signupStyles.appIcon}>🏢</Text>
          </View>

          {/* ── Título ────────────────────────────────────────────── */}
          <Text style={signupStyles.title}>Criar conta de Empresa</Text>

          {/* ── Subtítulo ──────────────────────────────────────────── */}
          <Text style={signupStyles.subtitle}>
            Cadastre seu negócio e comece a ser descoberto por amantes de
            animais.
          </Text>

          {/* ── Status message ────────────────────────────────────── */}
          {statusMessage && (
            <StatusMessage
              type={statusType}
              message={statusMessage}
              visible={!!statusMessage}
            />
          )}

          {/* ── Seção de dados empresariais ────────────────────────── */}
          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Dados Empresariais</Text>

            <FormInput
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              keyboardType="numeric"
              value={formData.cnpj}
              onChangeText={(value) => handleFieldChange("cnpj", value)}
              onBlur={() => handleFieldBlur("cnpj")}
              error={errors.cnpj}
              touched={touched.cnpj}
              editable={!loading}
              maxLength={18}
            />

            <FormInput
              label="Nome Fantasia"
              placeholder="Nome do seu negócio"
              value={formData.businessName}
              onChangeText={(value) => handleFieldChange("businessName", value)}
              onBlur={() => handleFieldBlur("businessName")}
              error={errors.businessName}
              touched={touched.businessName}
              editable={!loading}
            />

            {/* ── Seletor de ramo de atuação ────────────────────── */}
            <View>
              <Text style={signupStyles.label}>Ramo de Atuação</Text>
              <Pressable
                style={[
                  signupStyles.selectWrapper,
                  touched.businessSegment &&
                    errors.businessSegment &&
                    signupStyles.inputWithError,
                ]}
                onPress={() => !loading && setShowSegmentModal(true)}
                disabled={loading}
              >
                <Text
                  style={[
                    signupStyles.selectText,
                    !formData.businessSegment && signupStyles.selectPlaceholder,
                  ]}
                >
                  {formData.businessSegment || "Selecione o ramo"}
                </Text>
              </Pressable>
              {touched.businessSegment && errors.businessSegment && (
                <Text style={signupStyles.fieldError}>
                  {errors.businessSegment}
                </Text>
              )}
            </View>
          </View>

          {/* ── Seção de contato ──────────────────────────────────── */}
          <View style={signupStyles.formSection}>
            <Text style={signupStyles.sectionTitle}>Contato</Text>

            <FormInput
              label="Email"
              placeholder="contato@empresa.com.br"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => handleFieldChange("email", value)}
              onBlur={() => handleFieldBlur("email")}
              error={errors.email}
              touched={touched.email}
              editable={!loading}
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

      {/* ── Modal de seleção de ramo ───────────────────────────── */}
      <Modal
        visible={showSegmentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSegmentModal(false)}
      >
        <Pressable
          style={signupStyles.modalOverlay}
          onPress={() => setShowSegmentModal(false)}
        >
          <View style={signupStyles.modalContent}>
            <FlatList
              data={BUSINESS_SEGMENTS}
              keyExtractor={(item) => item}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    signupStyles.modalItem,
                    item === formData.businessSegment &&
                      signupStyles.modalItemSelected,
                  ]}
                  onPress={() => handleSelectSegment(item)}
                >
                  <Text style={signupStyles.modalItemText}>{item}</Text>
                  {item === formData.businessSegment && (
                    <Text style={signupStyles.modalItemText}>✓</Text>
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
