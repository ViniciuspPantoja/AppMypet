import { Dimensions, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

const { width } = Dimensions.get("window");

export const petDetailsStyles = StyleSheet.create({
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
    paddingBottom: spacing.lg,
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
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 22,
  },
  headerTitle: {
    ...typography.title,
    color: colors.cream,
    fontSize: 22,
    flex: 1,
  },

  // ── Hero card ───────────────────────────────────────────────
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.creamDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.wineDark,
    borderWidth: 3,
    borderColor: colors.wine,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarEmoji: {
    fontSize: 44,
  },
  petName: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.wineMedium,
    textAlign: "center",
  },
  petSubtitle: {
    fontSize: 14,
    color: colors.creamTextSecondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: spacing.md,
  },

  // ── Stats rápidas ────────────────────────────────────────────
  quickStats: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(123,30,46,0.08)",
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.creamDark,
  },
  statLabel: {
    ...typography.label,
    color: colors.creamTextSecondary,
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.wineMedium,
  },

  // ── Seções ──────────────────────────────────────────────────
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.cream,
    opacity: 0.55,
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  sectionCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  // ── Info grid ───────────────────────────────────────────────
  infoGrid: {
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.creamTextSecondary,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  infoValue: {
    ...typography.caption,
    color: colors.wineMedium,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right",
    flex: 1,
  },

  // ── Cards de vacina ──────────────────────────────────────────
  vaccineCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.creamDark,
    marginBottom: spacing.sm,
  },
  vaccineHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  vaccineName: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.wineMedium,
  },
  vaccineStatus: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.terracotta,
    backgroundColor: "rgba(212,98,58,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  vaccineMeta: {
    fontSize: 13,
    color: colors.creamTextSecondary,
    marginBottom: 2,
  },
  vaccineDates: {
    fontSize: 13,
    color: colors.wineMedium,
    fontWeight: "700",
  },

  // ── Estado vazio ─────────────────────────────────────────────
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.wineMedium,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },
  emptySubtext: {
    color: colors.creamTextSecondary,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: spacing.md,
  },

  // ── Botão de ação ─────────────────────────────────────────────
  sectionAction: {
    marginTop: spacing.md,
    backgroundColor: colors.terracotta,
    borderRadius: radius.pill,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionActionText: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 13,
    textAlign: "center",
  },

  footerSpacer: {
    height: width * 0.08,
  },

  // ── Botões editar / excluir ──────────────────────────────────
  actionRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  editButton: {
    flex: 1,
    height: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    borderWidth: 2,
    borderColor: colors.creamDark,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: colors.wineMedium,
    fontWeight: "900",
    fontSize: 14,
  },
  deleteButton: {
    height: 50,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.statusError,
    backgroundColor: "rgba(255,107,107,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: colors.statusError,
    fontWeight: "900",
    fontSize: 14,
  },

  // ── Modal de edição / confirmação ────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: colors.wineLight,
    maxHeight: "90%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(245,236,215,0.3)",
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.cream,
    marginBottom: spacing.md,
  },
  modalButtons: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  modalPrimary: {
    flex: 1,
    height: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPrimaryText: {
    color: colors.wine,
    fontWeight: "900",
    fontSize: 15,
  },
  modalSecondary: {
    height: 50,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: "rgba(245,236,215,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalSecondaryText: {
    color: colors.cream,
    fontWeight: "800",
    fontSize: 14,
  },
  modalDanger: {
    flex: 1,
    height: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.statusError,
    alignItems: "center",
    justifyContent: "center",
  },
  modalDangerText: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 15,
  },

  // ── Chips espécie / sexo no modal ────────────────────────────
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.wineLight,
    backgroundColor: "rgba(245,236,215,0.08)",
  },
  chipActive: {
    backgroundColor: colors.cream,
    borderColor: colors.cream,
  },
  chipText: {
    color: colors.cream,
    fontWeight: "700",
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.wine,
  },
  fieldLabel: {
    color: colors.cream,
    fontWeight: "800",
    fontSize: 12,
    marginTop: spacing.sm,
    marginBottom: 6,
  },
});
