import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

const stockColors = {
  bg: "#0F2D23",
  bgCard: "#F5ECD7",
  bgHeader: "#1A3D2E",
  accentWarm: "#D4623A",
  textDark: "#1A3D2E",
  textMuted: "#5A8A6A",
};

export const estoqueStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: stockColors.bg,
  },

  header: {
    backgroundColor: stockColors.bgHeader,
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
    color: stockColors.bgCard,
    fontWeight: "700",
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 22,
  },

  headerTitle: {
    ...typography.title,
    color: stockColors.bgCard,
    fontSize: 20,
  },

  actionSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },

  addButton: {
    backgroundColor: stockColors.accentWarm,
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

  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  sectionTitle: {
    ...typography.label,
    color: stockColors.bgCard,
    opacity: 0.55,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },

  itemCard: {
    backgroundColor: stockColors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  itemName: {
    ...typography.subtitle,
    color: stockColors.textDark,
    fontSize: 15,
  },

  itemMeta: {
    ...typography.caption,
    color: stockColors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },

  itemQty: {
    ...typography.caption,
    color: stockColors.textMuted,
    fontWeight: "700",
    fontSize: 14,
  },

  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },

  statusBadgeText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 11,
  },

  itemDetails: {
    gap: 6,
  },

  itemDetailText: {
    ...typography.body,
    color: stockColors.textDark,
    fontSize: 13,
  },

  itemDetailTextMuted: {
    ...typography.body,
    color: stockColors.textMuted,
    fontSize: 13,
  },

  itemDetailHighlight: {
    ...typography.subtitle,
    color: stockColors.accentWarm,
    fontSize: 13,
  },

  // Modais
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
    overflow: "hidden",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  modalSubtitle: {
    ...typography.body,
    color: stockColors.textMuted,
    marginBottom: 12,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: "rgba(26,61,46,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  closeButtonText: {
    color: stockColors.textDark,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
  },

  modalBody: {
    maxHeight: 520,
  },

  modalBodyContent: {
    paddingBottom: 8,
  },

  fieldGroup: {
    marginBottom: 10,
  },

  fieldGroupLabel: {
    ...typography.label,
    color: stockColors.textDark,
    marginBottom: 6,
  },

  fieldRow: {
    flexDirection: "row",
    gap: 10,
  },

  fieldFlex: {
    flex: 1,
  },

  unitPicker: {
    flex: 1,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  petChipsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: "rgba(26,61,46,0.08)",
    borderWidth: 1,
    borderColor: "rgba(26,61,46,0.12)",
  },

  chipActive: {
    backgroundColor: stockColors.bgHeader,
    borderColor: stockColors.bgHeader,
  },

  speciesChip: {
    minHeight: 38,
  },

  speciesChipInactive: {
    backgroundColor: "#E8E0CC",
    borderColor: "#B8AF96",
  },

  speciesChipTextInactive: {
    color: stockColors.textDark,
  },

  unitChip: {
    minWidth: 48,
    alignItems: "center",
  },

  chipText: {
    ...typography.caption,
    color: stockColors.textDark,
    fontWeight: "700",
  },

  petChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: "rgba(26,61,46,0.08)",
    borderWidth: 1,
    borderColor: "rgba(26,61,46,0.12)",
    minHeight: 48,
    justifyContent: "center",
  },

  petChipText: {
    ...typography.subtitle,
    color: stockColors.textDark,
    fontWeight: "800",
    fontSize: 13,
  },

  petChipMeta: {
    ...typography.caption,
    color: stockColors.textMuted,
    fontSize: 11,
  },

  chipTextActive: {
    color: colors.white,
  },

  draftSummary: {
    backgroundColor: "rgba(26,61,46,0.08)",
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    marginBottom: 12,
  },

  draftSummaryTitle: {
    ...typography.subtitle,
    color: stockColors.textDark,
    fontSize: 13,
    marginBottom: 4,
  },

  draftSummaryText: {
    ...typography.body,
    color: stockColors.textDark,
    fontSize: 13,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    alignItems: "center",
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

  // Empty state
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },

  emptyStateEmoji: { fontSize: 52, marginBottom: spacing.sm },

  emptyStateText: {
    ...typography.subtitle,
    color: stockColors.bgCard,
    textAlign: "center",
  },

  emptyStateSubtext: {
    ...typography.body,
    color: stockColors.bgCard,
    opacity: 0.5,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
  },
});
