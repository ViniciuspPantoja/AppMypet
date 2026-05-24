import { StyleSheet } from "react-native";

const exploreStyles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  titleMono: {
    fontFamily: "monospace",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});

export default exploreStyles;
