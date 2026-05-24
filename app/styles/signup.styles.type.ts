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

  // estados (suaves, sem “vermelho puro”)
  error: "#FF6B6B",
  success: "#6BCB77",

  white: "#FFFFFF",
};

// ── Tokens de conforto visual ─────────────────────────────────
const RADIUS = {
  card: 28,
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
  card: {
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.38,
    shadowRadius: 18,
    elevation: 12,
  },
  floating: {
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 10,
  },
};

export const signupStyles = StyleSheet.create({
  // ── Tela base ──────────────────────────────────────────────
  container: {
    flex: 1,
    // mais profundidade / menos “chapado”
    backgroundColor: colors.wineDark,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 36,
    paddingBottom: 44,
    justifyContent: "center",
  },

  // ── Card principal (camada de contexto/marca) ──────────────
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: RADIUS.card,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderWidth: 1.5,
    borderColor: "rgba(155, 46, 66, 0.58)",

    ...SHADOWS.card,

    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },

  // ── Ícone topo ─────────────────────────────────────────────
  appIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "rgba(245, 236, 215, 0.16)", // cream em “vidro” suave
    borderWidth: 1,
    borderColor: "rgba(245, 236, 215, 0.24)",
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
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: colors.cream,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.2,
  },

  subtitle: {
    fontSize: 14.5,
    color: "rgba(245, 236, 215, 0.78)",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 22,
    paddingHorizontal: 10,
  },

  // ── Seletor de tipo (caso você reutilize em outra tela) ────
  typeSelectorRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },

  typeButton: {
    flex: 1,
    minHeight: 96,
    borderRadius: 18,
    borderWidth: 0,
    backgroundColor: "rgba(245,236,215,0.12)",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 18,
    paddingHorizontal: 10,
  },

  typeButtonActive: {
    backgroundColor: colors.terracotta,
    borderColor: colors.terracottaDark,
  },

  typeButtonText: {
    color: colors.cream,
    fontSize: 14,
    opacity: 0.95,
    textAlign: "center",
  },

  typeButtonIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  typeDescription: {
    fontSize: 14.5,
    color: "rgba(245, 236, 215, 0.78)",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 16,
  },

  typeDescriptionStrong: {
    fontWeight: "700",
    color: colors.cream,
  },

  typeButtonTextActive: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.white,
  },

  // ── Seções de formulário ──────────────────────────────────
  formSection: {
    marginTop: SPACING.lg,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    color: "rgba(245, 236, 215, 0.92)",
    marginBottom: SPACING.sm,
  },

  // ── Label (para o seletor de ramo) ─────────────────────────
  label: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "rgba(245, 236, 215, 0.92)",
    marginBottom: SPACING.xs,
  },

  // ── Select (ramo de atuação) — surface creme ───────────────
  selectWrapper: {
    minHeight: 54,
    borderRadius: RADIUS.input,
    paddingHorizontal: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    ...SHADOWS.floating,
  },

  selectText: {
    width: "100%",
    color: colors.wineDark,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  selectPlaceholder: {
    color: "rgba(74, 16, 32, 0.56)",
    fontWeight: "700",
  },

  inputWithError: {
    borderColor: "rgba(255, 107, 107, 0.78)",
  },

  fieldError: {
    marginTop: SPACING.xs,
    color: "rgba(255, 107, 107, 0.92)",
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "800",
  },

  // ── Botões ────────────────────────────────────────────────
  buttonRow: {
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },

  primaryButton: {
    height: 54,
    borderRadius: RADIUS.input,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.floating,
  },

  primaryButtonText: {
    fontSize: 15.5,
    fontWeight: "900",
    color: colors.wine,
    letterSpacing: 0.3,
  },

  secondaryButton: {
    height: 54,
    borderRadius: RADIUS.input,
    borderWidth: 1.5,
    borderColor: "rgba(245, 236, 215, 0.58)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  secondaryButtonText: {
    fontSize: 14.5,
    fontWeight: "800",
    color: "rgba(245, 236, 215, 0.92)",
    letterSpacing: 0.2,
  },

  primaryButtonDisabled: {
    opacity: 0.62,
  },

  // ── Modal (seleção de ramo) ────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(18, 5, 9, 0.68)", // vinho bem escuro, sem preto puro
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: colors.wine,
    borderTopLeftRadius: RADIUS.card,
    borderTopRightRadius: RADIUS.card,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.45)",
    ...SHADOWS.card,
  },

  modalItem: {
    minHeight: 52,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalItemSelected: {
    backgroundColor: colors.creamDark,
    borderColor: "rgba(212, 98, 58, 0.78)", // terracotta suavizado
  },

  modalItemText: {
    color: colors.wineDark,
    fontSize: 14.5,
    fontWeight: "900",
  },
});
