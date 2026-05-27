import { colors } from "@/app/styles/tokens/tokens";
import { FormInput } from "@/components/form-input";
import { StatusMessage, StatusType } from "@/components/status-message";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { Pet } from "@/types/pet.types";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface PetFormState {
  name: string;
  species: string;
  breed: string;
  sex: string;
  age: string;
  weight: string;
}

type FormErrors = Partial<Record<keyof PetFormState, string>>;
type FormTouched = Partial<Record<keyof PetFormState, boolean>>;

const SPECIES_OPTIONS = ["Cachorro", "Gato", "Pássaro", "Peixe", "Outro"];
const SEX_OPTIONS = ["Macho", "Fêmea"];

function parseNumber(value: string): number {
  return Number(value.replace(",", "."));
}

export default function PetRegisterScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const db = useMemo(() => getFirestoreDb(), []);

  const [formData, setFormData] = useState<PetFormState>({
    name: "",
    species: "Cachorro",
    breed: "",
    sex: "Macho",
    age: "",
    weight: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: StatusType }>({
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (!auth.currentUser) {
      setStatus({
        message: "Você precisa estar logado para cadastrar um pet.",
        type: "error",
      });
      return;
    }
  }, [auth.currentUser]);

  function updateField(field: keyof PetFormState, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function blurField(field: keyof PetFormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  function validateField(field: keyof PetFormState): string {
    if (field === "name")
      return formData.name.trim() ? "" : "Nome é obrigatório";
    if (field === "breed")
      return formData.breed.trim() ? "" : "Raça é obrigatória";
    if (field === "age") {
      if (!formData.age.trim()) return "Idade é obrigatória";
      const age = Number(formData.age);
      if (!Number.isInteger(age) || age <= 0) return "Idade inválida";
      return "";
    }
    if (field === "weight") {
      if (!formData.weight.trim()) return "Peso é obrigatório";
      const weight = parseNumber(formData.weight);
      if (Number.isNaN(weight) || weight <= 0) return "Peso inválido";
      return "";
    }
    if (field === "species")
      return formData.species ? "" : "Espécie é obrigatória";
    if (field === "sex") return formData.sex ? "" : "Sexo é obrigatório";
    return "";
  }

  function validateAll(): boolean {
    const nextErrors: FormErrors = {
      name: validateField("name"),
      species: validateField("species"),
      breed: validateField("breed"),
      sex: validateField("sex"),
      age: validateField("age"),
      weight: validateField("weight"),
    };

    Object.keys(nextErrors).forEach((key) => {
      const typedKey = key as keyof FormErrors;
      if (!nextErrors[typedKey]) delete nextErrors[typedKey];
    });

    setErrors(nextErrors);
    setTouched({
      name: true,
      species: true,
      breed: true,
      sex: true,
      age: true,
      weight: true,
    });

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSavePet() {
    if (!auth.currentUser) {
      setStatus({
        message: "Você precisa estar logado para cadastrar um pet.",
        type: "error",
      });
      return;
    }

    if (!validateAll()) {
      setStatus({
        message: "Revise os campos antes de salvar.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: "", type: "success" });

      const petPayload: Omit<Pet, "id"> = {
        name: formData.name.trim(),
        species: formData.species,
        breed: formData.breed.trim(),
        sex: formData.sex,
        age: Number(formData.age),
        weight: parseNumber(formData.weight),
        registrationDate: new Date().toLocaleDateString("pt-BR"),
        tutorUid: auth.currentUser.uid,
        tutorName: auth.currentUser.displayName || "Usuário",
        tutorEmail: auth.currentUser.email || "",
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "pets"), petPayload);
      router.back();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao cadastrar pet.";
      setStatus({ message: `Erro: ${message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>‹</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.icon}>🐾</Text>
            <Text style={styles.title}>Cadastrar pet</Text>
            <Text style={styles.subtitle}>
              Preencha os dados do pet e mantenha o tutor vinculado ao seu
              perfil.
            </Text>

            {!!status.message && (
              <StatusMessage
                type={status.type}
                message={status.message}
                visible={!!status.message}
                onDismiss={() => setStatus({ message: "", type: "success" })}
              />
            )}

            <FormInput
              label="Nome do pet"
              placeholder="Ex.: Max"
              value={formData.name}
              onChangeText={(value) => updateField("name", value)}
              onBlur={() => blurField("name")}
              error={errors.name}
              touched={touched.name}
              editable={!loading}
            />

            <Text style={styles.groupLabel}>Espécie</Text>
            <View style={styles.chipRow}>
              {SPECIES_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.chip,
                    formData.species === option && styles.chipActive,
                  ]}
                  onPress={() => updateField("species", option)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.chipText,
                      formData.species === option && styles.chipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
            {!!errors.species && touched.species && (
              <Text style={styles.fieldError}>{errors.species}</Text>
            )}

            <FormInput
              label="Raça"
              placeholder="Ex.: Golden Retriever"
              value={formData.breed}
              onChangeText={(value) => updateField("breed", value)}
              onBlur={() => blurField("breed")}
              error={errors.breed}
              touched={touched.breed}
              editable={!loading}
            />

            <Text style={styles.groupLabel}>Sexo</Text>
            <View style={styles.chipRow}>
              {SEX_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.chip,
                    formData.sex === option && styles.chipActive,
                  ]}
                  onPress={() => updateField("sex", option)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.chipText,
                      formData.sex === option && styles.chipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
            {!!errors.sex && touched.sex && (
              <Text style={styles.fieldError}>{errors.sex}</Text>
            )}

            <View style={styles.inlineRow}>
              <View style={styles.inlineField}>
                <FormInput
                  label="Idade"
                  placeholder="Ex.: 3"
                  value={formData.age}
                  onChangeText={(value) => updateField("age", value)}
                  onBlur={() => blurField("age")}
                  error={errors.age}
                  touched={touched.age}
                  editable={!loading}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.inlineField}>
                <FormInput
                  label="Peso"
                  placeholder="Ex.: 12.5"
                  value={formData.weight}
                  onChangeText={(value) => updateField("weight", value)}
                  onBlur={() => blurField("weight")}
                  error={errors.weight}
                  touched={touched.weight}
                  editable={!loading}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.tutorCard}>
              <Text style={styles.tutorLabel}>Tutor vinculado</Text>
              <Text style={styles.tutorValue}>
                {auth.currentUser?.displayName || "Usuário"}
              </Text>
              <Text style={styles.tutorHint}>
                {auth.currentUser?.email || "Nenhum email disponível"}
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleSavePet}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.wine} />
                ) : (
                  <Text style={styles.primaryButtonText}>Salvar pet</Text>
                )}
              </Pressable>

              <Pressable
                style={styles.secondaryButton}
                onPress={() => router.back()}
                disabled={loading}
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.wine,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 22,
    color: colors.cream,
    fontWeight: "700",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.wineLight,
  },
  icon: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.cream,
    textAlign: "center",
  },
  subtitle: {
    color: colors.cream,
    opacity: 0.7,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 20,
  },
  groupLabel: {
    color: colors.cream,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.creamDark,
    backgroundColor: "rgba(245, 236, 215, 0.08)",
  },
  chipActive: {
    backgroundColor: colors.cream,
    borderColor: colors.cream,
  },
  chipText: {
    color: colors.cream,
    fontWeight: "800",
  },
  chipTextActive: {
    color: colors.wine,
  },
  fieldError: {
    color: colors.statusError,
    marginTop: 4,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  inlineRow: {
    flexDirection: "row",
    gap: 12,
  },
  inlineField: {
    flex: 1,
  },
  tutorCard: {
    marginTop: 6,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(245, 236, 215, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(245, 236, 215, 0.2)",
  },
  tutorLabel: {
    color: colors.cream,
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  tutorValue: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "900",
  },
  tutorHint: {
    color: colors.cream,
    opacity: 0.65,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 999,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.wine,
    fontWeight: "900",
    fontSize: 16,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.cream,
    fontWeight: "900",
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
