import notificationsService, {
    type NotificationAlert,
} from "@/app/services/notifications.service";
import {
    alertSeverityColors,
    alertSeverityIcon,
    notificationsStyles,
} from "@/app/styles/notifications.styles";
import { getFirebaseApp } from "@/database/firebase/firebase";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

const alertSeverityIcons = alertSeverityIcon;

export default function NotificationsScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);
  const [alerts, setAlerts] = useState<NotificationAlert[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAlerts = useCallback(async () => {
    const currentUserUid = auth.currentUser?.uid;
    if (!currentUserUid) {
      setAlerts([]);
      return;
    }

    setLoading(true);
    try {
      const pendingAlerts =
        await notificationsService.listPendingAlerts(currentUserUid);
      setAlerts(pendingAlerts);
    } catch {
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    void loadAlerts();
  }, [loadAlerts]);

  return (
    <SafeAreaView style={notificationsStyles.safeArea}>
      <ScrollView contentContainerStyle={notificationsStyles.scrollContent}>
        {/* Header */}
        <View style={notificationsStyles.header}>
          <View style={notificationsStyles.headerTop}>
            <Pressable
              style={notificationsStyles.backButton}
              onPress={() => router.back()}
            >
              <Text style={notificationsStyles.backButtonText}>‹</Text>
            </Pressable>
            <View style={notificationsStyles.headerTextWrap}>
              <Text style={notificationsStyles.title}>Notificações</Text>
              <Text style={notificationsStyles.subtitle}>
                Alertas pendentes de vacinas, consultas e estoque
              </Text>
            </View>
          </View>
        </View>

        {/* Actions Bar */}
        <View style={notificationsStyles.actionsContainer}>
          <View style={notificationsStyles.actionsRow}>
            <Text style={notificationsStyles.counter}>
              {alerts.length} alerta(s) pendente(s)
            </Text>
            <View style={notificationsStyles.actionsRight}>
              <Pressable
                style={notificationsStyles.secondaryButton}
                onPress={() => void loadAlerts()}
              >
                <Text style={notificationsStyles.secondaryButtonText}>
                  ↻ Atualizar
                </Text>
              </Pressable>
              <Pressable
                style={[
                  notificationsStyles.clearButton,
                  alerts.length === 0 && notificationsStyles.disabledButton,
                ]}
                onPress={() => setAlerts([])}
                disabled={alerts.length === 0}
              >
                <Text style={notificationsStyles.clearButtonText}>Limpar</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Content */}
        {loading ? (
          <View style={notificationsStyles.centerBox}>
            <ActivityIndicator size="large" color="#7B1E2E" />
            <Text style={notificationsStyles.centerText}>
              Carregando alertas...
            </Text>
          </View>
        ) : alerts.length === 0 ? (
          <View style={notificationsStyles.centerBox}>
            <Text style={notificationsStyles.emptyEmoji}>✅</Text>
            <Text style={notificationsStyles.emptyTitle}>
              Nenhum alerta pendente
            </Text>
            <Text style={notificationsStyles.emptyText}>
              Quando houver vacinas vencendo, consultas próximas ou itens de
              estoque quase acabando, elas aparecerão aqui.
            </Text>
          </View>
        ) : (
          <View style={notificationsStyles.listContent}>
            {alerts.map((alert) => {
              const cardStyle =
                alert.severity === "critical"
                  ? notificationsStyles.alertCardCritical
                  : alert.severity === "warning"
                    ? notificationsStyles.alertCardWarning
                    : notificationsStyles.alertCardInfo;

              return (
                <View
                  key={alert.id}
                  style={[notificationsStyles.alertCard, cardStyle]}
                >
                  <View style={notificationsStyles.alertHeader}>
                    <View style={notificationsStyles.alertIconWrap}>
                      <MaterialCommunityIcons
                        name={
                          alertSeverityIcons[
                            alert.severity
                          ] as keyof typeof MaterialCommunityIcons.glyphMap
                        }
                        size={16}
                        color={alertSeverityColors[alert.severity]}
                      />
                    </View>
                    <Text style={notificationsStyles.alertTitle}>
                      {alert.title}
                    </Text>
                  </View>
                  <Text style={notificationsStyles.alertDescription}>
                    {alert.description}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
