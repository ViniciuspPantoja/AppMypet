import { signupStyles } from "@/app/styles/signup.styles.user";
import React from "react";
import { Text, View } from "react-native";

export type StatusType = "success" | "error" | "warning";

interface StatusMessageProps {
  type: StatusType;
  message: string;
  visible?: boolean;
}

/**
 * Componente de mensagem de status (sucesso, erro, aviso)
 */
export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  visible = true,
}) => {
  if (!visible || !message) return null;

  const statusStyles = {
    success: [signupStyles.statusContainer, signupStyles.statusSuccess],
    error: [signupStyles.statusContainer, signupStyles.statusError],
    warning: [signupStyles.statusContainer, signupStyles.statusWarning],
  };

  const textStyles = {
    success: [
      signupStyles.statusMessageText,
      signupStyles.statusMessageTextSuccess,
    ],
    error: [
      signupStyles.statusMessageText,
      signupStyles.statusMessageTextError,
    ],
    warning: [
      signupStyles.statusMessageText,
      signupStyles.statusMessageTextWarning,
    ],
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
  };

  return (
    <View style={statusStyles[type]}>
      <Text style={textStyles[type]}>{icons[type]}</Text>
      <Text style={textStyles[type]}>{message}</Text>
    </View>
  );
};
