import { StyleSheet } from "react-native";

// ── Paleta MyPetZone ──────────────────────────────────────────
const colors = {
  wine: "#7B1E2E",
  wineDark: "#4A1020",
  wineMedium: "#5A1520",
  wineLight: "#9B2E42",
  cardBg: "#8B2535",

  cream: "#F5ECD7",
  creamDark: "#EAD9BC",

  terracotta: "#D4623A",
  terracottaDark: "#C05020",

  white: "#FFFFFF",
};

export const signupStyles = StyleSheet.create({
  // ── Tela base ──────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.wine,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },

  // ── Card principal ─────────────────────────────────────────
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: colors.wineLight,

    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 12,
  },

  // ── Ícone topo ─────────────────────────────────────────────
  appIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 14,
  },

  appIcon: {
    fontSize: 34,
  },

  // ── Título e subtítulo ────────────────────────────────────
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.cream,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 14,
    color: colors.cream,
    opacity: 0.75,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },

  // ── Seletor de tipo ───────────────────────────────────────
  typeSelectorRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 22,
  },

  typeButton: {
    flex: 1,
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.wineLight,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
  },

  typeButtonActive: {
    backgroundColor: colors.terracotta,
    borderColor: colors.terracottaDark,
  },

  typeButtonText: {
    color: colors.white,
    fontSize: 13,
    opacity: 0.85,
  },

  typeButtonTextActive: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.white,
  },

  // ── Seções de descrição ───────────────────────────────────
  formSection: {
    marginBottom: 8,
  },

  // ── Botões ────────────────────────────────────────────────
  buttonRow: {
    marginTop: 16,
  },

  secondaryButton: {
    height: 48,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.cream,
    letterSpacing: 0.2,
  },

  primaryButtonDisabled: {
    opacity: 0.6,
  },
});