export type AppointmentStatus = "scheduled" | "done" | "canceled";

export interface Appointment {
  id: string;
  userUid: string;
  userEmail: string;
  petId?: string;
  petName: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  location: string;
  notes: string;
  status: AppointmentStatus;
  createdAt?: string;
  updatedAt?: string;
}
