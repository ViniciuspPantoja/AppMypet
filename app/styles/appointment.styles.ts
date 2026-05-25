import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

const CALENDAR_GAP = 4;
const CALENDAR_COLUMN_WIDTH = "13.12%";

export const appointmentStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.wine,
  },

  scrollContent: {
    paddingBottom: spacing.xxl,
  },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.wineMedium,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },

  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    borderWidth: 2,
    borderColor: colors.wineLight,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "800",
  },

  headerTexts: {
    flex: 1,
  },

  headerTitle: {
    ...typography.title,
    color: colors.cream,
    fontSize: 22,
  },

  headerSubtitle: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.7,
    marginTop: 2,
    lineHeight: 18,
  },

  headerAction: {
    minWidth: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.terracotta,
    alignItems: "center",
    justifyContent: "center",
  },

  headerActionText: {
    ...typography.caption,
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },

  heroCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.creamDark,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  heroIconWrap: {
    width: 58,
    height: 58,
    borderRadius: radius.md,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.wineDark,
  },

  heroIcon: {
    fontSize: 28,
  },

  heroTexts: {
    flex: 1,
  },

  heroTitle: {
    ...typography.subtitle,
    color: colors.wineMedium,
    marginBottom: 4,
  },

  heroDescription: {
    ...typography.body,
    color: colors.creamTextSecondary,
    lineHeight: 18,
  },

  calendarCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.cardBg,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.wineLight,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  calendarMonth: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 18,
  },

  calendarNavButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.wineLight,
  },

  calendarNavText: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "800",
  },

  weekRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
    gap: CALENDAR_GAP,
  },

  weekDay: {
    width: CALENDAR_COLUMN_WIDTH,
    textAlign: "center",
    ...typography.label,
    color: colors.cream,
    opacity: 0.6,
    fontSize: 10,
    textTransform: "uppercase",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CALENDAR_GAP,
    justifyContent: "center",
  },

  dayCell: {
    width: CALENDAR_COLUMN_WIDTH,
    minHeight: 58,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  dayCellInactive: {
    opacity: 0.32,
  },

  dayCellToday: {
    borderColor: colors.terracottaLight,
    backgroundColor: "rgba(212, 98, 58, 0.18)",
  },

  dayCellSelected: {
    backgroundColor: colors.cream,
    borderColor: colors.cream,
  },

  dayNumber: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 14,
  },

  dayNumberSelected: {
    color: colors.wine,
  },

  dayDotRow: {
    flexDirection: "row",
    gap: 3,
    marginTop: 5,
    minHeight: 6,
  },

  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.terracottaLight,
  },

  dayDotMore: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.cream,
    opacity: 0.8,
  },

  agendaSection: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },

  agendaHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  agendaTitle: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 16,
  },

  agendaCount: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.6,
  },

  emptyState: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.wineLight,
  },

  emptyEmoji: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },

  emptyTitle: {
    ...typography.subtitle,
    color: colors.cream,
    marginBottom: 4,
  },

  emptyText: {
    ...typography.body,
    color: colors.cream,
    textAlign: "center",
    opacity: 0.75,
    lineHeight: 20,
  },

  appointmentList: {
    gap: spacing.sm,
  },

  appointmentCard: {
    backgroundColor: colors.cream,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  appointmentCardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  appointmentTitleBlock: {
    flex: 1,
  },

  appointmentTitle: {
    ...typography.subtitle,
    color: colors.wineMedium,
    fontSize: 15,
  },

  appointmentSubtitle: {
    ...typography.body,
    color: colors.creamTextSecondary,
    marginTop: 2,
  },

  appointmentMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: spacing.sm,
  },

  metaPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    backgroundColor: "rgba(123,30,46,0.08)",
  },

  metaPillText: {
    ...typography.caption,
    color: colors.wineMedium,
    fontSize: 10,
    fontWeight: "800",
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },

  statusScheduled: {
    backgroundColor: "rgba(76, 175, 125, 0.16)",
  },

  statusDone: {
    backgroundColor: "rgba(90, 21, 32, 0.14)",
  },

  statusCanceled: {
    backgroundColor: "rgba(255, 107, 107, 0.16)",
  },

  statusText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: "800",
  },

  statusTextScheduled: {
    color: colors.greenOk,
  },

  statusTextDone: {
    color: colors.wineMedium,
  },

  statusTextCanceled: {
    color: colors.statusError,
  },

  appointmentActions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  appointmentActionButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },

  appointmentActionPrimary: {
    backgroundColor: colors.wine,
    borderColor: colors.wine,
  },

  appointmentActionSecondary: {
    backgroundColor: "transparent",
    borderColor: colors.wineLight,
  },

  appointmentActionDanger: {
    backgroundColor: colors.statusError,
    borderColor: colors.statusError,
  },

  appointmentActionTextPrimary: {
    ...typography.caption,
    color: colors.cream,
    fontSize: 11,
    fontWeight: "800",
  },

  appointmentActionTextSecondary: {
    ...typography.caption,
    color: colors.wine,
    fontSize: 11,
    fontWeight: "800",
  },

  appointmentActionTextDanger: {
    ...typography.caption,
    color: colors.white,
    fontSize: 11,
    fontWeight: "800",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: spacing.md,
    justifyContent: "center",
  },

  modalCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.wineLight,
    maxHeight: "92%",
  },

  modalScrollContent: {
    paddingBottom: spacing.sm,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  modalTitle: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 18,
    flex: 1,
  },

  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.wine,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.wineLight,
  },

  modalCloseText: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "800",
  },

  modalSection: {
    marginBottom: spacing.md,
  },

  modalSectionTitle: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.7,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
  },

  modalInput: {
    minHeight: 46,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    backgroundColor: colors.cream,
    color: colors.wineMedium,
    borderWidth: 1.5,
    borderColor: colors.creamDark,
    ...typography.body,
  },

  petChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },

  petChip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.wineMedium,
    borderWidth: 1.5,
    borderColor: colors.wineLight,
  },

  petChipActive: {
    backgroundColor: colors.cream,
    borderColor: colors.cream,
  },

  petChipText: {
    ...typography.caption,
    color: colors.cream,
    fontSize: 11,
    fontWeight: "800",
  },

  petChipTextActive: {
    color: colors.wine,
  },

  formHint: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.55,
    marginTop: spacing.xs,
    lineHeight: 17,
  },

  linkButton: {
    alignSelf: "flex-start",
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.cream,
    backgroundColor: "rgba(245,236,215,0.08)",
  },

  linkButtonText: {
    ...typography.caption,
    color: colors.cream,
    fontSize: 11,
    fontWeight: "800",
  },

  modalButtonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },

  saveButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.terracotta,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    ...typography.subtitle,
    color: colors.white,
    fontSize: 14,
  },

  cancelButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.wineLight,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 14,
  },

  successCard: {
    backgroundColor: colors.wine,
    borderColor: colors.wineLight,
  },

  successTitle: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 18,
    textAlign: "center",
    marginBottom: spacing.xs,
  },

  successText: {
    ...typography.body,
    color: colors.cream,
    textAlign: "center",
    lineHeight: 21,
  },
});
