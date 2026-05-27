import type { NotificationAlertSeverity } from "@/app/services/notifications.service";
import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

export const alertSeverityColors: Record<NotificationAlertSeverity, string> = {
  critical: colors.statusError,
  warning: colors.terracotta,
  info: colors.wine,
};

export const alertSeverityIcon: Record<NotificationAlertSeverity, string> = {
  critical: "alert-circle-outline",
  warning: "alert-outline",
  info: "information-outline",
};

export const notificationsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // ─── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: colors.wine,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(155, 46, 66, 0.55)",
    marginBottom: spacing.xl,
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
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
  headerTextWrap: {
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.cream,
    fontSize: 22,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(245, 236, 215, 0.75)",
    fontWeight: "500",
  },

  // ─── Actions Bar ──────────────────────────────────────────────
  actionsContainer: {
    marginBottom: spacing.lg,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  counter: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.wine,
    letterSpacing: 0.3,
  },
  actionsRight: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.creamDark,
    borderWidth: 1,
    borderColor: "rgba(234, 217, 188, 0.6)",
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.wine,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.wine,
    borderWidth: 1,
    borderColor: colors.wineLight,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.cream,
  },
  disabledButton: {
    opacity: 0.4,
  },

  // ─── Empty / Loading State ────────────────────────────────────
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  centerText: {
    marginTop: spacing.md,
    fontSize: 13,
    color: colors.wine,
    fontWeight: "500",
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.wine,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 13,
    textAlign: "center",
    color: colors.wineMedium,
    lineHeight: 20,
    marginHorizontal: spacing.md,
  },

  // ─── Alerts List ──────────────────────────────────────────────
  listContent: {
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  alertCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderLeftWidth: 4,
    shadowColor: "#120509",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  alertCardCritical: {
    borderColor: "rgba(180, 35, 24, 0.15)",
    borderLeftColor: colors.statusError,
  },
  alertCardWarning: {
    borderColor: "rgba(212, 98, 58, 0.15)",
    borderLeftColor: colors.terracotta,
  },
  alertCardInfo: {
    borderColor: "rgba(123, 30, 46, 0.15)",
    borderLeftColor: colors.wine,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  alertIconWrap: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(123, 30, 46, 0.08)",
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.wine,
    flex: 1,
    lineHeight: 18,
  },
  alertDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.wineMedium,
    marginLeft: spacing.xl,
  },
});
