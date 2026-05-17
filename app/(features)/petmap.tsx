import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function PetMapScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="petmap"
      title="Pet Map funcionando"
      description="Encontre locais pet friendly perto de você."
      onBackPress={() => router.back()}
    />
  );
}
