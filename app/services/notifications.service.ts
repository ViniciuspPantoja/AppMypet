import { getFirestoreDb } from "@/database/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export type NotificationAlertSeverity = "critical" | "warning" | "info";

export interface NotificationAlert {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  severity: NotificationAlertSeverity;
}

interface VaccineDoc {
  id: string;
  name: string;
  petName: string;
  nextDue: string;
}

interface AppointmentDoc {
  id: string;
  title: string;
  petName: string;
  date: string;
  time: string;
  status?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function parseDate(value: string): Date | null {
  if (!value) return null;

  const br = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (br) {
    const [, dd, mm, yyyy] = br;
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const isoDateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDateOnly) {
    const [yyyy, mm, dd] = value.split("-").map(Number);
    const date = new Date(yyyy, mm - 1, dd);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseAppointmentDate(date: string, time: string): Date | null {
  const baseDate = parseDate(date);
  if (!baseDate) return null;

  const [hours, minutes] = (time || "00:00")
    .split(":")
    .map((part) => Number(part));

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return baseDate;
  }

  const withTime = new Date(baseDate);
  withTime.setHours(hours, minutes, 0, 0);
  return withTime;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDatePtBr(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}

function buildVaccineAlerts(
  vaccines: VaccineDoc[],
  today: Date,
): NotificationAlert[] {
  const alerts: NotificationAlert[] = [];

  vaccines.forEach((vaccine) => {
    const dueDate = parseDate(vaccine.nextDue);
    if (!dueDate) return;

    const dayDiff = Math.floor((dueDate.getTime() - today.getTime()) / DAY_MS);

    if (dayDiff < 0) {
      alerts.push({
        id: `vac-overdue-${vaccine.id}`,
        dueDate,
        severity: "critical",
        title: `Vacina vencida: ${vaccine.name}`,
        description: `${vaccine.petName || "Pet"} está com a vacina vencida desde ${formatDatePtBr(dueDate)}.`,
      });
      return;
    }

    if (dayDiff <= 30) {
      alerts.push({
        id: `vac-soon-${vaccine.id}`,
        dueDate,
        severity: dayDiff <= 7 ? "warning" : "info",
        title: `Vacina próxima do vencimento: ${vaccine.name}`,
        description: `${vaccine.petName || "Pet"} vence em ${dayDiff} dia(s), em ${formatDatePtBr(dueDate)}.`,
      });
    }
  });

  return alerts;
}

function buildAppointmentAlerts(
  appointments: AppointmentDoc[],
  today: Date,
): NotificationAlert[] {
  const alerts: NotificationAlert[] = [];

  appointments.forEach((appointment) => {
    if (appointment.status === "done" || appointment.status === "canceled") {
      return;
    }

    const appointmentDate = parseAppointmentDate(
      appointment.date,
      appointment.time,
    );
    if (!appointmentDate) return;

    const dayDiff = Math.floor(
      (appointmentDate.getTime() - today.getTime()) / DAY_MS,
    );

    if (dayDiff < 0) {
      alerts.push({
        id: `app-overdue-${appointment.id}`,
        dueDate: appointmentDate,
        severity: "critical",
        title: `Consulta pendente: ${appointment.title}`,
        description: `${appointment.petName || "Pet"} tinha consulta em ${formatDatePtBr(appointmentDate)} às ${appointment.time || "--:--"}.`,
      });
      return;
    }

    if (dayDiff <= 7) {
      alerts.push({
        id: `app-upcoming-${appointment.id}`,
        dueDate: appointmentDate,
        severity: dayDiff === 0 ? "warning" : "info",
        title: dayDiff === 0 ? "Consulta hoje" : "Consulta próxima",
        description: `${appointment.title} para ${appointment.petName || "Pet"} em ${formatDatePtBr(appointmentDate)} às ${appointment.time || "--:--"}.`,
      });
    }
  });

  return alerts;
}

function sortAlerts(alerts: NotificationAlert[]): NotificationAlert[] {
  const severityWeight: Record<NotificationAlertSeverity, number> = {
    critical: 0,
    warning: 1,
    info: 2,
  };

  return [...alerts].sort((a, b) => {
    const bySeverity = severityWeight[a.severity] - severityWeight[b.severity];
    if (bySeverity !== 0) return bySeverity;
    return a.dueDate.getTime() - b.dueDate.getTime();
  });
}

async function listPendingAlerts(
  userUid: string,
): Promise<NotificationAlert[]> {
  const db = getFirestoreDb();

  const [vaccinesSnapshot, appointmentsSnapshot] = await Promise.all([
    getDocs(
      query(collection(db, "vaccines"), where("tutorUid", "==", userUid)),
    ),
    getDocs(
      query(collection(db, "appointments"), where("userUid", "==", userUid)),
    ),
  ]);

  const vaccines = vaccinesSnapshot.docs.map((docItem) => ({
    ...(docItem.data() as Omit<VaccineDoc, "id">),
    id: docItem.id,
  }));

  const appointments = appointmentsSnapshot.docs.map((docItem) => ({
    ...(docItem.data() as Omit<AppointmentDoc, "id">),
    id: docItem.id,
  }));

  const today = startOfToday();
  const alerts = [
    ...buildVaccineAlerts(vaccines, today),
    ...buildAppointmentAlerts(appointments, today),
  ];

  return sortAlerts(alerts);
}

const notificationsService = {
  listPendingAlerts,
};

export default notificationsService;
