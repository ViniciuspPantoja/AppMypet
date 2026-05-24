import { StyleSheet } from "react-native";

const HEADER_HEIGHT = 250;

export function createParallaxScrollViewStyles(
  backgroundColor: string,
  headerBackgroundColor: string,
) {
  return StyleSheet.create({
    scrollView: {
      backgroundColor,
      flex: 1,
    },
    header: {
      height: HEADER_HEIGHT,
      overflow: "hidden",
      backgroundColor: headerBackgroundColor,
    },
    content: {
      flex: 1,
      padding: 32,
      gap: 16,
      overflow: "hidden",
    },
  });
}
