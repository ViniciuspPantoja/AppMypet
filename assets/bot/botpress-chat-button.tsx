import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useState } from "react";
import { Modal, SafeAreaView, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import { BOTPRESS_BRAND_COLOR } from "./botpress-config";
import { BOTPRESS_HTML } from "./botpress-html";
import { botpressNativeStyles } from "./botpress-native.styles";

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
  backgroundColor = BOTPRESS_BRAND_COLOR,
  iconColor = "#fff",
  bottomOffset = 20,
}: BotpressChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openBotpressWebTab() {
    const botpressUrl = `data:text/html;charset=utf-8,${encodeURIComponent(BOTPRESS_HTML)}`;
    window.open(botpressUrl, "_blank", "noopener,noreferrer");
  }

  const positionStyle =
    position === "bottom-right"
      ? { right: 20, bottom: bottomOffset }
      : { left: 20, bottom: bottomOffset };

  return (
    <>
      <TouchableOpacity
        style={[
          botpressNativeStyles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
          positionStyle,
        ]}
        onPress={Platform.OS === "web" ? openBotpressWebTab : () => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="chat" size={size / 2} color={iconColor} />
      </TouchableOpacity>

      {Platform.OS === "web" ? null : (
        <Modal
          visible={isOpen}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsOpen(false)}
        >
          <SafeAreaView style={botpressNativeStyles.modalContainer}>
            <WebView
              source={{ html: BOTPRESS_HTML }}
              style={botpressNativeStyles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          </SafeAreaView>
        </Modal>
      )}
    </>
  );
}
