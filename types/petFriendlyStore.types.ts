/**
 * Loja ou estabelecimento cadastrado por utilizadores da app para aparecer no Pet Map.
 * Só entram pins vindos desta coleção no Firestore (`petFriendlyStores`).
 */

export interface PetFriendlyStore {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  createdByUid: string;
  createdAt: string;
}

/** Payload ao criar documento (sem id). */
export type PetFriendlyStoreInput = Omit<PetFriendlyStore, "id">;
