import { StyleSheet } from "react-native";
import { BaseColors, FontFamily } from "@config/theme";

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BaseColors.white,
    alignItems: "center",
  },
  topBar: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  title: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 20,
    color: BaseColors.primary,
  },
  welcomeText: {
    fontSize: 16,
  },
  summaryArea: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    justifyContent: "center",
    alignItems: "center",
  },
  descText: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 17,
  },
  requestBtn: {
    marginTop: 15,
    width: "80%",
  },
  detailsArea: {
    flex: 1,
    width: "100%",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BaseColors.lightBg,
  },
});
