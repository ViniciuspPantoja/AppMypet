import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function MyPetScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 48, marginBottom: 20 }}>🐾</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Meu Pet funcionando
        </Text>
        <Text style={{ fontSize: 16, color: "#666", marginBottom: 30 }}>
          Perfil do seu animal
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#007AFF",
            paddingHorizontal: 30,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Voltar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
