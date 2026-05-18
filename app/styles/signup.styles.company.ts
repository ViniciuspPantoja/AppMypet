import { StyleSheet } from "react-native";

const COLORS = {
  // Identidade
  wine: "#7B1E2E",
  wineDark: "#4A1020",
  wineLight: "#9B2E42",

  // Conforto (surfaces)
  cream: "#F5ECD7",
  creamDark: "#EAD9BC",

  // Ação
  terracotta: "#D4623A",
  terracottaDark: "#C05020",

  // Estados
  error: "#FF6B6B",
  success: "#6BCB77",

  // Neutros “suavizados”
  textOnWine: "#F8F1E3",
  textMutedOnWine: "rgba(248, 241, 227, 0.78)",
  overlay: "rgba(18, 5, 9, 0.68)", // vinho bem escuro, sem “preto puro”
};

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
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  floating: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
};

export const signupStyles = StyleSheet.create({
  // ─────────────────────────────────────────────────────────────
  // Base
  // ─────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.wineDark,
  },

  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  // ─────────────────────────────────────────────────────────────
  // Card principal (marca + contexto)
  // ─────────────────────────────────────────────────────────────
  card: {
    backgroundColor: COLORS.wine,
    borderRadius: RADIUS.card,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)", // wineLight suavizado
    ...SHADOWS.card,

    // Em telas grandes (tablet), mantém “premium” centralizado
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },

  // ─────────────────────────────────────────────────────────────
  // Ícone topo
  // ─────────────────────────────────────────────────────────────
  appIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: SPACING.md,
    backgroundColor: "rgba(245, 236, 215, 0.16)", // cream com opacidade (sem agressividade)
    borderWidth: 1,
    borderColor: "rgba(245, 236, 215, 0.22)",
  },

  appIcon: {
    fontSize: 30,
  },

  // ─────────────────────────────────────────────────────────────
  // Título / subtítulo
  // ─────────────────────────────────────────────────────────────
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.textOnWine,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.2,
    marginBottom: SPACING.xs,
  },

  subtitle: {
    fontSize: 14.5,
    lineHeight: 21,
    color: COLORS.textMutedOnWine,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },

  // ─────────────────────────────────────────────────────────────
  // Seções
  // ─────────────────────────────────────────────────────────────
  formSection: {
    marginTop: SPACING.lg,
  },

  sectionTitle: {
    fontSize: 13.5,
    fontWeight: "800",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "rgba(245, 236, 215, 0.92)", // cream levemente menos “estourado”
    marginBottom: SPACING.sm,
  },

  // Labels do seletor (para harmonizar com FormInput)
  label: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "rgba(245, 236, 215, 0.92)",
    marginBottom: SPACING.xs,
  },

  // ─────────────────────────────────────────────────────────────
  // Select (ramo de atuação) — input surface creme
  // ─────────────────────────────────────────────────────────────
  selectWrapper: {
    minHeight: 54,
    borderRadius: RADIUS.input,
    paddingHorizontal: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.95)", // creamDark
    ...SHADOWS.floating,
  },

  selectText: {
    width: "100%",
    color: COLORS.wineDark,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  selectPlaceholder: {
    color: "rgba(74, 16, 32, 0.55)", // wineDark suavizado
    fontWeight: "600",
  },

  // Input-like button usado para abrir o modal de seleção
  inputLikeButton: {
    minHeight: 54,
    width: "100%",
    borderRadius: RADIUS.input,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.95)",
    justifyContent: "center",
    ...SHADOWS.floating,
  },

  inputLikeButtonText: {
    color: COLORS.wineDark,
    fontSize: 15,
    fontWeight: "700",
  },

  inputLikeButtonPlaceholder: {
    color: "rgba(74, 16, 32, 0.5)",
    fontSize: 15,
    fontWeight: "600",
  },

  // Erro no seletor: borda suave (sem agressividade)
  inputWithError: {
    borderColor: "rgba(255, 107, 107, 0.75)",
  },

  fieldError: {
    marginTop: SPACING.xs,
    color: "rgba(255, 107, 107, 0.92)",
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "700",
  },

  // ─────────────────────────────────────────────────────────────
  // Botões
  // ─────────────────────────────────────────────────────────────
  buttonRow: {
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },

  primaryButton: {
    height: 54,
    borderRadius: RADIUS.input,
    backgroundColor: COLORS.cream,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.95)",
    ...SHADOWS.floating,
  },

  primaryButtonDisabled: {
    opacity: 0.62,
  },

  primaryButtonText: {
    color: COLORS.wine,
    fontSize: 15.5,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  secondaryButton: {
    height: 54,
    borderRadius: RADIUS.input,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(245, 236, 215, 0.55)",
  },

  secondaryButtonText: {
    color: "rgba(245, 236, 215, 0.92)",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  // ─────────────────────────────────────────────────────────────
  // Modal — seleção de ramo
  // ─────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: COLORS.wine,
    borderTopLeftRadius: RADIUS.card,
    borderTopRightRadius: RADIUS.card,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.45)",
    ...SHADOWS.card,
  },

  modalItem: {
    minHeight: 52,
    borderRadius: 18,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalItemSelected: {
    backgroundColor: COLORS.creamDark,
    borderColor: "rgba(212, 98, 58, 0.75)", // terracotta
  },

  modalItemText: {
    color: COLORS.wineDark,
    fontSize: 14.5,
    fontWeight: "800",
  },
});
