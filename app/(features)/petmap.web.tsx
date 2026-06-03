import { petmapStyles as styles } from "@/app/styles/petmap.styles";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function PetMapScreenWeb() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 32 }}>
        <Text style={{ fontSize: 64 }}>🗺️</Text>
        <Text style={{ color: "#F5ECD7", fontSize: 22, fontWeight: "900", marginTop: 16, textAlign: "center" }}>
          Pet Map
        </Text>
        <Text style={{ color: "#F5ECD7", opacity: 0.7, fontSize: 14, marginTop: 8, textAlign: "center", lineHeight: 20 }}>
          O mapa interativo está disponível apenas no app Android/iOS.{"\n"}
          No celular você verá os locais pet-friendly com pins no mapa.
        </Text>
        <Pressable
          style={{ marginTop: 32, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 999, backgroundColor: "#F5ECD7" }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#7B1E2E", fontWeight: "900", fontSize: 15 }}>← Voltar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
