
import { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { loadingStyles } from "../app/styles/loading.styles";




export default function AppLoadingScreen() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    
<SafeAreaView style={loadingStyles.safeArea}>
  <View style={loadingStyles.container}>
    <Animated.Text
      style={[loadingStyles.logo, { transform: [{ scale }] }]}
    >
      🐾
    </Animated.Text>
    <Text style={loadingStyles.title}>Tudo conectado</Text>
    <Text style={loadingStyles.subtitle}>
      Iniciando aplicação
    </Text>
  </View>
</SafeAreaView>

  );
}

