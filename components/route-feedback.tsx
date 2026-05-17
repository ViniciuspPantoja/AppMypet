import { Pressable, SafeAreaView, Text, View } from "react-native";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 18, color: "#666", marginBottom: 12 }}>
          {routeLabel}
        </Text>
        <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 12 }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#444",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          {description}
        </Text>
        <Text style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>
          Tela carregada com sucesso.
        </Text>
        <Pressable onPress={onBackPress}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Voltar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
