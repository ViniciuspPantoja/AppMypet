import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

const vaccineColors = {
  bg: "#0F2D23",
  bgCard: "#F5ECD7",
  bgHeader: "#1A3D2E",
  bgAlert: "#1F4A35",
  bgAlertBorder: "#2D7A4F",
  accent: "#4CAF7D",
  accentWarm: "#D4623A",
  textDark: "#1A3D2E",
  textMuted: "#5A8A6A",
};

export const vaccinesStyles = StyleSheet.create({
  // ── Tela ────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: vaccineColors.bg,
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: vaccineColors.bgHeader,
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
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    fontSize: 22,
    color: vaccineColors.bgCard,
    fontWeight: "700",
    includeFontPadding: false,
  },

  headerTitle: {
    ...typography.title,
    color: vaccineColors.bgCard,
    fontSize: 20,
  },

  // ── Alerta ──────────────────────────────────────────────────
  alertSection: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: vaccineColors.bgAlert,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: vaccineColors.bgAlertBorder,
    gap: spacing.xs,
  },

  alertTitle: {
    ...typography.subtitle,
    color: vaccineColors.bgCard,
    fontSize: 13,
  },

  alertDescription: {
    ...typography.body,
    color: vaccineColors.bgCard,
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
    backgroundColor: vaccineColors.accentWarm,
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
    color: vaccineColors.bgCard,
    opacity: 0.55,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },

  // ── Tabela header ────────────────────────────────────────────
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },

  tableHeaderCell: {
    flex: 1,
    ...typography.label,
    color: vaccineColors.bgCard,
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
    fontSize: 10,
  },

  // ── Card de vacina ───────────────────────────────────────────
  vaccineCard: {
    backgroundColor: vaccineColors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
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
    borderBottomColor: "rgba(26,61,46,0.12)",
  },

  vaccineName: {
    ...typography.subtitle,
    color: vaccineColors.textDark,
    fontSize: 15,
  },

  vaccineStatus: {
    ...typography.caption,
    color: vaccineColors.accent,
    fontWeight: "800",
    fontSize: 12,
    backgroundColor: "rgba(76,175,125,0.15)",
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
    color: vaccineColors.textMuted,
    fontSize: 11,
  },

  infoValue: {
    ...typography.caption,
    color: vaccineColors.textDark,
    fontWeight: "700",
    fontSize: 12,
  },

  // ── Botão editar ─────────────────────────────────────────────
  editButton: {
    marginTop: spacing.sm,
    alignSelf: "flex-end",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: vaccineColors.bgHeader,
    borderRadius: radius.pill,
  },

  editButtonText: {
    ...typography.caption,
    color: vaccineColors.bgCard,
    fontWeight: "700",
    fontSize: 11,
  },

  // ── Modais / feedback ──────────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
  },

  petItemActive: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
  },

  petName: { fontWeight: "700" },

  petMeta: { fontSize: 12, opacity: 0.7 },

  noPets: { color: "#666", paddingVertical: 8 },

  modalButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    alignItems: "center",
  },

  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#c8b0b4",
    backgroundColor: "rgba(91, 33, 50, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButtonText: {
    fontSize: 18,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#5b2132",
    padding: 12,
    borderRadius: 999,
    alignItems: "center",
  },

  primaryButtonText: { color: "#fff", fontWeight: "800" },

  secondaryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#5b2132",
    alignItems: "center",
  },

  secondaryButtonText: { color: "#5b2132", fontWeight: "800" },

  confirmDeleteButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  deleteConfirmButton: {
    flex: 1,
    padding: 12,
    borderRadius: 999,
    backgroundColor: "#b3261e",
    alignItems: "center",
  },

  deleteConfirmButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },

  feedbackBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  feedbackCard: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 24,
    backgroundColor: "#fff",
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: "center",
  },

  feedbackIcon: {
    width: 56,
    height: 56,
    borderRadius: 999,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 14,
    overflow: "hidden",
  },

  feedbackIconSuccess: {
    color: "#2e7d32",
    backgroundColor: "rgba(46, 125, 50, 0.12)",
  },

  feedbackIconError: {
    color: "#b3261e",
    backgroundColor: "rgba(179, 38, 30, 0.12)",
  },

  feedbackTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#2a1f24",
    textAlign: "center",
    marginBottom: 8,
  },

  feedbackMessage: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5c5360",
    textAlign: "center",
  },

  feedbackButton: {
    marginTop: 20,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#5b2132",
    alignItems: "center",
  },

  feedbackButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
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
    color: vaccineColors.bgCard,
    textAlign: "center",
  },

  emptyStateSubtext: {
    ...typography.body,
    color: vaccineColors.bgCard,
    opacity: 0.5,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
  },
});
