import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
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
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="chat" size={size / 2} color={iconColor} />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <SafeAreaView style={botpressNativeStyles.modalContainer}>
          <View style={botpressNativeStyles.header}>
            <View style={botpressNativeStyles.headerContent}>
              <MaterialIcons
                name="support-agent"
                size={20}
                color={BOTPRESS_BRAND_COLOR}
              />
              <View style={botpressNativeStyles.headerText}>
                <Text style={botpressNativeStyles.headerTitle}>Suporte MyPet</Text>
                <Text style={botpressNativeStyles.headerSubtitle}>Online</Text>
              </View>
            </View>
            <TouchableOpacity
              style={botpressNativeStyles.closeButton}
              onPress={() => setIsOpen(false)}
            >
              <MaterialIcons name="close" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          <WebView
            source={{ html: BOTPRESS_HTML }}
            style={botpressNativeStyles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}
