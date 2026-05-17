import { signupStyles } from "@/app/styles/signup.styles.user";
import React, { useState } from "react";
import {
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    View,
} from "react-native";

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  touched?: boolean;
}

/**
 * Componente de input reutilizável com suporte a erro e label
 */
export const FormInput = React.forwardRef<TextInput, FormInputProps>(
  ({ label, error, hint, touched, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={{ marginBottom: error ? 14 : 14 }}>
        {label && <Text style={signupStyles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[
            signupStyles.input,
            touched && error && signupStyles.inputWithError,
            isFocused && !error && signupStyles.input,
            style,
          ]}
          placeholderTextColor="#B08860"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {touched && error && (
          <Text style={signupStyles.fieldError}>{error}</Text>
        )}
        {hint && !error && <Text style={signupStyles.hintText}>{hint}</Text>}
      </View>
    );
  },
);

FormInput.displayName = "FormInput";
