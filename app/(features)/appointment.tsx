import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function AppointmentScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="appointment"
      title="Consulta funcionando"
      description="Esta tela serve como feedback de que o caminho está correto."
      onBackPress={() => router.back()}
    />
  );
}
