import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

export const vaccinesStyles = StyleSheet.create({
  // ── Tela ────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: colors.wine,
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: colors.wineMedium,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
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
    fontSize: 20,
  },

  // ── Alerta vacinas próximas ──────────────────────────────────
  alertSection: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.wineLight,
    gap: spacing.xs,
  },

  alertTitle: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 13,
  },

  alertDescription: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.75,
    fontSize: 12,
    lineHeight: 17,
  },

  // ── Botão adicionar ──────────────────────────────────────────
  actionSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },

  addButton: {
    backgroundColor: colors.terracotta,
    borderRadius: radius.pill,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  addButtonText: {
    ...typography.subtitle,
    color: colors.white,
    fontSize: 15,
  },

  // ── Seção histórico ──────────────────────────────────────────
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  sectionTitle: {
    ...typography.label,
    color: colors.cream,
    opacity: 0.55,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },

  // ── Card de vacina ───────────────────────────────────────────
  vaccineCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.creamDark,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  vaccineCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDark,
  },

  vaccineName: {
    ...typography.subtitle,
    color: colors.wineMedium,
    fontSize: 15,
  },

  vaccineStatus: {
    ...typography.caption,
    color: colors.wine,
    fontWeight: "800",
    fontSize: 12,
    backgroundColor: "rgba(123,30,46,0.1)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },

  vaccineCardInfo: {
    gap: spacing.xs,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoLabel: {
    ...typography.caption,
    color: colors.creamTextSecondary,
    fontSize: 11,
  },

  infoValue: {
    ...typography.caption,
    color: colors.wineMedium,
    fontWeight: "700",
    fontSize: 12,
  },

  // ── Botão editar ─────────────────────────────────────────────
  editButton: {
    marginTop: spacing.sm,
    alignSelf: "flex-end",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.wine,
    borderRadius: radius.pill,
  },

  editButtonText: {
    ...typography.caption,
    color: colors.cream,
    fontWeight: "700",
    fontSize: 11,
  },

  // ── Patinhas decorativas ─────────────────────────────────────
  pawDecor: {
    position: "absolute",
    fontSize: 48,
    opacity: 0.06,
  },

  // ── Estado vazio ─────────────────────────────────────────────
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },

  emptyStateEmoji: {
    fontSize: 52,
    marginBottom: spacing.sm,
  },

  emptyStateText: {
    ...typography.subtitle,
    color: colors.cream,
    textAlign: "center",
  },

  emptyStateSubtext: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.5,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
  },

  // ── Modais ───────────────────────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.xl,
    padding: spacing.md,
    maxHeight: "90%",
    borderWidth: 1,
    borderColor: colors.wineLight,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.cream,
    marginBottom: spacing.sm,
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.cream,
    marginTop: spacing.sm,
    marginBottom: 6,
  },

  petList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },

  petItem: {
    padding: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.wineLight,
    backgroundColor: "rgba(245,236,215,0.08)",
  },

  petItemActive: {
    backgroundColor: colors.cream,
    borderColor: colors.cream,
  },

  petName: {
    fontWeight: "700",
    color: colors.cream,
  },

  petMeta: {
    fontSize: 12,
    opacity: 0.7,
    color: colors.cream,
  },

  noPets: {
    color: colors.cream,
    opacity: 0.6,
    paddingVertical: 8,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: spacing.md,
    alignItems: "center",
  },

  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.wineLight,
    backgroundColor: "rgba(245,236,215,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButtonText: {
    fontSize: 18,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 12,
    borderRadius: radius.pill,
    alignItems: "center",
  },

  primaryButtonText: {
    color: colors.wine,
    fontWeight: "800",
  },

  secondaryButton: {
    flex: 1,
    padding: 12,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: "rgba(245,236,215,0.35)",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: colors.cream,
    fontWeight: "800",
  },

  confirmDeleteButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  deleteConfirmButton: {
    flex: 1,
    padding: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.statusError,
    alignItems: "center",
  },

  deleteConfirmButtonText: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 16,
  },

  feedbackBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  feedbackCard: {
    width: "100%",
    maxWidth: 340,
    borderRadius: radius.xl,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.wineLight,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
  },

  feedbackIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 14,
    overflow: "hidden",
  },

  feedbackIconSuccess: {
    color: colors.statusSuccess,
    backgroundColor: "rgba(107,203,119,0.15)",
  },

  feedbackIconError: {
    color: colors.statusError,
    backgroundColor: "rgba(255,107,107,0.15)",
  },

  feedbackTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.cream,
    textAlign: "center",
    marginBottom: 8,
  },

  feedbackMessage: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.cream,
    opacity: 0.75,
    textAlign: "center",
  },

  feedbackButton: {
    marginTop: 20,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    alignItems: "center",
  },

  feedbackButtonText: {
    color: colors.wine,
    fontWeight: "900",
    fontSize: 16,
  },
});
