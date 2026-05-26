import { StyleSheet } from "react-native";

export const botpressNativeStyles = StyleSheet.create({
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
    backgroundColor: "#F5ECD7",
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
