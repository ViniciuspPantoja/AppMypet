import { colors } from "@/app/styles/tokens/tokens";
import { FormInput } from "@/components/form-input";
import { StatusMessage, StatusType } from "@/components/status-message";
import { useAuth } from "@/contexts/AuthContext";
import { createPetFriendlyStore } from "@/database/sqlite/stores";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RegisterPetStoreScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: StatusType }>({
    message: "",
    type: "success",
  });

  async function handleUseCurrentLocation() {
    setStatus({ message: "", type: "success" });
    try {
      setLocating(true);
      const { status: perm } =
        await Location.requestForegroundPermissionsAsync();
      if (perm !== "granted") {
        setStatus({
          message:
            "Permissão de localização negada. Ative nas definições do telemóvel para marcar a loja no sítio onde está.",
          type: "error",
        });
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao obter localização.";
      setStatus({ message: msg, type: "error" });
    } finally {
      setLocating(false);
    }
  }

  async function handleSave() {
    if (!user) {
      setStatus({
        message: "Inicie sessão para cadastrar uma loja.",
        type: "error",
      });
      return;
    }
    if (!name.trim()) {
      setStatus({ message: "Indique o nome da loja.", type: "error" });
      return;
    }
    if (latitude === null || longitude === null) {
      setStatus({
        message:
          "Defina a localização da loja no mapa: use «Usar posição atual» estando no local, ou peça ajuda para obter latitude/longitude.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: "", type: "success" });

      await createPetFriendlyStore({
        name: name.trim(),
        address: address.trim() || undefined,
        latitude,
        longitude,
        createdByUid: user.id,
        createdAt: new Date().toISOString(),
      });
      router.back();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Não foi possível guardar a loja.";
      setStatus({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>← Voltar</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Cadastrar loja pet friendly</Text>
          <Text style={styles.subtitle}>
            Só aparecem no mapa lojas registadas por utilizadores desta app. A
            posição deve corresponder à entrada da loja (use o botão estando no
            local).
          </Text>

          {!!status.message && (
            <StatusMessage
              type={status.type}
              message={status.message}
              visible={!!status.message}
              onDismiss={() => setStatus({ message: "", type: "success" })}
            />
          )}

          <FormInput
            label="Nome da loja"
            placeholder="Ex.: Pet Shop Central"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />

          <FormInput
            label="Morada (opcional)"
            placeholder="Rua, número, cidade"
            value={address}
            onChangeText={setAddress}
            editable={!loading}
          />

          <Pressable
            style={[styles.locBtn, locating && styles.btnDisabled]}
            onPress={handleUseCurrentLocation}
            disabled={locating || loading}
          >
            {locating ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.locBtnText}>Usar posição atual (GPS)</Text>
            )}
          </Pressable>

          {latitude !== null && longitude !== null && (
            <Text style={styles.coords}>
              Coordenadas: {latitude.toFixed(5)}, {longitude.toFixed(5)}
            </Text>
          )}

          <Pressable
            style={[styles.saveBtn, loading && styles.btnDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.saveBtnText}>Guardar no mapa</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  back: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: colors.wine,
    fontWeight: "600",
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.wineDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.creamTextSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  locBtn: {
    backgroundColor: colors.terracotta,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  locBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  coords: {
    marginTop: 12,
    fontSize: 13,
    color: colors.wineMedium,
  },
  saveBtn: {
    backgroundColor: colors.wine,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  saveBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  btnDisabled: {
    opacity: 0.6,
  },
});
