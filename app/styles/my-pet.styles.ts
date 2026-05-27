import { StyleSheet } from "react-native";

// ── Paleta MyPetZone ──────────────────────────────────────────
const colors = {
  // Identidade
  wine: "#7B1E2E",
  wineDark: "#4A1020",
  wineLight: "#9B2E42",
  cardBg: "#8B2535",

  // Conforto (surfaces)
  cream: "#F5ECD7",
  creamDark: "#EAD9BC",

  // Ação
  terracotta: "#D4623A",
  terracottaDark: "#C05020",

  // Estados
  error: "#FF6B6B",
  success: "#6BCB77",

  // Textos
  textOnWine: "#F8F1E3",
  textMutedOnWine: "rgba(248, 241, 227, 0.75)",
  inkOnCream: "#4A1020",
  inkMutedOnCream: "rgba(74, 16, 32, 0.70)",
};

// ── Tokens ───────────────────────────────────────────────────
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
  card: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 12,
  },
  floating: {
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 14,
    elevation: 10,
  },
};

export const myPetStyles = StyleSheet.create({
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
  // Header (faixa topo + volta)
  // ───────────────────────────────────────────────────────────
  header: {
    backgroundColor: colors.wine,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
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

  // ───────────────────────────────────────────────────────────
  // Hero (avatar + card de perfil)
  // ───────────────────────────────────────────────────────────
  hero: {
    alignItems: "center",
    marginTop: -SPACING.lg, // aproxima do header sem “quebrar” o respiro
    marginBottom: SPACING.xl,
  },

  avatarWrap: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(245, 236, 215, 0.18)",
    borderWidth: 4,
    borderColor: colors.cardBg, // “anel” vinho do card para dar unidade
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    ...SHADOWS.floating,
    position: "relative",
  },

  avatarImage: {
    width: 132,
    height: 132,
    borderRadius: 66,
  },

  avatarPlaceholder: {
    fontSize: 58,
    color: colors.textOnWine,
  },

  avatarEditButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 42,
    height: 42,
    borderRadius: 20,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    ...SHADOWS.floating,
  },

  avatarEditIcon: {
    fontSize: 16,
  },

  // Avatar action buttons (adicionar / trocar / remover)
  avatarActions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarActionButton: {
    minHeight: 42,
    minWidth: 100,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarActionButtonDanger: {
    minHeight: 42,
    minWidth: 100,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.error,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarActionText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.wineDark,
    textAlign: "center",
  },

  // Card do perfil (camada vinho)
  card: {
    width: "100%",
    backgroundColor: colors.cardBg,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)",
    ...SHADOWS.card,
  },

  name: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    color: colors.textOnWine,
    letterSpacing: -0.2,
    marginBottom: 4,
  },

  email: {
    fontSize: 14.5,
    lineHeight: 20,
    color: colors.textMutedOnWine,
    marginBottom: SPACING.lg,
  },

  infoGrid: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },

  infoItem: {
    backgroundColor: "rgba(245, 236, 215, 0.10)",
    borderRadius: RADIUS.inner,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(245, 236, 215, 0.12)",
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "rgba(245, 236, 215, 0.72)",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15.5,
    fontWeight: "800",
    color: colors.textOnWine,
  },

  // CTA de perfil (surface creme)
  actionButton: {
    marginTop: SPACING.sm,
    minHeight: 48,
    minWidth: 120,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.input,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.floating,
  },

  actionButtonText: {
    color: colors.wine,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
  },

  // ───────────────────────────────────────────────────────────
  // Seção Pets
  // ───────────────────────────────────────────────────────────
  section: {
    marginTop: SPACING.lg,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    color: "rgba(245, 236, 215, 0.92)",
  },

  sectionAction: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: RADIUS.input,
    backgroundColor: colors.terracotta,
    borderWidth: 1,
    borderColor: "rgba(192, 80, 32, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionActionText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12.5,
    letterSpacing: 0.2,
    textAlign: "center",
  },

  sectionDelete: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: RADIUS.input,
    backgroundColor: colors.error,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  sectionDeletePressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },

  sectionDeleteText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12.5,
    letterSpacing: 0.2,
    textAlign: "center",
  },

  petDeleteRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(245,236,215,0.06)",
  },

  petDeleteButton: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: RADIUS.input,
    backgroundColor: colors.error,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  petDeleteButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12.5,
    letterSpacing: 0.2,
    textAlign: "center",
  },

  // ───────────────────────────────────────────────────────────
  // Empty state (quando não há pets)
  // ───────────────────────────────────────────────────────────
  emptyState: {
    backgroundColor: colors.cardBg,
    borderRadius: RADIUS.card,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)",
    alignItems: "center",
    ...SHADOWS.card,
  },

  emptyEmoji: {
    fontSize: 44,
    marginBottom: SPACING.sm,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.textOnWine,
    marginBottom: 6,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14.5,
    lineHeight: 21,
    color: colors.textMutedOnWine,
    textAlign: "center",
  },

  // ───────────────────────────────────────────────────────────
  // Lista de pets
  // ───────────────────────────────────────────────────────────
  petList: {
    gap: SPACING.md,
  },

  petCard: {
    backgroundColor: colors.cream,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.floating,
  },

  petAvatarWrap: {
    width: 74,
    height: 74,
    borderRadius: RADIUS.inner,
    backgroundColor: colors.creamDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: "rgba(74, 16, 32, 0.08)",
  },

  petAvatarImage: {
    width: 74,
    height: 74,
    borderRadius: RADIUS.inner,
  },

  petAvatarEmoji: {
    fontSize: 34,
  },

  petContent: {
    flex: 1,
    justifyContent: "center",
  },

  petName: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.inkOnCream,
    marginBottom: 4,
    letterSpacing: -0.1,
  },

  petMeta: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMutedOnCream,
    marginBottom: 6,
  },

  petInfoRow: {
    flexDirection: "row",
    gap: 16,
  },

  petInfoText: {
    fontSize: 13,
    color: "rgba(74, 16, 32, 0.60)",
    fontWeight: "700",
  },

  petChevron: {
    fontSize: 20,
    color: colors.terracotta,
    fontWeight: "900",
  },
  petChevronButton: {
    width: 40,
    height: 40,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(212, 98, 58, 0.10)",
    marginLeft: SPACING.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "84%",
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: SPACING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.textOnWine,
    marginBottom: SPACING.sm,
  },

  modalMessage: {
    fontSize: 14,
    color: colors.textMutedOnWine,
    textAlign: "center",
    marginBottom: SPACING.md,
  },

  modalButton: {
    backgroundColor: colors.cream,
    minHeight: 46,
    minWidth: 120,
    paddingHorizontal: 20,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.98)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalButtonText: {
    color: colors.wine,
    fontWeight: "900",
    fontSize: 14,
    textAlign: "center",
  },
});
