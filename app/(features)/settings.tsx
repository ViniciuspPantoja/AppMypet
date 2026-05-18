import { settingsStyles as styles } from "@/app/styles/settings.styles";
import { getFirebaseApp } from "@/database/firebase/firebase";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";

const settingsItems = [
  {
    title: "Conta",
    description: "Ajuste nome, e-mail e preferências da sua conta.",
    icon: "👤",
  },
  {
    title: "Notificações",
    description: "Controle alertas de vacinas, consultas e novidades.",
    icon: "🔔",
  },
  {
    title: "Privacidade",
    description: "Gerencie visibilidade de dados e permissões do app.",
    icon: "🔒",
  },
  {
    title: "Ajuda",
    description: "Acesse suporte e orientações rápidas de uso.",
    icon: "💬",
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const auth = useMemo(() => getAuth(getFirebaseApp()), []);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  function openFeedback(message: string) {
    setFeedbackMessage(message);
    setFeedbackVisible(true);
  }

  async function handleLogout() {
    try {
      setLoading(true);
      await signOut(auth);
      setShowLogoutConfirm(false);
      openFeedback("Logout realizado com sucesso.");
      router.replace("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível sair da conta.";
      openFeedback(`Erro: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>‹ Voltar</Text>
          </Pressable>

          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>
            Centro de ajustes do aplicativo. Depois você pode ligar cada item ao
            fluxo real.
          </Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroIcon}>⚙️</Text>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>Ajustes do MyPetZone</Text>
            <Text style={styles.heroDescription}>
              Aqui ficam as preferências do usuário e as opções gerais do
              aplicativo.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Opções rápidas</Text>
        </View>

        {settingsItems.map((item) => (
          <View key={item.title} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.iconBubble}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.logoutCard}>
          <View style={styles.logoutTextBlock}>
            <Text style={styles.logoutTitle}>Sair da conta</Text>
            <Text style={styles.logoutDescription}>
              Encerre sua sessão e volte para a tela de login.
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={() => setShowLogoutConfirm(true)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.logoutButtonText}>Logout</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={showLogoutConfirm} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalIcon}>🚪</Text>
            <Text style={styles.modalTitle}>Deseja sair da conta?</Text>
            <Text style={styles.modalMessage}>
              Você precisará entrar novamente para acessar seu perfil e os
              demais recursos.
            </Text>

            <View style={styles.modalButtonRow}>
              <Pressable
                style={styles.modalSecondaryButton}
                onPress={() => setShowLogoutConfirm(false)}
                disabled={loading}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.modalPrimaryButton}
                onPress={handleLogout}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalPrimaryButtonText}>Sair</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={feedbackVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackIcon}>✓</Text>
            <Text style={styles.feedbackTitle}>{feedbackMessage}</Text>
            <Pressable
              style={styles.feedbackButton}
              onPress={() => setFeedbackVisible(false)}
            >
              <Text style={styles.feedbackButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
