import { colors, radius, spacing } from "@/app/styles/tokens/tokens";
import { StyleSheet } from "react-native";

export const petmapStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  map: {
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  topButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  topButtonPrimary: {
    backgroundColor: colors.wine,
  },
  topButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.wineDark,
  },
  topButtonTextLight: {
    color: colors.white,
  },
  hintBox: {
    position: "absolute",
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.terracotta,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.wineDark,
    marginBottom: spacing.xs,
  },
  hintText: {
    fontSize: 13,
    color: colors.creamTextSecondary,
    lineHeight: 18,
  },
  webFallback: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: colors.cream,
  },
  webTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.wineDark,
    marginBottom: spacing.md,
  },
  webText: {
    fontSize: 16,
    color: colors.creamTextSecondary,
    lineHeight: 22,
  },
});
