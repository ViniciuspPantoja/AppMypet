import { FormInput } from "@/components/form-input";
import { getFirebaseApp } from "@/database/firebase/firebase";
import petmapService from "@/app/services/petmap.service";
import { petmapStyles as styles } from "@/app/styles/petmap.styles";
import { PetFriendlyPlace } from "@/types/petmap.types";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { Component, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

class MapErrorBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const BRAZIL_REGION: Region = {
  latitude: -14.235,
  longitude: -51.925,
  latitudeDelta: 30,
  longitudeDelta: 30,
};

export default function PetMapScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const mapRef = useRef<MapView>(null);

  const [places, setPlaces] = useState<PetFriendlyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [mapError, setMapError] = useState(false);

  // modal de detalhes do pin
  const [selectedPlace, setSelectedPlace] = useState<PetFriendlyPlace | null>(null);

  // modal de adicionar local
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", address: "" });
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState<{
    latitude: number;
    longitude: number;
    displayName: string;
  } | null>(null);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // feedback modal
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const uid = auth.currentUser?.uid;
      const [fetchedPlaces, company] = await Promise.all([
        petmapService.listPlaces(),
        uid ? petmapService.isCurrentUserCompany(uid) : Promise.resolve(false),
      ]);
      setPlaces(fetchedPlaces);
      setIsCompany(company);
    } catch {
      showFeedback("error", "Não foi possível carregar os locais.");
    } finally {
      setLoading(false);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    void loadData();
    void centerOnUser();
  }, [loadData]);

  async function centerOnUser() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion(
        {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
        800,
      );
    } catch {
      // sem localização, mantém Brasil
    }
  }

  function showFeedback(type: "success" | "error", message: string) {
    setFeedbackType(type);
    setFeedbackMessage(message);
    setFeedbackVisible(true);
  }

  function openDirections(place: PetFriendlyPlace) {
    const { latitude, longitude, name } = place;
    const label = encodeURIComponent(name);
    const url =
      Platform.OS === "ios"
        ? `maps:0,0?q=${label}@${latitude},${longitude}`
        : `geo:0,0?q=${latitude},${longitude}(${label})`;
    const fallback = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.canOpenURL(url).then((supported) => {
      Linking.openURL(supported ? url : fallback);
    });
  }

  function resetAddForm() {
    setAddForm({ name: "", address: "" });
    setGeocodeResult(null);
    setGeocodeError(null);
  }

  async function handleGeocode() {
    if (!addForm.address.trim()) {
      setGeocodeError("Informe o endereço antes de buscar.");
      return;
    }
    setGeocoding(true);
    setGeocodeResult(null);
    setGeocodeError(null);
    try {
      const result = await petmapService.geocodeAddress(addForm.address.trim());
      if (!result) {
        setGeocodeError("Endereço não encontrado. Tente ser mais específico.");
      } else {
        setGeocodeResult(result);
      }
    } catch {
      setGeocodeError("Erro ao buscar o endereço. Tente novamente.");
    } finally {
      setGeocoding(false);
    }
  }

  async function handleSavePlace() {
    if (!auth.currentUser) {
      showFeedback("error", "Você precisa estar logado como empresa.");
      return;
    }
    if (!addForm.name.trim()) {
      showFeedback("error", "Informe o nome do local.");
      return;
    }
    if (!geocodeResult) {
      showFeedback("error", "Busque e confirme o endereço antes de salvar.");
      return;
    }

    setSaving(true);
    try {
      await petmapService.addPlace({
        name: addForm.name.trim(),
        address: addForm.address.trim(),
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
        companyUid: auth.currentUser.uid,
        companyName: auth.currentUser.displayName || "Empresa",
      });
      setShowAddModal(false);
      resetAddForm();
      showFeedback("success", "Local cadastrado com sucesso!");
      void loadData();
    } catch {
      showFeedback("error", "Erro ao salvar o local. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <MapErrorBoundary onError={() => setMapError(true)}>
        {mapError ? (
          <View style={[styles.map, styles.overlay]}>
            <Text style={{ fontSize: 40 }}>🗺️</Text>
            <Text style={[styles.overlayText, { textAlign: "center", paddingHorizontal: 32 }]}>
              O mapa não pôde ser carregado.{"\n"}É necessária uma Google Maps API Key para Android.
            </Text>
          </View>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={BRAZIL_REGION}
            showsUserLocation
            showsMyLocationButton={false}
            onMapReady={() => setMapError(false)}
          >
            {places.map((place) => (
              <Marker
                key={place.id}
                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                title={place.name}
                pinColor="#7B1E2E"
                onPress={() => setSelectedPlace(place)}
              />
            ))}
          </MapView>
        )}
      </MapErrorBoundary>

      {/* ── Header flutuante ── */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>Pet Map 🐾</Text>
          <Text style={styles.headerSubtitle}>
            {loading ? "Carregando..." : `${places.length} local(is) encontrado(s)`}
          </Text>
        </View>
      </View>

      {/* ── Loading overlay ── */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#F5ECD7" />
          <Text style={styles.overlayText}>Carregando locais...</Text>
        </View>
      )}

      {/* ── FAB para empresas ── */}
      {isCompany && !loading && (
        <Pressable
          style={styles.fab}
          onPress={() => {
            resetAddForm();
            setShowAddModal(true);
          }}
        >
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      )}

      {/* ── Modal de detalhes do pin ── */}
      <Modal
        visible={!!selectedPlace}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedPlace(null)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setSelectedPlace(null)}
          />
          {selectedPlace && (
            <View style={styles.detailCard}>
              <View style={styles.detailHandle} />
              <Text style={styles.detailEmoji}>🐾</Text>
              <Text style={styles.detailName}>{selectedPlace.name}</Text>
              <Text style={styles.detailAddress}>{selectedPlace.address}</Text>

              <View style={styles.detailButtonRow}>
                <Pressable
                  style={styles.directionsButton}
                  onPress={() => openDirections(selectedPlace)}
                >
                  <Text style={styles.directionsButtonText}>🗺 Como chegar</Text>
                </Pressable>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setSelectedPlace(null)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* ── Modal de adicionar local ── */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowAddModal(false);
          resetAddForm();
        }}
      >
        <View style={styles.addModalBackdrop}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              setShowAddModal(false);
              resetAddForm();
            }}
          />
          <View style={styles.addCard}>
            <View style={styles.addHandle} />
            <Text style={styles.addTitle}>Cadastrar local pet-friendly</Text>
            <Text style={styles.addSubtitle}>
              Preencha o nome e endereço. Depois clique em "Buscar localização" para confirmar as coordenadas no mapa.
            </Text>

            <FormInput
              label="Nome do local"
              placeholder="Ex.: Parque do Ibirapuera"
              value={addForm.name}
              onChangeText={(v) => setAddForm((p) => ({ ...p, name: v }))}
              editable={!saving}
            />

            <FormInput
              label="Endereço"
              placeholder="Ex.: Av. Pedro Álvares Cabral, São Paulo - SP"
              value={addForm.address}
              onChangeText={(v) => {
                setAddForm((p) => ({ ...p, address: v }));
                setGeocodeResult(null);
                setGeocodeError(null);
              }}
              editable={!saving && !geocoding}
            />

            <Pressable
              style={styles.searchButton}
              onPress={handleGeocode}
              disabled={geocoding || saving}
            >
              {geocoding ? (
                <ActivityIndicator color="#F5ECD7" />
              ) : (
                <Text style={styles.searchButtonText}>🔍 Buscar localização</Text>
              )}
            </Pressable>

            {geocodeResult && (
              <View style={styles.geocodeResultBox}>
                <Text style={styles.geocodeResultLabel}>✓ Localização encontrada</Text>
                <Text style={styles.geocodeResultText}>{geocodeResult.displayName}</Text>
              </View>
            )}

            {geocodeError && (
              <View style={styles.geocodeErrorBox}>
                <Text style={styles.geocodeErrorText}>⚠ {geocodeError}</Text>
              </View>
            )}

            <View style={styles.addButtonRow}>
              <Pressable
                style={[
                  styles.saveButton,
                  (!geocodeResult || saving) && styles.saveButtonDisabled,
                ]}
                onPress={handleSavePlace}
                disabled={!geocodeResult || saving}
              >
                {saving ? (
                  <ActivityIndicator color="#7B1E2E" />
                ) : (
                  <Text style={styles.saveButtonText}>Salvar</Text>
                )}
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddModal(false);
                  resetAddForm();
                }}
                disabled={saving}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Feedback modal ── */}
      <Modal visible={feedbackVisible} transparent animationType="fade">
        <View style={styles.feedbackBackdrop}>
          <View style={styles.feedbackCard}>
            <Text
              style={[
                styles.feedbackIcon,
                feedbackType === "success"
                  ? styles.feedbackIconSuccess
                  : styles.feedbackIconError,
              ]}
            >
              {feedbackType === "success" ? "✓" : "!"}
            </Text>
            <Text style={styles.feedbackTitle}>
              {feedbackType === "success" ? "Pronto" : "Atenção"}
            </Text>
            <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
            <Pressable
              style={styles.feedbackButton}
              onPress={() => setFeedbackVisible(false)}
            >
              <Text style={styles.feedbackButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
