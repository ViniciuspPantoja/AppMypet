import { Dimensions, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../styles/tokens/tokens";

const { width } = Dimensions.get("window");

export const signupStyles = StyleSheet.create({
  // ── Tela ────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: colors.wine,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  // ── Card ────────────────────────────────────────────────────
  card: {
    width: "100%",
    backgroundColor: colors.cardBg,
    borderRadius: radius.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderWidth: 1.5,
    borderColor: colors.wineLight,
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
    alignItems: "center",
  },

  // ── Ícone topo ──────────────────────────────────────────────
  appIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    borderWidth: 4,
    borderColor: colors.terracotta,
    shadowColor: colors.terracottaDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  appIcon: {
    fontSize: 38,
  },

  // ── Títulos ─────────────────────────────────────────────────
  title: {
    ...typography.title,
    color: colors.cream,
    textAlign: "center",
    marginBottom: spacing.xs,
    fontSize: 26,
  },

  subtitle: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.6,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },

  // ── Seções do formulário ─────────────────────────────────────
  formSection: {
    width: "100%",
    backgroundColor: colors.wineMedium,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.wineLight,
  },

  // ── Inputs (wrapper para FormInput) ─────────────────────────
  inputWrapper: {
    width: "100%",
    marginBottom: spacing.md,
  },

  inputLabel: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.75,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },

  input: {
    width: "100%",
    minHeight: 56,
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.wine,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  inputError: {
    borderColor: colors.statusError,
    borderWidth: 2,
  },

  inputHint: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.45,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    fontSize: 10,
  },

  inputErrorText: {
    ...typography.caption,
    color: colors.statusError,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    fontSize: 11,
  },

  // ── Divisor entre seções ─────────────────────────────────────
  sectionDivider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  sectionDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.wineLight,
    opacity: 0.5,
  },

  sectionDividerIcon: {
    fontSize: 12,
    opacity: 0.4,
  },

  // ── Status message ───────────────────────────────────────────
  statusWrapper: {
    width: "100%",
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1.5,
  },

  statusSuccess: {
    backgroundColor: "#1A3D2B",
    borderColor: colors.greenOk,
  },

  statusError: {
    backgroundColor: "#3D1A1A",
    borderColor: colors.statusError,
  },

  statusText: {
    ...typography.body,
    fontSize: 13,
    textAlign: "center",
  },

  statusTextSuccess: {
    color: "#6BCB77",
  },

  statusTextError: {
    color: "#FF6B6B",
  },

  // ── Botões ──────────────────────────────────────────────────
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
    marginTop: spacing.md,
  },

  primaryButton: {
    flex: 1,
    height: 54,
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },

  primaryButtonDisabled: {
    opacity: 0.45,
  },

  primaryButtonText: {
    ...typography.subtitle,
    color: colors.wine,
    fontSize: 15,
  },

  secondaryButton: {
    flex: 1,
    height: 54,
    backgroundColor: "transparent",
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    ...typography.subtitle,
    color: colors.cream,
    fontSize: 15,
  },

  // ── Rodapé ───────────────────────────────────────────────────
  footer: {
    marginTop: spacing.lg,
    alignItems: "center",
  },

  footerText: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.4,
    textAlign: "center",
    maxWidth: width * 0.7,
    lineHeight: 16,
  },
});
