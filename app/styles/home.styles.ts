import { Dimensions, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - spacing.lg * 2 - spacing.sm * 3) / 2;

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
    width: 58,
    height: 58,
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
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  // Card creme (Pet Map)
  cardCream: {
    width: CARD_SIZE,
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  // Card vinho (Meu Pet, Planos)
  cardWine: {
    width: CARD_SIZE,
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.wineLight,
  },

  // Card terracota (Parceiros)
  cardTerracotta: {
    width: CARD_SIZE,
    backgroundColor: colors.terracotta,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.terracottaDark,
  },

  cardIconWrapperWine: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.wineDark,
  },

  cardIconWrapperTerracotta: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.terracotta,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.terracottaDark,
  },

  cardIconWrapperDark: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.wineDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.wine,
  },

  cardIconWrapperTerracottaDark: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.terracottaDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.terracotta,
  },

  cardIcon: {
    fontSize: 22,
  },

  cardLabelDark: {
    ...typography.subtitle,
    color: colors.wineMedium,
    fontSize: 12,
    textAlign: "center",
  },

  cardLabelLight: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 12,
    textAlign: "center",
  },

  cardDescDark: {
    ...typography.caption,
    color: colors.wineMedium,
    opacity: 0.7,
    textAlign: "center",
    fontSize: 10,
  },

  cardDescLight: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.7,
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
    backgroundColor: colors.cardBg,
    borderRadius: radius.md,
    minHeight: 78,
    paddingVertical: spacing.sm,
    alignItems: "center",
    gap: spacing.xs,
    borderWidth: 2,
    borderColor: colors.wineLight,
    justifyContent: "center",
  },

  quickIcon: {
    fontSize: 18,
    textAlign: "center",
  },

  quickLabel: {
    ...typography.label,
    color: colors.cream,
    fontSize: 8.5,
    textAlign: "center",
  },
});
