import appointmentService from "@/app/services/appointment.service";
import { appointmentStyles } from "@/app/styles/appointment.styles";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import type { Appointment } from "@/types/appointment.types";
import type { Pet } from "@/types/pet.types";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// ─── Constantes de módulo ────────────────────────────────────────────────────

const TODAY = new Date().toISOString().slice(0, 10);

const INITIAL_FORM = {
  title: "",
  date: TODAY,
  time: "09:00",
  location: "",
  notes: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMonthYear(date: Date): string {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
}

function isValidTime(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

// ─── Componente ──────────────────────────────────────────────────────────────

export default function AppointmentScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const db = useMemo(() => getFirestoreDb(), []);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPets, setLoadingPets] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(TODAY);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  // ── Carregamento ────────────────────────────────────────────────────────────

  async function load() {
    try {
      setLoading(true);
      const list = await appointmentService.list();
      setAppointments(list);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as consultas.");
    } finally {
      setLoading(false);
    }
  }

  const loadPets = useCallback(async () => {
    if (!auth.currentUser) {
      setPets([]);
      setSelectedPetId(null);
      return;
    }

    try {
      setLoadingPets(true);
      const q = query(
        collection(db, "pets"),
        where("tutorUid", "==", auth.currentUser.uid),
      );
      const snap = await getDocs(q);
      const items = snap.docs.map((petDoc) => ({
        ...(petDoc.data() as Pet),
        id: petDoc.id,
      }));
      setPets(items);
      setSelectedPetId((current) => current ?? items[0]?.id ?? null);
    } catch {
      setPets([]);
      setSelectedPetId(null);
    } finally {
      setLoadingPets(false);
    }
  }, [auth.currentUser, db]);

  useEffect(() => {
    void loadPets();
  }, [loadPets]);

  // ── Calendário ──────────────────────────────────────────────────────────────

  const dayItems = useMemo(() => {
    const days: {
      date: string | null;
      label: number | null;
      empty?: boolean;
    }[] = [];
    const month = activeMonth.getMonth();
    const year = activeMonth.getFullYear();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    for (let i = 0; i < first.getDay(); i++) {
      days.push({ date: null, label: null, empty: true });
    }

    for (let d = 1; d <= last.getDate(); d++) {
      const dd = new Date(year, month, d);
      days.push({ date: dd.toISOString().slice(0, 10), label: d });
    }

    while (days.length % 7 !== 0) {
      days.push({ date: null, label: null, empty: true });
    }

    return days;
  }, [activeMonth]);

  const countsByDate = useMemo(() => {
    const map = new Map<string, number>();
    appointments.forEach((a) => {
      map.set(a.date, (map.get(a.date) || 0) + 1);
    });
    return map;
  }, [appointments]);

  function prevMonth() {
    setActiveMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setActiveMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  // ── Modal ───────────────────────────────────────────────────────────────────

  function openModal() {
    // Sincroniza o formulário com o dia selecionado no calendário
    setForm({ ...INITIAL_FORM, date: selectedDate });
    setSelectedPetId(pets[0]?.id ?? null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm(INITIAL_FORM);
  }

  // ── Salvar ──────────────────────────────────────────────────────────────────

  async function save() {
    if (!auth.currentUser) {
      Alert.alert("Autenticação necessária", "Você precisa estar logado.");
      return;
    }

    if (!selectedPetId) {
      Alert.alert("Selecione um pet", "Escolha um pet para criar o evento.");
      return;
    }

    if (!form.title.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o título do evento.");
      return;
    }

    if (!isValidDate(form.date)) {
      Alert.alert(
        "Data inválida",
        "Use o formato AAAA-MM-DD (ex: 2025-06-15).",
      );
      return;
    }

    if (!isValidTime(form.time)) {
      Alert.alert("Hora inválida", "Use o formato HH:MM (ex: 09:30).");
      return;
    }

    try {
      const pet = pets.find((item) => item.id === selectedPetId);

      await appointmentService.create({
        petId: selectedPetId,
        petName: pet?.name || "",
        title: form.title.trim(),
        date: form.date,
        time: form.time,
        location: form.location.trim(),
        notes: form.notes.trim(),
        status: "scheduled",
        userUid: auth.currentUser.uid,
        userEmail: auth.currentUser.email || "",
      } as Appointment);

      closeModal();
      await load();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar a consulta.");
    }
  }

  // ── Deletar ─────────────────────────────────────────────────────────────────

  function confirmDelete(appointment: Appointment) {
    Alert.alert("Remover consulta", `Deseja remover "${appointment.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await appointmentService.remove(appointment.id);
            await load();
          } catch {
            Alert.alert("Erro", "Não foi possível remover a consulta.");
          }
        },
      },
    ]);
  }

  // ── Dados do dia selecionado ────────────────────────────────────────────────

  const dayAppointments = appointments.filter((a) => a.date === selectedDate);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={appointmentStyles.safeArea}
          contentContainerStyle={appointmentStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Cabeçalho */}
          <View style={appointmentStyles.header}>
            <View style={appointmentStyles.headerTopRow}>
              <TouchableOpacity
                style={appointmentStyles.backButton}
                onPress={() => router.back()}
                accessibilityLabel="Voltar"
                accessibilityRole="button"
              >
                <Text style={appointmentStyles.backButtonText}>‹</Text>
              </TouchableOpacity>
              <View style={appointmentStyles.headerTexts}>
                <Text style={appointmentStyles.headerTitle}>Consultas</Text>
                <Text style={appointmentStyles.headerSubtitle}>
                  Agenda do seu pet
                </Text>
              </View>
              <TouchableOpacity
                style={appointmentStyles.headerAction}
                onPress={openModal}
                accessibilityLabel="Nova consulta"
                accessibilityRole="button"
              >
                <Text style={appointmentStyles.headerActionText}>Nova</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero */}
          <View style={appointmentStyles.heroCard}>
            <View style={appointmentStyles.heroIconWrap}>
              <Text style={appointmentStyles.heroIcon}>🐶</Text>
            </View>
            <View style={appointmentStyles.heroTexts}>
              <Text style={appointmentStyles.heroTitle}>
                Mantenha as consultas do seu pet em dia
              </Text>
              <Text style={appointmentStyles.heroDescription}>
                Agende vacinas, consultas e banho.
              </Text>
            </View>
          </View>

          {/* Calendário */}
          <View style={appointmentStyles.calendarCard}>
            <View style={appointmentStyles.calendarHeader}>
              <Text style={appointmentStyles.calendarMonth}>
                {formatMonthYear(activeMonth)}
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                  style={appointmentStyles.calendarNavButton}
                  onPress={prevMonth}
                  accessibilityLabel="Mês anterior"
                  accessibilityRole="button"
                >
                  <Text style={appointmentStyles.calendarNavText}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={appointmentStyles.calendarNavButton}
                  onPress={nextMonth}
                  accessibilityLabel="Próximo mês"
                  accessibilityRole="button"
                >
                  <Text style={appointmentStyles.calendarNavText}>{">"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={appointmentStyles.weekRow}>
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((w) => (
                <Text key={w} style={appointmentStyles.weekDay}>
                  {w}
                </Text>
              ))}
            </View>

            <View style={appointmentStyles.calendarGrid}>
              {dayItems.map((d, idx) => {
                if (d.empty) {
                  return (
                    <View
                      key={`empty-${idx}`}
                      style={[
                        appointmentStyles.dayCell,
                        appointmentStyles.dayCellInactive,
                      ]}
                    />
                  );
                }

                const isToday = d.date === TODAY;
                const isSelected = d.date === selectedDate;
                const count = countsByDate.get(d.date as string) || 0;

                return (
                  <TouchableOpacity
                    key={d.date}
                    style={[
                      appointmentStyles.dayCell,
                      isToday && appointmentStyles.dayCellToday,
                      isSelected && appointmentStyles.dayCellSelected,
                    ]}
                    onPress={() => setSelectedDate(d.date as string)}
                    accessibilityLabel={`Dia ${d.label}, ${count} compromisso(s)`}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        appointmentStyles.dayNumber,
                        isSelected && appointmentStyles.dayNumberSelected,
                      ]}
                    >
                      {d.label}
                    </Text>
                    <View style={appointmentStyles.dayDotRow}>
                      {Array.from({ length: Math.min(count, 3) }).map(
                        (_, i) => (
                          <View key={i} style={appointmentStyles.dayDot} />
                        ),
                      )}
                      {count > 3 && (
                        <View style={appointmentStyles.dayDotMore} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Lista do dia */}
          <View style={appointmentStyles.agendaSection}>
            <View style={appointmentStyles.agendaHeader}>
              <Text style={appointmentStyles.agendaTitle}>Agenda</Text>
              <Text style={appointmentStyles.agendaCount}>
                {dayAppointments.length} compromisso(s)
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator style={{ marginVertical: 24 }} />
            ) : dayAppointments.length === 0 ? (
              <View style={appointmentStyles.emptyState}>
                <Text style={appointmentStyles.emptyEmoji}>😴</Text>
                <Text style={appointmentStyles.emptyTitle}>
                  Nenhuma consulta
                </Text>
                <Text style={appointmentStyles.emptyText}>
                  Agende uma nova consulta para o dia selecionado.
                </Text>
              </View>
            ) : (
              <View style={appointmentStyles.appointmentList}>
                {dayAppointments.map((a) => (
                  <View key={a.id} style={appointmentStyles.appointmentCard}>
                    <View style={appointmentStyles.appointmentCardTop}>
                      <View style={appointmentStyles.appointmentTitleBlock}>
                        <Text style={appointmentStyles.appointmentTitle}>
                          {a.title}
                        </Text>
                        <Text style={appointmentStyles.appointmentSubtitle}>
                          {a.petName} • {a.time} • {a.location}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => confirmDelete(a)}
                        accessibilityLabel={`Remover ${a.title}`}
                        accessibilityRole="button"
                      >
                        <Text style={{ color: "#E24B4A", fontSize: 13 }}>
                          Remover
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal fora do ScrollView para evitar conflitos com teclado no Android */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={appointmentStyles.modalBackdrop}>
          <KeyboardAvoidingView
            style={appointmentStyles.modalCard}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              contentContainerStyle={appointmentStyles.modalScrollContent}
            >
              <View style={appointmentStyles.modalHeader}>
                <Text style={appointmentStyles.modalTitle}>Nova Consulta</Text>
                <TouchableOpacity
                  style={appointmentStyles.modalCloseButton}
                  onPress={closeModal}
                  accessibilityLabel="Fechar modal"
                  accessibilityRole="button"
                >
                  <Text style={appointmentStyles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={appointmentStyles.modalSection}>
                <Text style={appointmentStyles.modalSectionTitle}>Pet *</Text>

                {loadingPets ? (
                  <ActivityIndicator style={{ marginTop: 12 }} />
                ) : pets.length > 0 ? (
                  <View style={appointmentStyles.petChipsRow}>
                    {pets.map((pet) => {
                      const isActive = selectedPetId === pet.id;
                      return (
                        <TouchableOpacity
                          key={pet.id}
                          style={[
                            appointmentStyles.petChip,
                            isActive && appointmentStyles.petChipActive,
                          ]}
                          onPress={() => setSelectedPetId(pet.id)}
                        >
                          <Text
                            style={[
                              appointmentStyles.petChipText,
                              isActive && appointmentStyles.petChipTextActive,
                            ]}
                          >
                            {pet.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <>
                    <Text style={appointmentStyles.formHint}>
                      Nenhum pet cadastrado para selecionar.
                    </Text>
                    <TouchableOpacity
                      style={appointmentStyles.linkButton}
                      onPress={() => {
                        closeModal();
                        router.push("/pet-register");
                      }}
                    >
                      <Text style={appointmentStyles.linkButtonText}>
                        Cadastrar pet
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View style={appointmentStyles.modalSection}>
                <Text style={appointmentStyles.modalSectionTitle}>
                  Título *
                </Text>
                <TextInput
                  placeholder="Ex: Consulta veterinária"
                  value={form.title}
                  onChangeText={(t) => setForm((s) => ({ ...s, title: t }))}
                  style={appointmentStyles.modalInput}
                  returnKeyType="next"
                />
              </View>

              <View style={appointmentStyles.modalSection}>
                <Text style={appointmentStyles.modalSectionTitle}>Data *</Text>
                <TextInput
                  placeholder="AAAA-MM-DD"
                  value={form.date}
                  onChangeText={(t) => setForm((s) => ({ ...s, date: t }))}
                  style={appointmentStyles.modalInput}
                  keyboardType="numeric"
                  maxLength={10}
                  returnKeyType="next"
                />
              </View>

              <View style={appointmentStyles.modalSection}>
                <Text style={appointmentStyles.modalSectionTitle}>Hora *</Text>
                <TextInput
                  placeholder="HH:MM"
                  value={form.time}
                  onChangeText={(t) => setForm((s) => ({ ...s, time: t }))}
                  style={appointmentStyles.modalInput}
                  keyboardType="numeric"
                  maxLength={5}
                  returnKeyType="next"
                />
              </View>

              <View style={appointmentStyles.modalSection}>
                <Text style={appointmentStyles.modalSectionTitle}>Local</Text>
                <TextInput
                  placeholder="Clínica, Pet shop..."
                  value={form.location}
                  onChangeText={(t) => setForm((s) => ({ ...s, location: t }))}
                  style={appointmentStyles.modalInput}
                  returnKeyType="next"
                />
              </View>

              <View style={appointmentStyles.modalSection}>
                <Text style={appointmentStyles.modalSectionTitle}>Notas</Text>
                <TextInput
                  placeholder="Observações"
                  value={form.notes}
                  onChangeText={(t) => setForm((s) => ({ ...s, notes: t }))}
                  style={appointmentStyles.modalInput}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={appointmentStyles.modalButtonRow}>
                <TouchableOpacity
                  style={appointmentStyles.cancelButton}
                  onPress={closeModal}
                >
                  <Text style={appointmentStyles.cancelButtonText}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={appointmentStyles.saveButton}
                  onPress={save}
                >
                  <Text style={appointmentStyles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}
