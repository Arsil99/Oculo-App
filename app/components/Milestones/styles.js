import { Dimensions, Platform, StyleSheet } from "react-native";
import { BaseColors, FontFamily } from "@config/theme";

const nWidth = Dimensions.get("screen").width;
const IOS = Platform.OS === "ios";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  companynameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  HomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  HomesubContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  scrollcontainer: {
    flexGrow: 1,
    backgroundColor: BaseColors.white,
  },
  topcontainer: {
    marginTop: 25,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  home: {
    fontFamily: FontFamily.roRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: BaseColors.secondary,
    marginRight: 5,
  },
  imagecontainer: { paddingVertical: 10, alignItems: "center" },
  flatlistcontainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 250,
    elevation: 4,
    borderBottomLeftRadius: 8,
    backgroundColor: BaseColors.white,
  },
  ScopeTxt: {
    fontFamily: FontFamily.roRegular,
    fontWeight: "400",
    fontSize: 16,
    color: BaseColors.secondary,
    lineHeight: 24,
    marginBottom: 10,
  },
  mainTxt: {
    fontFamily: FontFamily.roRegular,
    fontSize: 14,
    color: BaseColors.secondary,
    lineHeight: 20,
    fontWeight: "400",
  },
  Maintitle: {
    fontFamily: FontFamily.regular,
    fontSize: 21,
    color: BaseColors.secondary,
    lineHeight: 30,
    fontWeight: "600",
    marginRight: 5,
    marginLeft: 10,
  },
  homesubtitle: {
    fontFamily: FontFamily.roRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: BaseColors.secondary,
  },
  img: { width: 33, height: 31 },
  divider: {
    backgroundColor: BaseColors.lgrey,
    height: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  button1: {
    backgroundColor: BaseColors.lgrey,
    maxWidth: 100,
    padding: 8,
    alignItems: "center",
    borderRadius: 5,
  },
  seeTxt: {
    color: BaseColors.primary,
    fontFamily: FontFamily.roRegular,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: "contain",
    borderRadius: 10,
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  renocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  text: {
    fontFamily: FontFamily.roRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    color: BaseColors.secondary,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
