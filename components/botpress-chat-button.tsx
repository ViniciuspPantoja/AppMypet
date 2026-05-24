import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import WebView from "react-native-webview";
import { BOTPRESS_HTML } from "./botpress-html";

interface BotpressChatButtonProps {
  position?: "bottom-right" | "bottom-left";
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  bottomOffset?: number;
}

export default function BotpressChatButton({
  position = "bottom-right",
  size = 60,
  backgroundColor = "#6366f1",
  iconColor = "#fff",
  bottomOffset = 20,
}: BotpressChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionStyle =
    position === "bottom-right"
      ? { right: 20, bottom: bottomOffset }
      : { left: 20, bottom: bottomOffset };

  return (
    <>
      {/* Botão flutuante */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
          positionStyle,
        ]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="chat" size={size / 2} color={iconColor} />
      </TouchableOpacity>

      {/* Modal com o chat */}
      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <MaterialIcons name="support-agent" size={20} color="#6366f1" />
              <View style={styles.headerText}>
                <View style={styles.headerTitle}>Suporte MyPet</View>
                <View style={styles.headerSubtitle}>Online</View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}
            >
              <MaterialIcons name="close" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          <WebView
            source={{ html: BOTPRESS_HTML }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerText: {
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
});
