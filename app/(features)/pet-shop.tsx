import { RouteFeedback } from "@/components/route-feedback";
import { useRouter } from "expo-router";

export default function PetShopScreen() {
  const router = useRouter();

  return (
    <RouteFeedback
      routeLabel="pet-shop"
      title="Pet Shop funcionando"
      description="Aqui depois entram produtos e categorias do pet shop."
      onBackPress={() => router.back()}
    />
  );
}
