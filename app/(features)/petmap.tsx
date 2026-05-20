import { petmapStyles as styles } from "@/app/styles/petmap.styles";
import { listPetFriendlyStores } from "@/database/sqlite/stores";
import type { PetFriendlyStore } from "@/types/petFriendlyStore.types";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

const DEFAULT_REGION: Region = {
  latitude: -23.55052,
  longitude: -46.633308,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

function openGoogleMapsDirections(latitude: number, longitude: number) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  void Linking.openURL(url);
}

export default function PetMapScreen() {
  const router = useRouter();

  const [stores, setStores] = useState<PetFriendlyStore[]>([]);
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [mapReady, setMapReady] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  const centerOnUser = useCallback(async () => {
    setLocationError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permissão de localização negada.");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = pos.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.04,
      });
    } catch {
      setLocationError("Não foi possível obter a sua posição.");
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      setLoadingList(false);
      return;
    }
    void centerOnUser();
  }, [centerOnUser]);

  const loadStores = useCallback(async () => {
    try {
      const list = await listPetFriendlyStores();
      setStores(
        list.filter(
          (s) =>
            Number.isFinite(s.latitude) &&
            Number.isFinite(s.longitude) &&
            Math.abs(s.latitude) <= 90 &&
            Math.abs(s.longitude) <= 180,
        ),
      );
    } catch {
      setStores([]);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === "web") return;
      setLoadingList(true);
      void loadStores();
    }, [loadStores]),
  );

  function handleMarkerPress(store: PetFriendlyStore) {
    Alert.alert(
      store.name,
      store.address
        ? `${store.address}\n\nAbrir rota no Google Maps?`
        : "Abrir rota no Google Maps?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Google Maps",
          onPress: () =>
            openGoogleMapsDirections(store.latitude, store.longitude),
        },
      ],
    );
  }

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={styles.webFallback}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.topButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.webTitle}>Mapa no telemóvel</Text>
        <Text style={styles.webText}>
          O mapa com localização e lojas cadastradas na app está disponível nas
          versões iOS e Android (Expo Go ou build nativo).
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <MapView
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton={false}
        onMapReady={() => setMapReady(true)}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
            description={store.address}
            onPress={() => handleMarkerPress(store)}
          />
        ))}
      </MapView>

      <View style={styles.topBar} pointerEvents="box-none">
        <Pressable style={styles.topButton} onPress={() => router.back()}>
          <Text style={styles.topButtonText}>← Voltar</Text>
        </Pressable>
        <Pressable
          style={[styles.topButton, styles.topButtonPrimary]}
          onPress={() => router.push("/register-pet-store")}
        >
          <Text style={[styles.topButtonText, styles.topButtonTextLight]}>
            + Loja
          </Text>
        </Pressable>
      </View>

      {(!mapReady || loadingList) && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
          pointerEvents="none"
        >
          <ActivityIndicator size="large" />
        </View>
      )}

      <View style={styles.hintBox} pointerEvents="none">
        <Text style={styles.hintTitle}>Só lojas da comunidade</Text>
        <Text style={styles.hintText}>
          Pins = lojas registadas por utilizadores nesta app. Toque num pin para
          abrir o Google Maps com destino à loja.
          {locationError ? ` ${locationError}` : ""}
        </Text>
      </View>
    </SafeAreaView>
  );
}
