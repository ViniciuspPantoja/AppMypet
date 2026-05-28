import estoqueService, {
    calculateEstimatedDays,
    getStockStatus,
    StockCategory,
    StockConsumptionMode,
    StockItem,
    StockStatus,
    StockUnit,
} from "@/app/services/estoque.service";
import profileService from "@/app/services/profile.service";
import { estoqueStyles } from "@/app/styles/estoque.styles";
import { FormInput } from "@/components/form-input";
import { Pet, PetSpecies } from "@/types/pet.types";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
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

export default function EstoqueScreen() {
  const router = useRouter();

  const auth = useMemo(() => getAuth(), []);

  const categoryLabelMap: Record<StockCategory, string> = {
    Ração: "Ração",
    Consumível: "Consumível",
    Outro: "Outro",
  };

  const unitLabelMap: Record<StockUnit, string> = {
    kg: "kg",
    g: "g",
    ml: "ml",
    un: "un",
  };

  const statusLabelMap: Record<StockStatus, string> = {
    healthy: "Saudável",
    warning: "Atenção",
    critical: "Crítico",
  };

  const statusColorMap: Record<StockStatus, string> = {
    healthy: "#2D7D5B",
    warning: "#B87816",
    critical: "#B23A48",
  };

  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<PetSpecies[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const speciesLabelMap: Record<PetSpecies, string> = {
    Cachorro: "Caninos",
    Gato: "Felinos",
    Pássaro: "Aves",
    Peixe: "Peixes",
    Outro: "Outro",
  };

  function getSpeciesLabel(sp: PetSpecies) {
    return speciesLabelMap[sp] ?? sp;
  }

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<StockCategory>("Ração");
  const [quantity, setQuantity] = useState("10");
  const [unit, setUnit] = useState<StockUnit>("kg");
  const [consumptionMode, setConsumptionMode] =
    useState<StockConsumptionMode>("portions");
  const [dailyConsumption, setDailyConsumption] = useState("400");
  const [dailyConsumptionUnit, setDailyConsumptionUnit] =
    useState<StockUnit>("g");
  const [portionsPerDay, setPortionsPerDay] = useState("2");
  const [portionSize, setPortionSize] = useState("200");
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies | null>(
    null,
  );

  function getCategoryLabel(cat: StockCategory) {
    return categoryLabelMap[cat] ?? cat;
  }

  function getUnitLabel(currentUnit: StockUnit) {
    return unitLabelMap[currentUnit] ?? currentUnit;
  }

  function getStatusLabel(status?: StockStatus | null) {
    if (!status) return "Sem cálculo";
    return statusLabelMap[status] ?? status;
  }

  function getStatusColor(status?: StockStatus | null) {
    if (!status) return "rgba(255,255,255,0.22)";
    return statusColorMap[status] ?? "rgba(255,255,255,0.22)";
  }

  function formatAmount(value: number, currentUnit?: StockUnit | null) {
    if (!currentUnit) return `${value}`;
    return `${value} ${getUnitLabel(currentUnit)}`;
  }

  function formatDays(days?: number | null) {
    if (days === null || typeof days === "undefined") return null;
    const rounded = Number.isInteger(days) ? days : Number(days.toFixed(1));
    return `${rounded} dia${rounded === 1 ? "" : "s"}`;
  }

  function resolveItemStatus(item: StockItem): StockStatus | undefined {
    return item.status ?? getStockStatus(item.estimatedDays ?? null);
  }

  const draftEstimatedDays = useMemo(() => {
    const totalAmount = Number(quantity);
    const draftDailyConsumptionAmount =
      category === "Ração" && consumptionMode === "portions"
        ? Number(portionsPerDay) * Number(portionSize)
        : Number(dailyConsumption);

    return calculateEstimatedDays({
      quantity: totalAmount,
      quantityUnit: unit,
      dailyConsumption: draftDailyConsumptionAmount,
      dailyConsumptionUnit,
    });
  }, [
    category,
    consumptionMode,
    dailyConsumption,
    dailyConsumptionUnit,
    portionsPerDay,
    portionSize,
    quantity,
    unit,
  ]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const [data, myPets] = await Promise.all([
        estoqueService.getMyStockItems(),
        profileService.getCurrentUserPets(),
      ]);
      setItems(data);
      setPets(myPets);
      if (myPets.length > 0 && !selectedPetId) setSelectedPetId(myPets[0].id);
      const speciesSet = Array.from(
        new Set(myPets.map((p) => p.species)),
      ).filter(Boolean) as PetSpecies[];
      setSpeciesOptions(speciesSet);
    } catch (error) {
      console.warn("Erro ao carregar estoque:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  function clearForm() {
    setName("");
    setCategory("Ração");
    setQuantity("10");
    setUnit("kg");
    setConsumptionMode("portions");
    setDailyConsumption("400");
    setDailyConsumptionUnit("g");
    setPortionsPerDay("2");
    setPortionSize("200");
  }

  function applyCategoryPreset(nextCategory: StockCategory) {
    setCategory(nextCategory);

    if (nextCategory === "Ração") {
      setQuantity("10");
      setUnit("kg");
      setConsumptionMode("portions");
      setDailyConsumption("400");
      setDailyConsumptionUnit("g");
      setPortionsPerDay("2");
      setPortionSize("200");
      return;
    }

    setQuantity("1");
    setUnit("un");
    setConsumptionMode("direct");
    setDailyConsumption("1");
    setDailyConsumptionUnit("un");
    setPortionsPerDay("1");
    setPortionSize("1");
  }

  function openCreateModal() {
    clearForm();
    setSelectedSpecies(
      pets.find((p) => p.id === selectedPetId)?.species ??
        speciesOptions[0] ??
        null,
    );
    setShowAddModal(true);
  }

  async function handleSaveItem() {
    if (!auth.currentUser) return;
    if (!name.trim()) return;

    const totalAmount = Number(quantity);
    const dailyAmount =
      category === "Ração" && consumptionMode === "portions"
        ? Number(portionsPerDay) * Number(portionSize)
        : Number(dailyConsumption);

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) return;
    if (!Number.isFinite(dailyAmount) || dailyAmount <= 0) return;

    try {
      setLoading(true);
      const created = await estoqueService.addStockItem({
        name: name.trim(),
        quantity: totalAmount,
        unit,
        category,
        consumptionMode,
        dailyConsumption:
          category === "Ração" && consumptionMode === "portions"
            ? dailyAmount
            : dailyAmount,
        dailyConsumptionUnit,
        portionsPerDay:
          category === "Ração" && consumptionMode === "portions"
            ? Number(portionsPerDay)
            : undefined,
        portionSize:
          category === "Ração" && consumptionMode === "portions"
            ? Number(portionSize)
            : undefined,
        species: selectedSpecies ?? undefined,
      });
      setItems((cur) => [created, ...cur]);
      setShowAddModal(false);
      clearForm();
    } catch (error) {
      console.warn("Erro ao salvar item:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={estoqueStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={estoqueStyles.header}>
            <Pressable
              onPress={() => router.back()}
              style={estoqueStyles.backButton}
            >
              <Text style={estoqueStyles.backButtonText}>‹</Text>
            </Pressable>
            <Text style={estoqueStyles.headerTitle}>Estoque</Text>
          </View>

          <View style={estoqueStyles.actionSection}>
            <Pressable
              style={estoqueStyles.addButton}
              onPress={openCreateModal}
            >
              <Text style={estoqueStyles.addButtonText}>+ Adicionar Item</Text>
            </Pressable>
          </View>

          <View style={estoqueStyles.section}>
            <Text style={estoqueStyles.sectionTitle}>Itens em estoque</Text>

            {loading ? (
              <ActivityIndicator style={{ marginTop: 20 }} />
            ) : pets.length === 0 ? (
              <View style={estoqueStyles.emptyState}>
                <Text style={estoqueStyles.emptyStateEmoji}>📦</Text>
                <Text style={estoqueStyles.emptyStateText}>
                  Nenhuma sessão disponível
                </Text>
                <Text style={estoqueStyles.emptyStateSubtext}>
                  Cadastre um pet no perfil para organizar o estoque por espécie
                  e acompanhar o consumo.
                </Text>
              </View>
            ) : (
              <>
                <View style={estoqueStyles.petChipsRow}>
                  {pets.map((p) => {
                    const isActive = selectedPetId === p.id;
                    return (
                      <Pressable
                        key={p.id}
                        onPress={() => setSelectedPetId(p.id)}
                        style={[
                          estoqueStyles.petChip,
                          isActive && estoqueStyles.chipActive,
                        ]}
                      >
                        <Text
                          style={[
                            estoqueStyles.petChipText,
                            isActive && estoqueStyles.chipTextActive,
                          ]}
                        >
                          {p.name}
                        </Text>
                        <Text
                          style={[
                            estoqueStyles.petChipMeta,
                            isActive && estoqueStyles.chipTextActive,
                          ]}
                        >
                          {getSpeciesLabel(p.species)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {(() => {
                  const currentPet =
                    pets.find((p) => p.id === selectedPetId) ?? pets[0];
                  const itemsForPet = items.filter(
                    (it) => it.species === currentPet.species,
                  );
                  return (
                    <View style={{ marginBottom: 12 }}>
                      <Text
                        style={[estoqueStyles.sectionTitle, { marginLeft: 0 }]}
                      >
                        Sessão: {currentPet.name} (
                        {getSpeciesLabel(currentPet.species)})
                      </Text>
                      {itemsForPet.length > 0 ? (
                        itemsForPet.map((item) => {
                          const itemStatus = resolveItemStatus(item);
                          const estimatedDaysText = formatDays(
                            item.estimatedDays ?? null,
                          );

                          return (
                            <View key={item.id} style={estoqueStyles.itemCard}>
                              <View style={estoqueStyles.itemHeader}>
                                <View style={{ flex: 1, paddingRight: 12 }}>
                                  <Text style={estoqueStyles.itemName}>
                                    {item.name}
                                  </Text>
                                  <Text style={estoqueStyles.itemMeta}>
                                    {getCategoryLabel(item.category ?? "Outro")}
                                  </Text>
                                </View>

                                <View
                                  style={[
                                    estoqueStyles.statusBadge,
                                    {
                                      backgroundColor:
                                        getStatusColor(itemStatus),
                                    },
                                  ]}
                                >
                                  <Text style={estoqueStyles.statusBadgeText}>
                                    {getStatusLabel(itemStatus)}
                                  </Text>
                                </View>
                              </View>

                              <View style={estoqueStyles.itemDetails}>
                                <Text style={estoqueStyles.itemDetailText}>
                                  Quantidade total:{" "}
                                  {formatAmount(item.quantity, item.unit)}
                                </Text>

                                {item.consumptionMode === "portions" &&
                                typeof item.portionsPerDay === "number" &&
                                typeof item.portionSize === "number" ? (
                                  <Text style={estoqueStyles.itemDetailText}>
                                    Consumo: {item.portionsPerDay} porções por
                                    dia de{" "}
                                    {formatAmount(
                                      item.portionSize,
                                      item.dailyConsumptionUnit,
                                    )}
                                  </Text>
                                ) : item.dailyConsumption ? (
                                  <Text style={estoqueStyles.itemDetailText}>
                                    Consumo diário:{" "}
                                    {formatAmount(
                                      item.dailyConsumption,
                                      item.dailyConsumptionUnit,
                                    )}
                                  </Text>
                                ) : (
                                  <Text
                                    style={estoqueStyles.itemDetailTextMuted}
                                  >
                                    Adicione consumo diário para estimar a
                                    duração.
                                  </Text>
                                )}

                                {estimatedDaysText ? (
                                  <Text
                                    style={estoqueStyles.itemDetailHighlight}
                                  >
                                    Duração estimada: {estimatedDaysText}
                                  </Text>
                                ) : null}
                              </View>
                            </View>
                          );
                        })
                      ) : (
                        <Text
                          style={{ color: "#fff", opacity: 0.7, marginLeft: 8 }}
                        >
                          Nenhum item nesta sessão.
                        </Text>
                      )}
                    </View>
                  );
                })()}
              </>
            )}
          </View>
        </ScrollView>

        <Modal
          visible={showAddModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={estoqueStyles.modalBackdrop}>
            <View style={estoqueStyles.modalCard}>
              <View style={estoqueStyles.modalHeader}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={estoqueStyles.modalTitle}>
                    Adicionar item inteligente
                  </Text>
                  <Text style={estoqueStyles.modalSubtitle}>
                    Registre quantidade, unidade e consumo para estimar a
                    duração.
                  </Text>
                </View>

                <Pressable
                  onPress={() => setShowAddModal(false)}
                  style={estoqueStyles.closeButton}
                  accessibilityLabel="Fechar modal"
                >
                  <Text style={estoqueStyles.closeButtonText}>×</Text>
                </Pressable>
              </View>

              <ScrollView
                style={estoqueStyles.modalBody}
                contentContainerStyle={estoqueStyles.modalBodyContent}
                showsVerticalScrollIndicator={false}
              >
                {speciesOptions.length > 0 && (
                  <View style={estoqueStyles.fieldGroup}>
                    <Text style={estoqueStyles.fieldGroupLabel}>Sessão</Text>
                    <View style={estoqueStyles.chipRow}>
                      {speciesOptions.map((sp) => (
                        <Pressable
                          key={sp}
                          onPress={() => setSelectedSpecies(sp)}
                          style={[
                            estoqueStyles.chip,
                            estoqueStyles.speciesChip,
                            selectedSpecies === sp
                              ? estoqueStyles.chipActive
                              : estoqueStyles.speciesChipInactive,
                          ]}
                        >
                          <Text
                            style={[
                              estoqueStyles.chipText,
                              selectedSpecies === sp
                                ? estoqueStyles.chipTextActive
                                : estoqueStyles.speciesChipTextInactive,
                            ]}
                          >
                            {getSpeciesLabel(sp)}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}

                <FormInput
                  label="Nome"
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />

                <View style={estoqueStyles.fieldGroup}>
                  <Text style={estoqueStyles.fieldGroupLabel}>
                    Tipo de item
                  </Text>
                  <View style={estoqueStyles.chipRow}>
                    {(Object.keys(categoryLabelMap) as StockCategory[]).map(
                      (currentCategory) => (
                        <Pressable
                          key={currentCategory}
                          onPress={() => applyCategoryPreset(currentCategory)}
                          style={[
                            estoqueStyles.chip,
                            category === currentCategory &&
                              estoqueStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              estoqueStyles.chipText,
                              category === currentCategory &&
                                estoqueStyles.chipTextActive,
                            ]}
                          >
                            {getCategoryLabel(currentCategory)}
                          </Text>
                        </Pressable>
                      ),
                    )}
                  </View>
                </View>

                <View style={estoqueStyles.fieldRow}>
                  <View style={estoqueStyles.fieldFlex}>
                    <FormInput
                      label="Quantidade total"
                      value={quantity}
                      keyboardType="numeric"
                      onChangeText={setQuantity}
                    />
                  </View>

                  <View style={estoqueStyles.unitPicker}>
                    <Text style={estoqueStyles.fieldGroupLabel}>Unidade</Text>
                    <View style={estoqueStyles.chipRow}>
                      {(["kg", "g", "ml", "un"] as StockUnit[]).map(
                        (currentUnit) => (
                          <Pressable
                            key={currentUnit}
                            onPress={() => setUnit(currentUnit)}
                            style={[
                              estoqueStyles.chip,
                              estoqueStyles.unitChip,
                              unit === currentUnit && estoqueStyles.chipActive,
                            ]}
                          >
                            <Text
                              style={[
                                estoqueStyles.chipText,
                                unit === currentUnit &&
                                  estoqueStyles.chipTextActive,
                              ]}
                            >
                              {currentUnit}
                            </Text>
                          </Pressable>
                        ),
                      )}
                    </View>
                  </View>
                </View>

                {category === "Ração" ? (
                  <View style={estoqueStyles.fieldGroup}>
                    <Text style={estoqueStyles.fieldGroupLabel}>Consumo</Text>
                    <View style={estoqueStyles.chipRow}>
                      {(["portions", "direct"] as StockConsumptionMode[]).map(
                        (currentMode) => (
                          <Pressable
                            key={currentMode}
                            onPress={() => setConsumptionMode(currentMode)}
                            style={[
                              estoqueStyles.chip,
                              consumptionMode === currentMode &&
                                estoqueStyles.chipActive,
                            ]}
                          >
                            <Text
                              style={[
                                estoqueStyles.chipText,
                                consumptionMode === currentMode &&
                                  estoqueStyles.chipTextActive,
                              ]}
                            >
                              {currentMode === "portions"
                                ? "Porções/dia"
                                : "Valor direto"}
                            </Text>
                          </Pressable>
                        ),
                      )}
                    </View>

                    {consumptionMode === "portions" ? (
                      <>
                        <View style={estoqueStyles.fieldRow}>
                          <View style={estoqueStyles.fieldFlex}>
                            <FormInput
                              label="Porções por dia"
                              value={portionsPerDay}
                              keyboardType="numeric"
                              onChangeText={setPortionsPerDay}
                            />
                          </View>
                          <View style={estoqueStyles.fieldFlex}>
                            <FormInput
                              label="Tamanho da porção"
                              value={portionSize}
                              keyboardType="numeric"
                              onChangeText={setPortionSize}
                            />
                          </View>
                        </View>

                        <View>
                          <Text style={estoqueStyles.fieldGroupLabel}>
                            Unidade da porção
                          </Text>
                          <View style={estoqueStyles.chipRow}>
                            {(["g", "kg", "ml", "un"] as StockUnit[]).map(
                              (currentUnit) => (
                                <Pressable
                                  key={currentUnit}
                                  onPress={() =>
                                    setDailyConsumptionUnit(currentUnit)
                                  }
                                  style={[
                                    estoqueStyles.chip,
                                    estoqueStyles.unitChip,
                                    dailyConsumptionUnit === currentUnit &&
                                      estoqueStyles.chipActive,
                                  ]}
                                >
                                  <Text
                                    style={[
                                      estoqueStyles.chipText,
                                      dailyConsumptionUnit === currentUnit &&
                                        estoqueStyles.chipTextActive,
                                    ]}
                                  >
                                    {currentUnit}
                                  </Text>
                                </Pressable>
                              ),
                            )}
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <FormInput
                          label="Consumo diário"
                          value={dailyConsumption}
                          keyboardType="numeric"
                          onChangeText={setDailyConsumption}
                        />
                        <View>
                          <Text style={estoqueStyles.fieldGroupLabel}>
                            Unidade do consumo diário
                          </Text>
                          <View style={estoqueStyles.chipRow}>
                            {(["kg", "g", "ml", "un"] as StockUnit[]).map(
                              (currentUnit) => (
                                <Pressable
                                  key={currentUnit}
                                  onPress={() =>
                                    setDailyConsumptionUnit(currentUnit)
                                  }
                                  style={[
                                    estoqueStyles.chip,
                                    estoqueStyles.unitChip,
                                    dailyConsumptionUnit === currentUnit &&
                                      estoqueStyles.chipActive,
                                  ]}
                                >
                                  <Text
                                    style={[
                                      estoqueStyles.chipText,
                                      dailyConsumptionUnit === currentUnit &&
                                        estoqueStyles.chipTextActive,
                                    ]}
                                  >
                                    {currentUnit}
                                  </Text>
                                </Pressable>
                              ),
                            )}
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                ) : (
                  <View style={estoqueStyles.fieldGroup}>
                    <Text style={estoqueStyles.fieldGroupLabel}>
                      Consumo diário
                    </Text>
                    <FormInput
                      label="Quantidade usada por dia"
                      value={dailyConsumption}
                      keyboardType="numeric"
                      onChangeText={setDailyConsumption}
                    />
                    <View>
                      <Text style={estoqueStyles.fieldGroupLabel}>
                        Unidade do consumo diário
                      </Text>
                      <View style={estoqueStyles.chipRow}>
                        {(["kg", "g", "ml", "un"] as StockUnit[]).map(
                          (currentUnit) => (
                            <Pressable
                              key={currentUnit}
                              onPress={() =>
                                setDailyConsumptionUnit(currentUnit)
                              }
                              style={[
                                estoqueStyles.chip,
                                estoqueStyles.unitChip,
                                dailyConsumptionUnit === currentUnit &&
                                  estoqueStyles.chipActive,
                              ]}
                            >
                              <Text
                                style={[
                                  estoqueStyles.chipText,
                                  dailyConsumptionUnit === currentUnit &&
                                    estoqueStyles.chipTextActive,
                                ]}
                              >
                                {currentUnit}
                              </Text>
                            </Pressable>
                          ),
                        )}
                      </View>
                    </View>
                  </View>
                )}

                <View style={estoqueStyles.draftSummary}>
                  <Text style={estoqueStyles.draftSummaryTitle}>
                    Prévia inteligente
                  </Text>
                  <Text style={estoqueStyles.draftSummaryText}>
                    {draftEstimatedDays
                      ? `Duração estimada: ${formatDays(draftEstimatedDays)}`
                      : "Preencha quantidade e consumo para ver a estimativa."}
                  </Text>
                </View>
              </ScrollView>

              <View style={estoqueStyles.modalButtons}>
                <Pressable
                  style={estoqueStyles.secondaryButton}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={estoqueStyles.secondaryButtonText}>Fechar</Text>
                </Pressable>

                <Pressable
                  style={estoqueStyles.primaryButton}
                  onPress={handleSaveItem}
                >
                  <Text style={estoqueStyles.primaryButtonText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
