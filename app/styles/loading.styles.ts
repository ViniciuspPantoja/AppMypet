import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5ECD7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A1020",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#4A1020",
    opacity: 0.75,
  },
});
