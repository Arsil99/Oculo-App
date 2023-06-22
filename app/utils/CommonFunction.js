import * as React from "react";
import {
  NativeModules,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import AuthAction from "@redux/reducers/auth/actions";
import { navigationRef } from "../navigation/NavigationService";
import { store } from "@redux/store/configureStore";

const { setAccessToken, setUserData } = AuthAction;

export const logout = () => {
  store.dispatch(setAccessToken(""));
  store.dispatch(setUserData({}));
  navigationRef?.current?.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

export const getDevLang = () => {
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const dvlangSplit = deviceLanguage.split("_");
  const dvlang = dvlangSplit[0].toString();

  if (dvlang == "zh") {
    return "zh-Hant";
  } else if (dvlang == "fil") {
    return "fil";
  } else {
    return "en-us";
  }
};

export function isValidPhonenumber(inputtxt) {
  let phoneno = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

export const enableAnimateInEaseOut = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const enableAnimateLinear = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
};

export const enableAnimateSpring = () => {
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
};
