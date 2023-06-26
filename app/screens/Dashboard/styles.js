import { BaseColors, FontFamily } from "@config/theme";
import { StyleSheet, Text, View } from "react-native";

export default StyleSheet.create({
  imageView: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headtext: {
    fontSize: 24,
    marginTop: 10,
    lineHeight: 32,
    fontWeight: "700",
    fontFamily: BaseColors.bold,
    color: BaseColors.textColor,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: BaseColors.regular,
    color: BaseColors.textColor,
    textAlign: "center",
  },
  lighttext: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "300",
    fontFamily: FontFamily.light,
    color: BaseColors.textColor,
    textAlign: "center",
  },
  number: {
    fontSize: 20,
    marginTop: 10,
    lineHeight: 30,
    fontWeight: "700",
    fontFamily: BaseColors.bold,

    textAlign: "center",
  },
  round: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
  box: { flexDirection: "row", alignItems: "center" },
  btnIn: { paddingHorizontal: 15, width: 150 },
  label: {
    marginLeft: 15,
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
  },
  month: {
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  label1: {
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
  },
  prize: {
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
    textAlign: "right",
  },
  labelval: {
    marginLeft: 15,
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  labelval1: {
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.black90,
  },
  button: {
    paddingVertical: 10,
    marginTop: 20,
  },
  expiry: {
    fontSize: 12,
    flexGrow: 1,
    fontFamily: FontFamily.semiBold,
    color: BaseColors.white,
    padding: 4,
    borderRadius: 4,
    backgroundColor: BaseColors.primary,
  },
});
