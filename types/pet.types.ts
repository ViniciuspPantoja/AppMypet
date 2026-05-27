/**
 * Tipos e interfaces para Pets
 */

export type PetSpecies = "Cachorro" | "Gato" | "Pássaro" | "Peixe" | "Outro";

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  sex?: string;
  age: number;
  weight: number; // em kg
  photoUrl?: string;
  registrationDate: string;
  tutorUid?: string;
  tutorName?: string;
  tutorEmail?: string;
  createdAt?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  birthDate?: string;
  phone?: string;
  createdAt: string;
}
