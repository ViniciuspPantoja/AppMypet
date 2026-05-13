import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function PartnersScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="partners"
      title="Parceiros funcionando"
      description="Clínicas, shops e outros parceiros serão exibidos aqui."
      onBackPress={() => router.back()}
    />
  );
}
