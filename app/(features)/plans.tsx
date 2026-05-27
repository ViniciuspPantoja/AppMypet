import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { plansStyles } from "../styles/plans.styles";

const plans = [
  {
    name: "Premium",
    badge: "Essencial",
    description: "Plano de entrada com benefícios essenciais para o usuário.",
    items: ["Perfil básico", "Acesso às áreas principais", "Suporte padrão"],
    price: "R$ 19,90/mês",
  },
  {
    name: "Gold",
    badge: "Destaque",
    description:
      "Plano intermediário com mais recursos e destaque na plataforma.",
    items: ["Mais visibilidade", "Recursos ampliados", "Suporte prioritário"],
    price: "R$ 39,90/mês",
  },
  {
    name: "Star",
    badge: "Completo",
    description: "Plano completo para quem quer a experiência mais avançada.",
    items: ["Máxima visibilidade", "Todos os recursos", "Atendimento premium"],
    price: "R$ 59,90/mês",
  },
];

export default function PlansScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={plansStyles.safeArea}>
      <ScrollView contentContainerStyle={plansStyles.scrollContent}>
        <View style={plansStyles.header}>
          <Pressable
            style={plansStyles.backButton}
            onPress={() => router.back()}
          >
            <Text style={plansStyles.backButtonText}>‹</Text>
          </Pressable>

          <Text style={plansStyles.eyebrow}>Planos</Text>
          <Text style={plansStyles.title}>Escolha um plano para o usuário</Text>
          <Text style={plansStyles.subtitle}>
            Estrutura inicial para comparar Premium, Gold e Star antes da
            estilização final.
          </Text>
        </View>

        <View style={plansStyles.plansGrid}>
          {plans.map((plan, index) => (
            <View
              key={plan.name}
              style={[
                plansStyles.planCard,
                index === 1 && plansStyles.planCardHighlight,
              ]}
            >
              <View style={plansStyles.planHeader}>
                <Text style={plansStyles.planName}>{plan.name}</Text>
                <View style={plansStyles.planBadge}>
                  <Text style={plansStyles.planBadgeText}>{plan.badge}</Text>
                </View>
              </View>

              <Text style={plansStyles.planDescription}>
                {plan.description}
              </Text>

              <View style={plansStyles.planDivider} />

              {plan.items.map((item) => (
                <View key={item} style={plansStyles.planItem}>
                  <View style={plansStyles.planItemDot} />
                  <Text style={plansStyles.planItemText}>{item}</Text>
                </View>
              ))}

              <View style={plansStyles.planFooter}>
                <View>
                  <Text style={plansStyles.planPriceLabel}>Preço</Text>
                  <Text style={plansStyles.planPrice}>{plan.price}</Text>
                </View>

                <Pressable style={plansStyles.planButton}>
                  <Text style={plansStyles.planButtonText}>Selecionar</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
