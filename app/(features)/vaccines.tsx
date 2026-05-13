import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function VaccinesScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="vaccines"
      title="Vacinas funcionando"
      description="Aqui será a área de controle de vacinação do pet."
      onBackPress={() => router.back()}
    />
  );
}
