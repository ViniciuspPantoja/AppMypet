import { FormInput } from "@/components/form-input";
import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
import { Pet } from "@/types/pet.types";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { petDetailsStyles as styles } from "../../styles/pet-details.styles";

interface VaccineItem {
  id: string;
  name: string;
  date: string;
  nextDue: string;
}

interface EditForm {
  name: string;
  species: string;
  breed: string;
  sex: string;
  age: string;
  weight: string;
}

const SPECIES = ["Cachorro", "Gato", "Outro"];
const SEX = ["Macho", "Fêmea"];

export default function PetDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ petId?: string }>();
  const petId = useMemo(() => String(params.petId || ""), [params.petId]);

  const [pet, setPet] = useState<Pet | null>(null);
  const [vaccines, setVaccines] = useState<VaccineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({ name: "", species: "", breed: "", sex: "", age: "", weight: "" });
  const [saving, setSaving] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadPetDetails = useCallback(async () => {
    try {
      const auth = getAuth(getFirebaseApp());
      const db = getFirestoreDb();
      if (!auth.currentUser || !petId) { setPet(null); setVaccines([]); return; }

      const snap = await getDocs(query(collection(db, "pets"), where("tutorUid", "==", auth.currentUser.uid)));
      const matched = snap.docs.find((d) => d.id === petId);
      if (!matched) { setPet(null); setVaccines([]); return; }

      const petData = matched.data() as Omit<Pet, "id">;
      setPet({ id: matched.id, ...petData });

      const vSnap = await getDocs(query(
        collection(db, "vaccines"),
        where("tutorUid", "==", auth.currentUser.uid),
        where("petId", "==", matched.id),
      ));
      setVaccines(vSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useFocusEffect(useCallback(() => { loadPetDetails(); }, [loadPetDetails]));

  function openEdit() {
    if (!pet) return;
    setEditForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      sex: pet.sex || "",
      age: String(pet.age),
      weight: String(pet.weight),
    });
    setShowEditModal(true);
  }

  async function handleSaveEdit() {
    if (!pet) return;
    if (!editForm.name.trim()) return;
    setSaving(true);
    try {
      const db = getFirestoreDb();
      const payload = {
        name: editForm.name.trim(),
        species: editForm.species,
        breed: editForm.breed.trim(),
        sex: editForm.sex,
        age: Number(editForm.age) || pet.age,
        weight: parseFloat(editForm.weight.replace(",", ".")) || pet.weight,
      };
      await updateDoc(doc(db, "pets", pet.id), payload);
      setPet((prev) => prev ? { ...prev, ...payload } : prev);
      setShowEditModal(false);
    } catch {
      // falha silenciosa — mantém modal aberto
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!pet) return;
    setDeleting(true);
    try {
      const db = getFirestoreDb();
      await deleteDoc(doc(db, "pets", pet.id));
      setShowDeleteConfirm(false);
      router.back();
    } catch {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes do pet</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <ActivityIndicator color="#7B1E2E" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!pet) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes do pet</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionCard}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🐾</Text>
              <Text style={styles.emptyText}>Pet não encontrado</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes do pet</Text>
        </View>

        {/* ── Hero card ── */}
        <View style={styles.hero}>
          <View style={styles.heroCard}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarEmoji}>
                {pet.species === "Gato" ? "🐈" : pet.species === "Pássaro" ? "🐦" : pet.species === "Peixe" ? "🐟" : "🐕"}
              </Text>
            </View>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petSubtitle}>{pet.species} • {pet.breed}{pet.sex ? ` • ${pet.sex}` : ""}</Text>
            <View style={styles.quickStats}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Idade</Text>
                <Text style={styles.statValue}>{pet.age} anos</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Peso</Text>
                <Text style={styles.statValue}>{pet.weight} kg</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Vacinas</Text>
                <Text style={styles.statValue}>{vaccines.length}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Botões editar / excluir ── */}
        <View style={styles.actionRow}>
          <Pressable style={styles.editButton} onPress={openEdit}>
            <Text style={styles.editButtonText}>✏️ Editar pet</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={() => setShowDeleteConfirm(true)}>
            <Text style={styles.deleteButtonText}>🗑 Excluir</Text>
          </Pressable>
        </View>

        {/* ── Informações ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do pet</Text>
          <View style={styles.sectionCard}>
            <View style={styles.infoGrid}>
              {[
                ["Nome", pet.name],
                ["Espécie", pet.species],
                ["Raça", pet.breed],
                ["Sexo", pet.sex || "Não informado"],
                ["Idade", `${pet.age} anos`],
                ["Peso", `${pet.weight} kg`],
                ["Tutor", pet.tutorName || "Não informado"],
              ].map(([label, value]) => (
                <View key={label} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{label}</Text>
                  <Text style={styles.infoValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Vacinas ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vacinas do pet</Text>
          <View style={styles.sectionCard}>
            {vaccines.length > 0 ? vaccines.map((v) => (
              <View key={v.id} style={styles.vaccineCard}>
                <View style={styles.vaccineHeader}>
                  <Text style={styles.vaccineName}>{v.name}</Text>
                  <Text style={styles.vaccineStatus}>Aplicada</Text>
                </View>
                <Text style={styles.vaccineMeta}>Aplicação em {v.date}</Text>
                <Text style={styles.vaccineDates}>Próximo reforço: {v.nextDue}</Text>
              </View>
            )) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>💉</Text>
                <Text style={styles.emptyText}>Nenhuma vacina vinculada</Text>
                <Text style={styles.emptySubtext}>Aqui aparecerão as vacinas cadastradas para este pet.</Text>
              </View>
            )}
            <Pressable style={styles.sectionAction} onPress={() => router.push("/vaccines")}>
              <Text style={styles.sectionActionText}>Ver carteirinha completa</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* ── Modal de edição ── */}
      <Modal visible={showEditModal} transparent animationType="slide" onRequestClose={() => setShowEditModal(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={{ flex: 1 }} onPress={() => setShowEditModal(false)} />
          <ScrollView contentContainerStyle={styles.modalCard} keyboardShouldPersistTaps="handled">
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Editar pet</Text>

            <FormInput label="Nome" placeholder="Ex.: Max" value={editForm.name}
              onChangeText={(v) => setEditForm((p) => ({ ...p, name: v }))} editable={!saving} />

            <Text style={styles.fieldLabel}>Espécie</Text>
            <View style={styles.chipRow}>
              {SPECIES.map((s) => (
                <Pressable key={s} style={[styles.chip, editForm.species === s && styles.chipActive]}
                  onPress={() => setEditForm((p) => ({ ...p, species: s }))}>
                  <Text style={[styles.chipText, editForm.species === s && styles.chipTextActive]}>{s}</Text>
                </Pressable>
              ))}
            </View>

            <FormInput label="Raça" placeholder="Ex.: Golden Retriever" value={editForm.breed}
              onChangeText={(v) => setEditForm((p) => ({ ...p, breed: v }))} editable={!saving} />

            <Text style={styles.fieldLabel}>Sexo</Text>
            <View style={styles.chipRow}>
              {SEX.map((s) => (
                <Pressable key={s} style={[styles.chip, editForm.sex === s && styles.chipActive]}
                  onPress={() => setEditForm((p) => ({ ...p, sex: s }))}>
                  <Text style={[styles.chipText, editForm.sex === s && styles.chipTextActive]}>{s}</Text>
                </Pressable>
              ))}
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <FormInput label="Idade" placeholder="Ex.: 3" value={editForm.age}
                  onChangeText={(v) => setEditForm((p) => ({ ...p, age: v }))}
                  keyboardType="number-pad" editable={!saving} />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput label="Peso (kg)" placeholder="Ex.: 12.5" value={editForm.weight}
                  onChangeText={(v) => setEditForm((p) => ({ ...p, weight: v }))}
                  keyboardType="decimal-pad" editable={!saving} />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <Pressable style={styles.modalPrimary} onPress={handleSaveEdit} disabled={saving}>
                {saving ? <ActivityIndicator color="#7B1E2E" /> : <Text style={styles.modalPrimaryText}>Salvar</Text>}
              </Pressable>
              <Pressable style={styles.modalSecondary} onPress={() => setShowEditModal(false)} disabled={saving}>
                <Text style={styles.modalSecondaryText}>Cancelar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ── Modal de confirmação de exclusão ── */}
      <Modal visible={showDeleteConfirm} transparent animationType="fade" onRequestClose={() => setShowDeleteConfirm(false)}>
        <View style={[styles.modalBackdrop, { justifyContent: "center", padding: 24 }]}>
          <View style={[styles.modalCard, { borderRadius: 24, paddingBottom: 24 }]}>
            <Text style={{ fontSize: 40, textAlign: "center", marginBottom: 12 }}>🗑️</Text>
            <Text style={[styles.modalTitle, { textAlign: "center" }]}>Excluir {pet.name}?</Text>
            <Text style={{ color: "#F5ECD7", opacity: 0.7, textAlign: "center", lineHeight: 20, marginBottom: 8 }}>
              Esta ação remove o pet e não pode ser desfeita.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalSecondary} onPress={() => setShowDeleteConfirm(false)} disabled={deleting}>
                <Text style={styles.modalSecondaryText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.modalDanger} onPress={handleDelete} disabled={deleting}>
                {deleting ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalDangerText}>Excluir</Text>}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
