import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../styles/tokens/tokens";

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
    paddingVertical: spacing.xl,
  },

  // ── Card ────────────────────────────────────────────────────
  card: {
    width: "100%",
    backgroundColor: colors.cardBg,
    borderRadius: radius.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
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
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.terracotta,
  },

  appIcon: {
    fontSize: 34,
  },

  // ── Títulos ─────────────────────────────────────────────────
  title: {
    ...typography.title,
    color: colors.cream,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...typography.body,
    color: colors.cream,
    opacity: 0.65,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },

  // ── Seções do formulário ─────────────────────────────────────
  formSection: {
    width: "100%",
    backgroundColor: colors.wineMedium,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.wineLight,
  },

  sectionTitle: {
    ...typography.label,
    color: colors.cream,
    opacity: 0.55,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
  },

  // ── Botões ──────────────────────────────────────────────────
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
    marginTop: spacing.sm,
  },

  primaryButton: {
    flex: 1,
    height: 52,
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.wineDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonDisabled: {
    opacity: 0.5,
  },

  primaryButtonText: {
    ...typography.subtitle,
    color: colors.wine,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
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
  },
});