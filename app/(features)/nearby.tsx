import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function NearbyScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="nearby"
      title="Perto funcionando"
      description="Esta página confirma que a rota de locais próximos abriu corretamente."
      onBackPress={() => router.back()}
    />
  );
}
