import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

export const nearbyStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.wine,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: colors.wineMedium,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: "rgba(245,236,215,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 22,
    color: colors.cream,
    fontWeight: "700",
    includeFontPadding: false,
  },
  headerTexts: {
    flex: 1,
  },
  headerTitle: {
    ...typography.title,
    color: colors.cream,
    fontSize: 20,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.6,
    fontSize: 12,
    marginTop: 2,
  },

  // ── Estado de localização ────────────────────────────────────
  centerBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  centerEmoji: {
    fontSize: 52,
  },
  centerTitle: {
    ...typography.subtitle,
    color: colors.cream,
    textAlign: "center",
  },
  centerText: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.6,
    textAlign: "center",
    lineHeight: 20,
  },
  retryButton: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.terracotta,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 14,
  },

  // ── Contador ─────────────────────────────────────────────────
  countRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  countText: {
    ...typography.label,
    color: colors.cream,
    opacity: 0.55,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // ── Lista ────────────────────────────────────────────────────
  list: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },

  // ── Card de local ────────────────────────────────────────────
  card: {
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.creamDark,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.wine,
    borderWidth: 2,
    borderColor: colors.wineDark,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
  },
  cardName: {
    ...typography.subtitle,
    color: colors.wineMedium,
    fontSize: 14,
  },
  cardAddress: {
    ...typography.body,
    color: colors.creamTextSecondary,
    fontSize: 11,
    marginTop: 2,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  cardDistance: {
    ...typography.caption,
    color: colors.wine,
    fontWeight: "800",
    fontSize: 12,
  },
  cardArrow: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardArrowText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: "900",
  },
});
