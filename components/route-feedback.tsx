import { Pressable, SafeAreaView, Text, View } from "react-native";

import routeFeedbackStyles from "./styles/route-feedback.styles";

interface RouteFeedbackProps {
  title: string;
  description: string;
  routeLabel: string;
  onBackPress: () => void;
}

export function RouteFeedback({
  title,
  description,
  routeLabel,
  onBackPress,
}: RouteFeedbackProps) {
  return (
    <SafeAreaView style={routeFeedbackStyles.safeArea}>
      <View style={routeFeedbackStyles.container}>
        <Text style={routeFeedbackStyles.routeLabel}>{routeLabel}</Text>
        <Text style={routeFeedbackStyles.title}>{title}</Text>
        <Text style={routeFeedbackStyles.description}>{description}</Text>
        <Text style={routeFeedbackStyles.hint}>
          Tela carregada com sucesso.
        </Text>
        <Pressable onPress={onBackPress}>
          <Text style={routeFeedbackStyles.backButton}>Voltar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
