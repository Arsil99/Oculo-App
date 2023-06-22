import { Dimensions, Platform, StyleSheet } from "react-native";
import { BaseColors, FontFamily } from "@config/theme";

const IOS = Platform.OS === "ios";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
  },
  contentView: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  inputcontainer: {
    flex: 0.4,
    justifyContent: "flex-start",
  },
  forgotPasswordTextStyle: {
    fontSize: 17,
    marginTop: 10,
    color: BaseColors.primary,
  },
  sendemail: {
    height: 55,
    width: "100%",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  img: {
    marginTop: 30,
    height: 55,
  },
});
