import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

export const statusMessageStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },

  card: {
    width: "100%",
    maxWidth: 340,
    borderRadius: radius.xl,
    backgroundColor: colors.wine,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.wineLight,
  },

  icon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 56,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: spacing.md,
    overflow: "hidden",
    color: colors.cream,
  },

  iconSuccess: {
    backgroundColor: "rgba(107, 203, 119, 0.16)",
  },

  iconError: {
    backgroundColor: "rgba(255, 107, 107, 0.16)",
  },

  iconWarning: {
    backgroundColor: "rgba(255, 193, 7, 0.18)",
  },

  message: {
    ...typography.body,
    color: colors.cream,
    textAlign: "center",
    lineHeight: 22,
  },

  button: {
    marginTop: spacing.lg,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    alignItems: "center",
  },

  buttonText: {
    ...typography.subtitle,
    color: colors.wine,
    fontSize: 15,
  },
});
