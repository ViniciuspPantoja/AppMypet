import { statusMessageStyles } from "@/app/styles/status-message.styles";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

export type StatusType = "success" | "error" | "warning";

interface StatusMessageProps {
  type: StatusType;
  message: string;
  visible?: boolean;
  onDismiss?: () => void;
}

/**
 * Componente de mensagem de status (sucesso, erro, aviso)
 */
export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  message,
  visible = true,
  onDismiss,
}) => {
  if (!visible || !message) return null;

  const statusStyles = {
    success: statusMessageStyles.iconSuccess,
    error: statusMessageStyles.iconError,
    warning: statusMessageStyles.iconWarning,
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={statusMessageStyles.backdrop}>
        <View style={statusMessageStyles.card}>
          <Text style={[statusMessageStyles.icon, statusStyles[type]]}>
            {icons[type]}
          </Text>
          <Text style={statusMessageStyles.message}>{message}</Text>
          <Pressable
            style={statusMessageStyles.button}
            onPress={onDismiss}
            disabled={!onDismiss}
          >
            <Text style={statusMessageStyles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
