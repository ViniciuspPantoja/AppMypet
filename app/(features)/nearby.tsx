import petmapService from "@/app/services/petmap.service";
import { nearbyStyles as styles } from "@/app/styles/nearby.styles";
import { PetFriendlyPlace } from "@/types/petmap.types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

interface PlaceWithDistance extends PetFriendlyPlace {
  distanceKm: number;
}

function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1).replace(".", ",")} km`;
}

function openDirections(place: PetFriendlyPlace) {
  const { latitude, longitude, name } = place;
  const label = encodeURIComponent(name);
  const native =
    Platform.OS === "ios"
      ? `maps:0,0?q=${label}@${latitude},${longitude}`
      : `geo:0,0?q=${latitude},${longitude}(${label})`;
  const fallback = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  Linking.canOpenURL(native).then((ok) => Linking.openURL(ok ? native : fallback));
}

export default function NearbyScreen() {
  const router = useRouter();

  const [places, setPlaces] = useState<PlaceWithDistance[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    setLocationDenied(false);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationDenied(true);
        return;
      }

      const [loc, allPlaces] = await Promise.all([
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
        petmapService.listPlaces(),
      ]);

      const { latitude, longitude } = loc.coords;

      const sorted = allPlaces
        .map((p) => ({
          ...p,
          distanceKm: haversineKm(latitude, longitude, p.latitude, p.longitude),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm);

      setPlaces(sorted);
    } catch {
      setLocationDenied(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <View style={styles.headerTexts}>
            <Text style={styles.headerTitle}>Locais Próximos 📍</Text>
            <Text style={styles.headerSubtitle}>
              Locais pet-friendly perto de você
            </Text>
          </View>
        </View>

        {/* ── Loading ── */}
        {loading && (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color="#F5ECD7" />
            <Text style={styles.centerTitle}>Buscando sua localização...</Text>
          </View>
        )}

        {/* ── Sem permissão ── */}
        {!loading && locationDenied && (
          <View style={styles.centerBox}>
            <Text style={styles.centerEmoji}>📍</Text>
            <Text style={styles.centerTitle}>Localização necessária</Text>
            <Text style={styles.centerText}>
              Permita o acesso à localização para ver os locais pet-friendly mais próximos de você.
            </Text>
            <Pressable style={styles.retryButton} onPress={load}>
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </Pressable>
          </View>
        )}

        {/* ── Lista ── */}
        {!loading && !locationDenied && (
          <>
            <View style={styles.countRow}>
              <Text style={styles.countText}>
                {places.length} local(is) encontrado(s)
              </Text>
            </View>

            <View style={styles.list}>
              {places.map((place) => (
                <Pressable
                  key={place.id}
                  style={styles.card}
                  onPress={() => openDirections(place)}
                >
                  <View style={styles.cardIconWrapper}>
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={22}
                      color="#F5ECD7"
                    />
                  </View>

                  <View style={styles.cardContent}>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {place.name}
                    </Text>
                    <Text style={styles.cardAddress} numberOfLines={2}>
                      {place.address}
                    </Text>
                    <View style={styles.cardFooter}>
                      <MaterialCommunityIcons
                        name="navigation-outline"
                        size={12}
                        color="#7B1E2E"
                      />
                      <Text style={styles.cardDistance}>
                        {formatDistance(place.distanceKm)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardArrow}>
                    <Text style={styles.cardArrowText}>›</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
