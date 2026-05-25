import { formInputStyles } from "@/app/styles/form-input.styles";
import { colors } from "@/app/styles/tokens/tokens";
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  touched?: boolean;
  rightAccessory?: React.ReactNode;
}

export const FormInput = React.forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      error,
      hint,
      touched,
      style,
      onFocus,
      onBlur,
      rightAccessory,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus: NonNullable<TextInputProps["onFocus"]> = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: NonNullable<TextInputProps["onBlur"]> = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const hasError = touched && !!error;

    return (
      <View style={formInputStyles.wrapper}>
        {label && <Text style={formInputStyles.label}>{label}</Text>}

        <View
          style={[
            formInputStyles.inputRow,
            isFocused && !hasError && formInputStyles.inputRowFocused,
            hasError && formInputStyles.inputRowWithError,
          ]}
        >
          <TextInput
            ref={ref}
            style={[
              formInputStyles.input,
              style,
              rightAccessory && formInputStyles.inputWithAccessory,
            ]}
            placeholderTextColor={colors.textHint}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {rightAccessory && (
            <View style={formInputStyles.rightAccessory}>{rightAccessory}</View>
          )}
        </View>

        {hasError && <Text style={formInputStyles.fieldError}>{error}</Text>}

        {hint && !hasError && (
          <Text style={formInputStyles.hintText}>{hint}</Text>
        )}
      </View>
    );
  },
);

FormInput.displayName = "FormInput";
