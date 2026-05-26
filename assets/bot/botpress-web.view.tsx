import { BOTPRESS_BRAND_COLOR, BOTPRESS_BOT_SCRIPT_URL, BOTPRESS_INJECT_SCRIPT_URL } from "./botpress-config";
import { useEffect } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BotpressWebViewProps {
  onClose: () => void;
}

function appendScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function openBotpress() {
  try {
    if (window.botpress && typeof window.botpress.open === "function") {
      window.botpress.open();
    }
  } catch {
    // no-op
  }

  try {
    if (window.botpressWebChat && typeof window.botpressWebChat.open === "function") {
      window.botpressWebChat.open();
    }
  } catch {
    // no-op
  }
}

export default function BotpressWebView({ onClose }: BotpressWebViewProps) {
  useEffect(() => {
    let mounted = true;

    async function boot() {
      try {
        await appendScript(BOTPRESS_INJECT_SCRIPT_URL);
        await appendScript(BOTPRESS_BOT_SCRIPT_URL);

        if (!mounted) {
          return;
        }

        const timer = window.setInterval(() => {
          openBotpress();
        }, 400);

        window.setTimeout(() => {
          window.clearInterval(timer);
        }, 25000);
      } catch (error) {
        console.warn("Botpress web boot error", error);
      }
    }

    void boot();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Zonny</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Fechar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.webContainer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5ECD7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(123,30,46,0.12)",
    backgroundColor: "#F5ECD7",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: BOTPRESS_BRAND_COLOR,
  },
  closeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  closeText: {
    fontSize: 14,
    fontWeight: "700",
    color: BOTPRESS_BRAND_COLOR,
  },
  webContainer: {
    flex: 1,
    backgroundColor: "#F5ECD7",
  },
});
