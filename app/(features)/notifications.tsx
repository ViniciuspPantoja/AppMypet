import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="notifications"
      title="Notificações funcionando"
      description="A tela abriu corretamente e pode receber os avisos do app."
      onBackPress={() => router.back()}
    />
  );
}
