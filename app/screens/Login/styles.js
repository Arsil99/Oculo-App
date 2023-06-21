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
    marginTop: 10,
    marginBottom: 30,
    color: BaseColors.primary,
  },
  signinbutton: {
    height: 55,
    width: "100%",
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  img: {
    marginTop: 30,
    height: 55,
  },
  socialBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BaseColors.backgroundPlaceholder,
    marginBottom: 8,
    paddingVertical: 8,
    borderRadius: 5,
  },
});
