import { getFirebaseApp, getFirestoreDb } from "@/database/firebase/firebase";
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

import { PetSpecies } from "@/types/pet.types";

export type StockCategory = "Ração" | "Consumível" | "Outro";
export type StockUnit = "kg" | "g" | "ml" | "un";
export type StockConsumptionMode = "direct" | "portions";
export type StockStatus = "healthy" | "warning" | "critical";

export interface StockItem {
  id?: string;
  name: string;
  quantity: number;
  unit?: StockUnit;
  category?: StockCategory;
  consumptionMode?: StockConsumptionMode;
  dailyConsumption?: number;
  dailyConsumptionUnit?: StockUnit;
  portionsPerDay?: number;
  portionSize?: number;
  estimatedDays?: number;
  status?: StockStatus;
  lowStockThresholdDays?: number;
  species?: PetSpecies;
  createdAt?: string;
}

const LOW_STOCK_THRESHOLD_DAYS = 7;

function convertToBaseAmount(
  amount: number,
  unit?: StockUnit,
): {
  amount: number;
  unit?: StockUnit;
} {
  if (!unit) return { amount };

  if (unit === "kg") {
    return { amount: amount * 1000, unit: "g" };
  }

  return { amount, unit };
}

export function calculateEstimatedDays(input: {
  quantity: number;
  quantityUnit?: StockUnit;
  dailyConsumption?: number;
  dailyConsumptionUnit?: StockUnit;
}): number | null {
  if (!input.quantity || input.quantity <= 0) return null;
  if (!input.dailyConsumption || input.dailyConsumption <= 0) return null;

  const normalizedQuantity = convertToBaseAmount(
    input.quantity,
    input.quantityUnit,
  );
  const normalizedDailyConsumption = convertToBaseAmount(
    input.dailyConsumption,
    input.dailyConsumptionUnit,
  );

  if (
    normalizedQuantity.unit &&
    normalizedDailyConsumption.unit &&
    normalizedQuantity.unit !== normalizedDailyConsumption.unit
  ) {
    return null;
  }

  const estimatedDays =
    normalizedQuantity.amount / normalizedDailyConsumption.amount;

  if (!Number.isFinite(estimatedDays) || estimatedDays <= 0) return null;

  return Number(estimatedDays.toFixed(1));
}

export function getStockStatus(
  estimatedDays: number | null,
): StockStatus | undefined {
  if (estimatedDays === null) return undefined;
  if (estimatedDays <= 3) return "critical";
  if (estimatedDays <= LOW_STOCK_THRESHOLD_DAYS) return "warning";
  return "healthy";
}

function getAuthInstance() {
  return getAuth(getFirebaseApp());
}

function getDbInstance() {
  return getFirestoreDb();
}

async function getMyStockItems(): Promise<StockItem[]> {
  const auth = getAuthInstance();
  const db = getDbInstance();

  if (!auth.currentUser) return [];

  const q = query(
    collection(db, "stock"),
    where("tutorUid", "==", auth.currentUser.uid),
  );
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

async function addStockItem(input: {
  name: string;
  quantity: number;
  unit?: StockUnit;
  category?: StockCategory;
  consumptionMode?: StockConsumptionMode;
  dailyConsumption?: number;
  dailyConsumptionUnit?: StockUnit;
  portionsPerDay?: number;
  portionSize?: number;
  species?: PetSpecies;
}): Promise<StockItem> {
  const auth = getAuthInstance();
  const db = getDbInstance();

  if (!auth.currentUser) throw new Error("Usuário não autenticado");

  const payload = {
    name: input.name,
    quantity: input.quantity,
    unit: input.unit || null,
    category: input.category || null,
    consumptionMode: input.consumptionMode || null,
    dailyConsumption: input.dailyConsumption || null,
    dailyConsumptionUnit: input.dailyConsumptionUnit || null,
    portionsPerDay: input.portionsPerDay || null,
    portionSize: input.portionSize || null,
    species: input.species || null,
    tutorUid: auth.currentUser.uid,
    tutorName: auth.currentUser.displayName || "Usuário",
    createdAt: new Date().toISOString(),
    lowStockThresholdDays: LOW_STOCK_THRESHOLD_DAYS,
  } as any;

  const estimatedDays = calculateEstimatedDays({
    quantity: input.quantity,
    quantityUnit: input.unit,
    dailyConsumption:
      input.consumptionMode === "portions"
        ? (input.portionsPerDay || 0) * (input.portionSize || 0)
        : input.dailyConsumption,
    dailyConsumptionUnit: input.dailyConsumptionUnit,
  });

  payload.estimatedDays = estimatedDays;
  payload.status = getStockStatus(estimatedDays) || null;

  const ref = await addDoc(collection(db, "stock"), payload);
  return { id: ref.id, ...payload } as StockItem;
}

async function deleteStockItem(id: string): Promise<void> {
  const db = getDbInstance();
  await deleteDoc(doc(db, "stock", id));
}

async function updateStockItem(
  id: string,
  input: Partial<StockItem>,
): Promise<void> {
  const db = getDbInstance();
  await updateDoc(doc(db, "stock", id), input as any);
}

const estoqueService = {
  getMyStockItems,
  addStockItem,
  deleteStockItem,
  updateStockItem,
};

export default estoqueService;
