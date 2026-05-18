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