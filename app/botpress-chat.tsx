import { BOTPRESS_HTML } from "@/components/botpress-html";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function BotpressChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ html: BOTPRESS_HTML }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});
