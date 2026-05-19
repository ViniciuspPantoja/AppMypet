import { StyleSheet } from "react-native";

const collapsibleStyles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
});

export function getChevronStyle(isOpen: boolean) {
  return [
    collapsibleStyles.chevron,
    { transform: [{ rotate: isOpen ? "90deg" : "0deg" }] },
  ];
}

export default collapsibleStyles;
