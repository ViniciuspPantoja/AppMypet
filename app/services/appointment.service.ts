import { db } from "@/database/firebase/firebase";
import { Appointment } from "@/types/appointment.types";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

const collectionRef = collection(db, "appointments");

const mapSnap = (d: any): Appointment => {
  const data = d.data();
  return {
    id: d.id,
    userUid: data.userUid,
    userEmail: data.userEmail,
    petId: data.petId,
    petName: data.petName,
    title: data.title,
    date: data.date,
    time: data.time,
    location: data.location,
    notes: data.notes,
    status: data.status,
    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  } as Appointment;
};

const appointmentService = {
  async list(): Promise<Appointment[]> {
    const q = query(
      collectionRef,
      orderBy("date", "asc"),
      orderBy("time", "asc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map(mapSnap);
  },

  async byDate(date: string): Promise<Appointment[]> {
    const q = query(
      collectionRef,
      where("date", "==", date),
      orderBy("time", "asc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map(mapSnap);
  },

  async create(
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ): Promise<Appointment> {
    const ref = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    const snap = await getDoc(doc(db, "appointments", ref.id));
    return mapSnap(snap as any);
  },

  async update(
    id: string,
    patch: Partial<Appointment>,
  ): Promise<Appointment | null> {
    const ref = doc(db, "appointments", id);
    await updateDoc(ref, {
      ...patch,
      updatedAt: new Date().toISOString(),
    } as any);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return mapSnap(snap as any);
  },

  async remove(id: string): Promise<boolean> {
    const ref = doc(db, "appointments", id);
    await deleteDoc(ref);
    return true;
  },
};

export default appointmentService;
