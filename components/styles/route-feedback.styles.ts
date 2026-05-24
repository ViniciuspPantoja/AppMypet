import { StyleSheet } from "react-native";

const routeFeedbackStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  routeLabel: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 24,
  },
  hint: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default routeFeedbackStyles;
