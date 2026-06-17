import { Dimensions, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - spacing.md * 2 - spacing.sm) / 2;

export const homeStyles = StyleSheet.create({
  // ── Tela ────────────────────────────────────────────────────
  container: {
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
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
  },

  headerTitle: {
    ...typography.title,
    color: colors.cream,
    fontSize: 22,
  },

  headerGreeting: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.65,
    marginTop: 2,
  },

  notifButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    borderWidth: 2,
    borderColor: colors.wineLight,
    alignItems: "center",
    justifyContent: "center",
  },

  notifIcon: {
    fontSize: 18,
  },

  // ── Hero Banner ─────────────────────────────────────────────
  heroBanner: {
    backgroundColor: colors.cream,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  heroIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderWidth: 2,
    borderColor: colors.wineDark,
  },

  heroIcon: {
    fontSize: 26,
  },

  heroContent: {
    flex: 1,
  },

  heroTitle: {
    ...typography.subtitle,
    color: colors.wineMedium,
    marginBottom: 3,
  },

  heroDescription: {
    ...typography.body,
    color: colors.creamTextSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: spacing.sm,
  },

  heroButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.terracotta,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },

  heroButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: "800",
  },

  // ── Seções ──────────────────────────────────────────────────
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },

  sectionLabel: {
    ...typography.label,
    color: colors.cream,
    opacity: 0.55,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  // ── Grid de Cards ───────────────────────────────────────────
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  card: {
    width: CARD_SIZE,
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.wineDark,
  },

  cardLabel: {
    ...typography.subtitle,
    color: colors.wineMedium,
    fontSize: 12,
    textAlign: "center",
  },

  cardDesc: {
    ...typography.caption,
    color: colors.creamTextSecondary,
    opacity: 0.8,
    textAlign: "center",
    fontSize: 10,
  },

  // ── Divisor ─────────────────────────────────────────────────
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.wineLight,
    opacity: 0.4,
  },

  dividerIcon: {
    fontSize: 13,
    opacity: 0.35,
  },

  // ── Atalhos Rápidos ──────────────────────────────────────────
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  quickPill: {
    flexGrow: 1,
    flexBasis: "31%",
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    minHeight: 90,
    paddingVertical: spacing.md,
    alignItems: "center",
    gap: spacing.xs,
    borderWidth: 2,
    borderColor: colors.creamDark,
    justifyContent: "center",
  },

  quickIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.wineDark,
  },

  quickLabel: {
    ...typography.label,
    color: colors.wineMedium,
    fontSize: 9,
    textAlign: "center",
    marginTop: 2,
  },
});
