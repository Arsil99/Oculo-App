import { BaseColors } from "@config/theme";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  main: {
    backgroundColor: BaseColors.lightBg,
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: BaseColors.textColor,
  },

  underlineStyleBase: {
    width: 40,
    height: 40,
    borderWidth: 0,
    borderWidth: 1,
    borderColor: BaseColors.primary,
    color: BaseColors.textColor,
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: BaseColors.textColor,
    borderWidth: 2,
  },
  otpBtn: {
    marginTop: 15,
  },
});
export default styles;
