import type { PetFriendlyStore, PetFriendlyStoreInput } from "@/types/petFriendlyStore.types";

import { getDatabase } from "./db";
import { generateId } from "./id";

type StoreRow = {
  id: string;
  name: string;
  address: string | null;
  latitude: number;
  longitude: number;
  created_by_uid: string;
  created_at: string;
};

function mapRow(row: StoreRow): PetFriendlyStore {
  return {
    id: row.id,
    name: row.name,
    address: row.address ?? undefined,
    latitude: row.latitude,
    longitude: row.longitude,
    createdByUid: row.created_by_uid,
    createdAt: row.created_at,
  };
}

export async function listPetFriendlyStores(): Promise<PetFriendlyStore[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<StoreRow>(
    "SELECT * FROM pet_friendly_stores ORDER BY created_at DESC",
  );
  return rows.map(mapRow);
}

export async function createPetFriendlyStore(
  input: PetFriendlyStoreInput,
): Promise<PetFriendlyStore> {
  const db = await getDatabase();
  const id = generateId();

  await db.runAsync(
    `INSERT INTO pet_friendly_stores (
      id, name, address, latitude, longitude, created_by_uid, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.name,
      input.address ?? null,
      input.latitude,
      input.longitude,
      input.createdByUid,
      input.createdAt,
    ],
  );

  const rows = await listPetFriendlyStores();
  const created = rows.find((s) => s.id === id);
  if (!created) throw new Error("Falha ao cadastrar loja.");
  return created;
}
