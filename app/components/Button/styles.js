import BaseSetting from "@config/setting";
import { BaseColors, FontFamily } from "@config/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  default: {
    minHeight: BaseSetting.nHeight * 0.06,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    borderWidth: 0,
    backgroundColor: BaseColors.primary,
  },
  outlined: {
    backgroundColor: BaseColors.transparent,
    borderWidth: 1,
    borderColor: BaseColors.secondary,
  },
  square: {
    borderRadius: 5,
  },
  round: {
    borderRadius: 50,
  },
  DTxt: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  txtWhite: {
    color: BaseColors.white,
  },
  txtBlack: {
    color: BaseColors.secondary,
  },
});
