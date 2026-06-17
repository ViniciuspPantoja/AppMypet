import { db } from "@/database/firebase/firebase";
import { PetFriendlyPlace } from "@/types/petmap.types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const collectionRef = collection(db, "petFriendlyPlaces");

async function listPlaces(): Promise<PetFriendlyPlace[]> {
  const snap = await getDocs(collectionRef);
  return snap.docs.map((d) => ({
    ...(d.data() as Omit<PetFriendlyPlace, "id">),
    id: d.id,
  }));
}

async function addPlace(
  data: Omit<PetFriendlyPlace, "id" | "createdAt">,
): Promise<PetFriendlyPlace> {
  const ref = await addDoc(collectionRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return { ...data, id: ref.id, createdAt: new Date().toISOString() };
}

interface GeocodeResult {
  latitude: number;
  longitude: number;
  displayName: string;
}

async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const encoded = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1&countrycodes=br`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "MyPetZone/1.0 (contato@mypetzone.com.br)",
    },
  });

  if (!response.ok) return null;

  const results: any[] = await response.json();
  if (!results.length) return null;

  const first = results[0];
  return {
    latitude: parseFloat(first.lat),
    longitude: parseFloat(first.lon),
    displayName: first.display_name,
  };
}

async function isCurrentUserCompany(uid: string): Promise<boolean> {
  const snap = await getDoc(doc(db, "companies", uid));
  return snap.exists();
}

const petmapService = {
  listPlaces,
  addPlace,
  geocodeAddress,
  isCurrentUserCompany,
};

export default petmapService;
