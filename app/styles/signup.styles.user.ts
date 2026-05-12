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

  textHint: "#B08860",
  white: "#FFFFFF",

  statusError: "#FF6B6B",
  statusSuccess: "#6BCB77",
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
    fontSize: 32,
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
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 22,
    paddingHorizontal: 10,
  },

  // ── Seções do formulário ──────────────────────────────────
  formSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.cream,
    marginBottom: 10,
    opacity: 0.9,
    letterSpacing: 0.3,
  },

  // ── Área de botões ────────────────────────────────────────
  buttonRow: {
    marginTop: 8,
    gap: 12,
  },

  primaryButton: {
    height: 54,
    backgroundColor: colors.cream,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonDisabled: {
    opacity: 0.6,
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.wine,
    letterSpacing: 0.3,
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
});