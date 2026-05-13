/**
 * Tipos e interfaces para Pets
 */

export interface Pet {
  id: string;
  name: string;
  species: string; // cachorro, gato, etc
  breed: string;
  age: number;
  weight: number; // em kg
  photoUrl?: string;
  registrationDate: string;
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
