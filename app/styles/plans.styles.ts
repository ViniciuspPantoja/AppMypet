import { StyleSheet } from "react-native";

// ── Paleta MyPetZone ──────────────────────────────────────────
const colors = {
  wine: "#7B1E2E",
  wineDark: "#4A1020",
  wineLight: "#9B2E42",
  cardBg: "#8B2535",

  cream: "#F5ECD7",
  creamDark: "#EAD9BC",

  terracotta: "#D4623A",
  terracottaDark: "#C05020",

  textOnWine: "#F8F1E3",
  textMutedOnWine: "rgba(248, 241, 227, 0.75)",

  inkOnCream: "#4A1020",
  inkMutedOnCream: "rgba(74, 16, 32, 0.70)",

  overlay: "rgba(18, 5, 9, 0.65)",
};

// ── Tokens de consistência ───────────────────────────────────
const RADIUS = {
  card: 28,
  inner: 22,
  input: 18,
  pill: 999,
};

const SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};

const SHADOWS = {
  soft: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 14,
    elevation: 10,
  },
  card: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 12,
  },
};

export const plansStyles = StyleSheet.create({
  // ───────────────────────────────────────────────────────────
  // Base
  // ───────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: colors.wineDark,
  },

  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  // ───────────────────────────────────────────────────────────
  // Header (contexto/branding)
  // ───────────────────────────────────────────────────────────
  header: {
    backgroundColor: colors.cardBg,
    borderRadius: RADIUS.card,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)",
    ...SHADOWS.card,
    marginBottom: SPACING.xl,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },

  backButtonText: {
    fontSize: 22,
    color: colors.textOnWine,
    fontWeight: "700",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 22,
  },

  eyebrow: {
    color: "rgba(245, 236, 215, 0.85)",
    fontSize: 12.5,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: SPACING.xs,
  },

  title: {
    color: colors.textOnWine,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    letterSpacing: -0.2,
    marginBottom: SPACING.xs,
  },

  subtitle: {
    color: colors.textMutedOnWine,
    fontSize: 14.5,
    lineHeight: 21,
  },

  // ───────────────────────────────────────────────────────────
  // Grid/List de planos (coluna com ritmo)
  // ───────────────────────────────────────────────────────────
  plansGrid: {
    gap: SPACING.md,
  },

  // ───────────────────────────────────────────────────────────
  // Card do plano (surface creme)
  // ───────────────────────────────────────────────────────────
  planCard: {
    backgroundColor: colors.cream,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    ...SHADOWS.soft,
  },

  // Destaque do plano do meio (Gold)
  planCardHighlight: {
    backgroundColor: colors.creamDark,
    borderColor: "rgba(212, 98, 58, 0.80)",
    borderWidth: 1.5,
    shadowOpacity: 0.34,
  },

  // ───────────────────────────────────────────────────────────
  // Header do card
  // ───────────────────────────────────────────────────────────
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },

  planName: {
    color: colors.inkOnCream,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: -0.1,
  },

  planBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.pill,
    backgroundColor: "rgba(123, 30, 46, 0.10)", // vinho suave
    borderWidth: 1,
    borderColor: "rgba(123, 30, 46, 0.22)",
  },

  planBadgeText: {
    color: colors.wine,
    fontSize: 12.5,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  planDescription: {
    color: colors.inkMutedOnCream,
    fontSize: 14.5,
    lineHeight: 21,
    marginBottom: SPACING.md,
  },

  planDivider: {
    height: 1,
    backgroundColor: "rgba(74, 16, 32, 0.10)",
    marginBottom: SPACING.md,
  },

  // ───────────────────────────────────────────────────────────
  // Itens / bullets
  // ───────────────────────────────────────────────────────────
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  planItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(212, 98, 58, 0.85)", // terracotta suave
    marginRight: 10,
  },

  planItemText: {
    flex: 1,
    color: "rgba(74, 16, 32, 0.78)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },

  // ───────────────────────────────────────────────────────────
  // Footer (preço + CTA)
  // ───────────────────────────────────────────────────────────
  planFooter: {
    marginTop: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
  },

  planPriceLabel: {
    color: "rgba(74, 16, 32, 0.55)",
    fontSize: 12.5,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  planPrice: {
    color: colors.inkOnCream,
    fontSize: 16.5,
    fontWeight: "900",
  },

  // CTA principal (cream → wine, consistente com signup)
  planButton: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: RADIUS.input,
    backgroundColor: colors.wine,
    borderWidth: 1,
    borderColor: "rgba(74, 16, 32, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  planButtonText: {
    color: colors.textOnWine,
    fontSize: 14.5,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
});
