import { StyleSheet } from "react-native";
import { BaseColors, FontFamily } from "@config/theme";

export default StyleSheet.create({
  container: {
    backgroundColor: BaseColors.white,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: BaseColors.black10,
    width: "98%",
    height: 100,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  img: { height: 25, width: 23 },
  img2: { width: 131 },
  text: {
    color: BaseColors.black90,
    fontFamily: FontFamily.regular,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
  },
  number: {
    color: BaseColors.secondary,
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 36,
    marginRight: 2,
  },
});
