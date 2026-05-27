import { vaccinesStyles } from "@/app/styles/vaccines.styles";
import { FormInput } from "@/components/form-input";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { Pet } from "@/types/pet.types";
import { formatDate } from "@/utils/validators";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

interface VaccineRecord {
  id: string;
  name: string;
  applicationDate: string;
  nextDue: string;
  petId: string;
  petName: string;
  createdAt?: string;
}

const styles = vaccinesStyles;

export default function VaccinesScreen() {
  const router = useRouter();

  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const db = useMemo(() => getFirestoreDb(), []);

  const [pets, setPets] = useState<Pet[]>([]);
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [vaccineName, setVaccineName] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [nextDue, setNextDue] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVaccineId, setEditingVaccineId] = useState<string | null>(null);
  const [editingOriginalCreatedAt, setEditingOriginalCreatedAt] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success",
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const loadPets = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const q = query(
        collection(db, "pets"),
        where("tutorUid", "==", auth.currentUser.uid),
      );
      const snap = await getDocs(q);
      const items: Pet[] = snap.docs.map((d) => ({
        ...(d.data() as any),
        id: d.id,
      }));
      setPets(items);
      if (items.length > 0 && !selectedPetId)
        setSelectedPetId(items[0]?.id ?? null);
    } catch {
      // ignore for now
    }
  }, [auth.currentUser, db, selectedPetId]);

  const loadVaccines = useCallback(async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "vaccines"),
        where("tutorUid", "==", auth.currentUser.uid),
      );
      const snap = await getDocs(q);
      const items: VaccineRecord[] = snap.docs
        .map((d) => ({
          ...(d.data() as any),
          id: d.id,
        }))
        .sort((a, b) => {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        });
      setVaccines(items);
    } catch (error) {
      console.warn("Erro ao carregar vacinas:", error);
    } finally {
      setLoading(false);
    }
  }, [auth.currentUser, db]);

  useEffect(() => {
    loadPets();
    loadVaccines();
  }, [auth.currentUser, loadPets, loadVaccines]);

  function clearForm() {
    setSelectedPetId(pets[0]?.id ?? null);
    setVaccineName("");
    setApplicationDate("");
    setNextDue("");
  }

  function clearEditForm() {
    setEditingVaccineId(null);
    setEditingOriginalCreatedAt("");
    setShowDeleteConfirm(false);
    setSelectedPetId(pets[0]?.id ?? null);
    setVaccineName("");
    setApplicationDate("");
    setNextDue("");
  }

  function openCreateModal() {
    clearForm();
    setShowAddModal(true);
  }

  function openEditModal(vaccine: VaccineRecord) {
    setEditingVaccineId(vaccine.id);
    setEditingOriginalCreatedAt(vaccine.createdAt ?? "");
    setSelectedPetId(vaccine.petId);
    setVaccineName(vaccine.name);
    setApplicationDate(vaccine.applicationDate);
    setNextDue(vaccine.nextDue);
    setShowEditModal(true);
  }

  function openFeedbackModal(type: "success" | "error", message: string) {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackVisible(true);
  }

  function closeFeedbackModal() {
    setFeedbackVisible(false);
  }

  async function handleDeleteVaccine() {
    if (!auth.currentUser) {
      openFeedbackModal("error", "Você precisa estar logado.");
      return;
    }

    if (!editingVaccineId) {
      openFeedbackModal("error", "Vacina inválida para exclusão.");
      return;
    }

    try {
      setLoading(true);
      await deleteDoc(doc(db, "vaccines", editingVaccineId));
      setVaccines((current) =>
        current.filter((item) => item.id !== editingVaccineId),
      );
      setShowDeleteConfirm(false);
      setShowEditModal(false);
      clearEditForm();
      openFeedbackModal("success", "Vacina excluída com sucesso.");
      void loadVaccines();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao excluir";
      openFeedbackModal("error", `Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveVaccine() {
    if (!auth.currentUser) {
      openFeedbackModal("error", "Você precisa estar logado.");
      return;
    }

    if (!selectedPetId) {
      openFeedbackModal("error", "Selecione um pet.");
      return;
    }

    if (!vaccineName.trim()) {
      openFeedbackModal("error", "Informe o nome da vacina.");
      return;
    }

    try {
      setLoading(true);

      const pet = pets.find((p) => p.id === selectedPetId)!;
      const createdAt = new Date().toISOString();

      const payload = {
        name: vaccineName.trim(),
        applicationDate: applicationDate,
        nextDue: nextDue,
        petId: selectedPetId,
        petName: pet?.name || "",
        tutorUid: auth.currentUser.uid,
        tutorName: auth.currentUser.displayName || "Usuário",
        tutorEmail: auth.currentUser.email || "",
        createdAt,
      } as any;

      const docRef = await addDoc(collection(db, "vaccines"), payload);
      setVaccines((current) => [
        {
          id: docRef.id,
          name: payload.name,
          applicationDate: payload.applicationDate,
          nextDue: payload.nextDue,
          petId: payload.petId,
          petName: payload.petName,
          createdAt: payload.createdAt,
        },
        ...current,
      ]);
      setShowAddModal(false);
      clearForm();
      openFeedbackModal("success", "Vacina registrada com sucesso.");
      void loadVaccines();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao salvar";
      openFeedbackModal("error", `Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateVaccine() {
    if (!auth.currentUser) {
      openFeedbackModal("error", "Você precisa estar logado.");
      return;
    }

    if (!editingVaccineId) {
      openFeedbackModal("error", "Vacina inválida para edição.");
      return;
    }

    if (!selectedPetId) {
      openFeedbackModal("error", "Selecione um pet.");
      return;
    }

    if (!vaccineName.trim()) {
      openFeedbackModal("error", "Informe o nome da vacina.");
      return;
    }

    try {
      setLoading(true);

      const pet = pets.find((p) => p.id === selectedPetId);
      const payload = {
        name: vaccineName.trim(),
        applicationDate,
        nextDue,
        petId: selectedPetId,
        petName: pet?.name || "",
        tutorUid: auth.currentUser.uid,
        tutorName: auth.currentUser.displayName || "Usuário",
        tutorEmail: auth.currentUser.email || "",
        createdAt: editingOriginalCreatedAt || new Date().toISOString(),
      };

      await updateDoc(doc(db, "vaccines", editingVaccineId), payload as any);
      setVaccines((current) =>
        current.map((item) =>
          item.id === editingVaccineId
            ? {
                ...item,
                id: editingVaccineId,
                name: payload.name,
                applicationDate: payload.applicationDate,
                nextDue: payload.nextDue,
                petId: payload.petId,
                petName: payload.petName,
                createdAt: payload.createdAt,
              }
            : item,
        ),
      );
      setShowEditModal(false);
      clearEditForm();
      openFeedbackModal("success", "Vacina atualizada com sucesso.");
      void loadVaccines();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro ao atualizar";
      openFeedbackModal("error", `Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  const upcomingVaccines = vaccines.filter((v) => {
    if (!v.nextDue) return false;
    const parsed = new Date(v.nextDue.split("/").reverse().join("-"));
    return parsed.getTime() < Date.now() + 30 * 24 * 60 * 60 * 1000;
  });

  return (
    <SafeAreaView style={vaccinesStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* ── Header ── */}
          <View style={vaccinesStyles.header}>
            <Pressable
              onPress={() => router.back()}
              style={vaccinesStyles.backButton}
            >
              <Text style={vaccinesStyles.backButtonText}>‹</Text>
            </Pressable>
            <Text style={vaccinesStyles.headerTitle}>
              Carteirinha de Vacinas
            </Text>
          </View>

          {/* ── Patinhas decorativas ── */}
          <Text style={[vaccinesStyles.pawDecor, { top: 60, right: 16 }]}>
            🐾
          </Text>
          <Text style={[vaccinesStyles.pawDecor, { top: 160, left: -8 }]}>
            🐾
          </Text>

          {/* ── Alerta vacinas próximas ── */}
          {upcomingVaccines.length > 0 && (
            <View style={vaccinesStyles.alertSection}>
              <Text style={vaccinesStyles.alertTitle}>
                ⚠️ {upcomingVaccines.length} vacinação(ões) vencendo em breve
              </Text>
              <Text style={vaccinesStyles.alertDescription}>
                Fique em dia com a saúde do seu pet nos próximos 30 dias
              </Text>
            </View>
          )}

          {/* ── Botão adicionar ── */}
          <View style={vaccinesStyles.actionSection}>
            <Pressable
              style={vaccinesStyles.addButton}
              onPress={openCreateModal}
            >
              <Text style={vaccinesStyles.addButtonText}>
                + Adicionar Vacinação
              </Text>
            </Pressable>
          </View>

          {/* ── Histórico ── */}
          <View style={vaccinesStyles.section}>
            <Text style={vaccinesStyles.sectionTitle}>
              Histórico de Vacinações
            </Text>

            {loading ? (
              <ActivityIndicator style={{ marginTop: 20 }} />
            ) : vaccines.length > 0 ? (
              vaccines.map((vaccine) => (
                <View key={vaccine.id} style={vaccinesStyles.vaccineCard}>
                  {/* Nome + status */}
                  <View style={vaccinesStyles.vaccineCardHeader}>
                    <Text style={vaccinesStyles.vaccineName}>
                      {vaccine.name}
                    </Text>
                    <Text style={vaccinesStyles.vaccineStatus}>✓ Aplicada</Text>
                  </View>

                  {/* Infos em linha */}
                  <View style={vaccinesStyles.vaccineCardInfo}>
                    <View style={vaccinesStyles.infoRow}>
                      <Text style={vaccinesStyles.infoLabel}>Pet</Text>
                      <Text style={vaccinesStyles.infoValue}>
                        {vaccine.petName}
                      </Text>
                    </View>
                    <View style={vaccinesStyles.infoRow}>
                      <Text style={vaccinesStyles.infoLabel}>
                        Data aplicação
                      </Text>
                      <Text style={vaccinesStyles.infoValue}>
                        {vaccine.applicationDate}
                      </Text>
                    </View>
                    <View style={vaccinesStyles.infoRow}>
                      <Text style={vaccinesStyles.infoLabel}>
                        Próximo reforço
                      </Text>
                      <Text style={vaccinesStyles.infoValue}>
                        {vaccine.nextDue}
                      </Text>
                    </View>
                  </View>

                  {/* Botão editar */}
                  <Pressable
                    style={vaccinesStyles.editButton}
                    onPress={() => openEditModal(vaccine)}
                  >
                    <Text style={vaccinesStyles.editButtonText}>Editar</Text>
                  </Pressable>
                </View>
              ))
            ) : (
              <View style={vaccinesStyles.emptyState}>
                <Text style={vaccinesStyles.emptyStateEmoji}>💉</Text>
                <Text style={vaccinesStyles.emptyStateText}>
                  Nenhuma vacinação registrada
                </Text>
                <Text style={vaccinesStyles.emptyStateSubtext}>
                  Comece adicionando a primeira vacinação do seu pet
                </Text>
              </View>
            )}
          </View>

          {/* ── Modal de adicionar vacina ── */}
          <Modal visible={showAddModal} animationType="slide" transparent>
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Adicionar Vacinação</Text>

                <Text style={styles.fieldLabel}>Pet</Text>
                <View style={styles.petList}>
                  {pets.length === 0 ? (
                    <Text style={styles.noPets}>Nenhum pet encontrado</Text>
                  ) : (
                    pets.map((p) => (
                      <Pressable
                        key={p.id}
                        style={[
                          styles.petItem,
                          selectedPetId === p.id && styles.petItemActive,
                        ]}
                        onPress={() => setSelectedPetId(p.id)}
                      >
                        <Text style={styles.petName}>{p.name}</Text>
                        <Text style={styles.petMeta}>{p.species}</Text>
                      </Pressable>
                    ))
                  )}
                </View>

                <FormInput
                  label="Vacina"
                  placeholder="Ex.: Raiva"
                  value={vaccineName}
                  onChangeText={setVaccineName}
                />

                <FormInput
                  label="Data aplicação"
                  placeholder="DD/MM/AAAA"
                  value={applicationDate}
                  onChangeText={(v) => setApplicationDate(formatDate(v))}
                />

                <FormInput
                  label="Próximo reforço"
                  placeholder="DD/MM/AAAA"
                  value={nextDue}
                  onChangeText={(v) => setNextDue(formatDate(v))}
                />

                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.primaryButton}
                    onPress={handleSaveVaccine}
                  >
                    <Text style={styles.primaryButtonText}>Salvar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => {
                      setShowAddModal(false);
                      clearForm();
                    }}
                  >
                    <Text style={styles.secondaryButtonText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* ── Modal de editar vacina ── */}
          <Modal visible={showEditModal} animationType="slide" transparent>
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Editar Vacinação</Text>

                <Text style={styles.fieldLabel}>Pet</Text>
                <View style={styles.petList}>
                  {pets.length === 0 ? (
                    <Text style={styles.noPets}>Nenhum pet encontrado</Text>
                  ) : (
                    pets.map((p) => (
                      <Pressable
                        key={p.id}
                        style={[
                          styles.petItem,
                          selectedPetId === p.id && styles.petItemActive,
                        ]}
                        onPress={() => setSelectedPetId(p.id)}
                      >
                        <Text style={styles.petName}>{p.name}</Text>
                        <Text style={styles.petMeta}>{p.species}</Text>
                      </Pressable>
                    ))
                  )}
                </View>

                <FormInput
                  label="Vacina"
                  placeholder="Ex.: Raiva"
                  value={vaccineName}
                  onChangeText={setVaccineName}
                />

                <FormInput
                  label="Data aplicação"
                  placeholder="DD/MM/AAAA"
                  value={applicationDate}
                  onChangeText={(v) => setApplicationDate(formatDate(v))}
                />

                <FormInput
                  label="Próximo reforço"
                  placeholder="DD/MM/AAAA"
                  value={nextDue}
                  onChangeText={(v) => setNextDue(formatDate(v))}
                />

                <View style={styles.modalButtons}>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => setShowDeleteConfirm(true)}
                  >
                    <Text style={styles.deleteButtonText}>🗑</Text>
                  </Pressable>
                  <Pressable
                    style={styles.primaryButton}
                    onPress={handleUpdateVaccine}
                  >
                    <Text style={styles.primaryButtonText}>Salvar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => {
                      setShowEditModal(false);
                      clearEditForm();
                    }}
                  >
                    <Text style={styles.secondaryButtonText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* ── Confirmação de exclusão ── */}
          <Modal visible={showDeleteConfirm} transparent animationType="fade">
            <View style={styles.feedbackBackdrop}>
              <View style={styles.feedbackCard}>
                <Text style={[styles.feedbackIcon, styles.feedbackIconError]}>
                  🗑
                </Text>
                <Text style={styles.feedbackTitle}>Excluir vacinação?</Text>
                <Text style={styles.feedbackMessage}>
                  Esta ação remove a vacina da carteirinha do pet.
                </Text>

                <View style={styles.confirmDeleteButtons}>
                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => setShowDeleteConfirm(false)}
                  >
                    <Text style={styles.secondaryButtonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.deleteConfirmButton}
                    onPress={handleDeleteVaccine}
                  >
                    <Text style={styles.deleteConfirmButtonText}>Excluir</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* ── Popup de confirmação ── */}
          <Modal visible={feedbackVisible} transparent animationType="fade">
            <View style={styles.feedbackBackdrop}>
              <View style={styles.feedbackCard}>
                <Text
                  style={[
                    styles.feedbackIcon,
                    feedbackType === "success"
                      ? styles.feedbackIconSuccess
                      : styles.feedbackIconError,
                  ]}
                >
                  {feedbackType === "success" ? "✓" : "!"}
                </Text>
                <Text style={styles.feedbackTitle}>
                  {feedbackType === "success" ? "Pronto" : "Atenção"}
                </Text>
                <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>

                <Pressable
                  style={styles.feedbackButton}
                  onPress={closeFeedbackModal}
                >
                  <Text style={styles.feedbackButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
