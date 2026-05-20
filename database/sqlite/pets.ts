import type { Pet } from "@/types/pet.types";
import type { SessionUser } from "@/types/user.types";

import { getDatabase } from "./db";
import { generateId } from "./id";

type PetRow = {
  id: string;
  tutor_uid: string;
  name: string;
  species: string;
  breed: string;
  sex: string | null;
  age: number;
  weight: number;
  photo_url: string | null;
  registration_date: string;
  tutor_name: string | null;
  tutor_email: string | null;
  created_at: string;
};

function mapRow(row: PetRow): Pet {
  return {
    id: row.id,
    name: row.name,
    species: row.species,
    breed: row.breed,
    sex: row.sex ?? undefined,
    age: row.age,
    weight: row.weight,
    photoUrl: row.photo_url ?? undefined,
    registrationDate: row.registration_date,
    tutorUid: row.tutor_uid,
    tutorName: row.tutor_name ?? undefined,
    tutorEmail: row.tutor_email ?? undefined,
    createdAt: row.created_at,
  };
}

export async function listPetsByTutor(tutorUid: string): Promise<Pet[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<PetRow>(
    "SELECT * FROM pets WHERE tutor_uid = ? ORDER BY created_at DESC",
    [tutorUid],
  );
  return rows.map(mapRow);
}

export async function getPetByIdForTutor(
  petId: string,
  tutorUid: string,
): Promise<Pet | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<PetRow>(
    "SELECT * FROM pets WHERE id = ? AND tutor_uid = ?",
    [petId, tutorUid],
  );
  return row ? mapRow(row) : null;
}

export async function createPet(
  user: SessionUser,
  data: Omit<Pet, "id" | "tutorUid" | "tutorName" | "tutorEmail" | "createdAt">,
): Promise<Pet> {
  const db = await getDatabase();
  const id = generateId();
  const createdAt = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO pets (
      id, tutor_uid, name, species, breed, sex, age, weight,
      registration_date, tutor_name, tutor_email, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      user.id,
      data.name,
      data.species,
      data.breed,
      data.sex ?? null,
      data.age,
      data.weight,
      data.registrationDate,
      user.displayName ?? "Usuário",
      user.email,
      createdAt,
    ],
  );

  const pet = await getPetByIdForTutor(id, user.id);
  if (!pet) throw new Error("Falha ao cadastrar pet.");
  return pet;
}
