import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "./tokens/tokens";

export const formInputStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: spacing.sm,
  },

  inputRow: {
    width: "100%",
    minHeight: 52,
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.creamDark,
    flexDirection: "row",
    alignItems: "center",
  },

  inputRowFocused: {
    borderColor: colors.terracotta,
    borderWidth: 2,
  },

  inputRowWithError: {
    borderColor: colors.statusError,
    borderWidth: 2,
  },

  label: {
    ...typography.caption,
    color: colors.cream,
    opacity: 0.85,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },

  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    color: colors.wine,
  },

  inputWithAccessory: {
    paddingRight: spacing.sm,
  },

  rightAccessory: {
    paddingRight: spacing.md,
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
