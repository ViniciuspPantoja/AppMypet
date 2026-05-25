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

export const loginStyles = StyleSheet.create({
  // ── Tela base ──────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  // ── Card principal ─────────────────────────────────────────
  card: {
    width: "100%",
    backgroundColor: colors.cardBg,
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: colors.wineLight,

    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 12,

    alignItems: "center",
  },

  // ── Ícone topo ─────────────────────────────────────────────
  appIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  appIcon: {
    fontSize: 34,
  },

  // ── Nome do app ────────────────────────────────────────────
  appName: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.cream,
    letterSpacing: -0.6,
    marginBottom: 6,
  },

  // ── Subtítulo / contexto ──────────────────────────────────
  subtitle: {
    fontSize: 14,
    color: colors.cream,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 26,
    paddingHorizontal: 10,
  },

  // ── Seletor de tipo de conta ──────────────────────────────
  typeSelectorRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginBottom: 22,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.wineLight,
    backgroundColor: "transparent",
    alignItems: "center",
  },

  typeButtonActive: {
    backgroundColor: colors.terracotta,
    borderColor: colors.terracottaDark,
  },

  typeButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.cream,
    opacity: 0.6,
  },

  typeButtonTextActive: {
    opacity: 1,
    color: colors.white,
  },

  // ── Inputs ────────────────────────────────────────────────
  input: {
    width: "100%",
    height: 52,
    backgroundColor: colors.cream,
    borderRadius: 50,
    paddingHorizontal: 22,
    fontSize: 15,
    color: colors.wine,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  // ── Esqueci senha ─────────────────────────────────────────
  forgotPassword: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: colors.cream,
    opacity: 0.7,
    marginBottom: 24,
    paddingHorizontal: 4,
  },

  // ── Botões principais ─────────────────────────────────────
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginBottom: 14,
  },

  primaryButton: {
    flex: 1,
    height: 52,
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

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.wine,
    letterSpacing: 0.3,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.cream,
    letterSpacing: 0.2,
  },

  // ── Visitante ─────────────────────────────────────────────
  guestButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  guestButtonText: {
    fontSize: 13,
    color: colors.cream,
    opacity: 0.55,
    textDecorationLine: "underline",
    textAlign: "center",
  },

  // ── Status / feedback ─────────────────────────────────────
  statusText: {
    marginTop: 14,
    fontSize: 12,
    color: colors.cream,
    opacity: 0.75,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
});
