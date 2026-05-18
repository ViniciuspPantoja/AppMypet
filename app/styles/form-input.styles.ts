import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

export const formInputStyles = StyleSheet.create({

  wrapper: {
    width: "100%",
    marginBottom: spacing.sm,
  },

  label: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.85,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },

  input: {
    width: "100%",
    height: 52,
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    color: colors.wine,
    borderWidth: 2,
    borderColor: colors.creamDark,
  },

  inputFocused: {
    borderColor: colors.terracotta,
    borderWidth: 2,
  },

  inputWithError: {
    borderColor: colors.statusError,
    borderWidth: 2,
  },

  fieldError: {
    ...typography.caption,
    color: colors.statusError,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    fontSize: 11,
  },

  hintText: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.45,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    fontSize: 10,
  },
});