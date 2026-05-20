import type { SessionUser } from "@/types/user.types";

import { getDatabase } from "./db";
import { generateId } from "./id";

export interface VaccineRecord {
  id: string;
  name: string;
  applicationDate: string;
  nextDue: string;
  petId: string;
  petName: string;
  tutorUid: string;
  createdAt?: string;
}

type VaccineRow = {
  id: string;
  tutor_uid: string;
  pet_id: string;
  pet_name: string | null;
  name: string;
  application_date: string;
  next_due: string | null;
  created_at: string;
};

function mapRow(row: VaccineRow): VaccineRecord {
  return {
    id: row.id,
    name: row.name,
    applicationDate: row.application_date,
    nextDue: row.next_due ?? "",
    petId: row.pet_id,
    petName: row.pet_name ?? "",
    tutorUid: row.tutor_uid,
    createdAt: row.created_at,
  };
}

export async function listVaccinesByTutor(
  tutorUid: string,
): Promise<VaccineRecord[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<VaccineRow>(
    "SELECT * FROM vaccines WHERE tutor_uid = ? ORDER BY created_at DESC",
    [tutorUid],
  );
  return rows.map(mapRow);
}

export async function listVaccinesByPet(
  tutorUid: string,
  petId: string,
): Promise<VaccineRecord[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<VaccineRow>(
    "SELECT * FROM vaccines WHERE tutor_uid = ? AND pet_id = ? ORDER BY created_at DESC",
    [tutorUid, petId],
  );
  return rows.map(mapRow);
}

export async function createVaccine(
  user: SessionUser,
  data: {
    name: string;
    applicationDate: string;
    nextDue: string;
    petId: string;
    petName: string;
  },
): Promise<VaccineRecord> {
  const db = await getDatabase();
  const id = generateId();
  const createdAt = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO vaccines (
      id, tutor_uid, pet_id, pet_name, name, application_date, next_due,
      tutor_name, tutor_email, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      user.id,
      data.petId,
      data.petName,
      data.name,
      data.applicationDate,
      data.nextDue,
      user.displayName ?? "Usuário",
      user.email,
      createdAt,
    ],
  );

  const rows = await listVaccinesByTutor(user.id);
  const created = rows.find((v) => v.id === id);
  if (!created) throw new Error("Falha ao registrar vacina.");
  return created;
}

export async function updateVaccine(
  user: SessionUser,
  vaccineId: string,
  data: {
    name: string;
    applicationDate: string;
    nextDue: string;
    petId: string;
    petName: string;
    createdAt: string;
  },
): Promise<void> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `UPDATE vaccines SET
      name = ?, application_date = ?, next_due = ?,
      pet_id = ?, pet_name = ?, created_at = ?
     WHERE id = ? AND tutor_uid = ?`,
    [
      data.name,
      data.applicationDate,
      data.nextDue,
      data.petId,
      data.petName,
      data.createdAt,
      vaccineId,
      user.id,
    ],
  );
  if (result.changes === 0) throw new Error("Vacina não encontrada.");
}

export async function deleteVaccine(
  tutorUid: string,
  vaccineId: string,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM vaccines WHERE id = ? AND tutor_uid = ?", [
    vaccineId,
    tutorUid,
  ]);
}
