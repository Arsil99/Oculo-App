/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import AIcon from "react-native-vector-icons/AntDesign";
import IIcon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { BaseColors, BaseStyles, FontFamily } from "@config/theme";

export default function BottomTabBar({ state, descriptors, navigation }) {
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(tabWidth * 2 - 7));
  const homeAnimRef = useRef();
  const eventAnimRef = useRef();
  const notifyAnimRef = useRef();
  const profileAnimRef = useRef();
  /* All events in bottombar are hendle here it means when user change screen it will be store in redux */

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIcons = (label, isFocused, index) => {
    const tabIconColor = isFocused ? BaseColors.primary : BaseColors.msgColor;
    switch (label) {
      case "HomeStackNavigator":
        return (
          <Animatable.View
            useNativeDriver
            ref={homeAnimRef}
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : "#585858",
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              <AIcon size={26} color={tabIconColor} name="home" />
            </Text>
          </Animatable.View>
        );
      case "EventsStackNavigator":
        return (
          <Animatable.View
            useNativeDriver
            ref={eventAnimRef}
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : "#585858",
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              <AIcon size={26} color={tabIconColor} name="calendar" />
            </Text>
          </Animatable.View>
        );
      case "NotificationStackNavigator":
        return (
          <Animatable.View
            useNativeDriver
            ref={notifyAnimRef}
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : "#585858",
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              <IIcon
                size={26}
                color={tabIconColor}
                name="notifications-outline"
              />
            </Text>
          </Animatable.View>
        );

      case "ProfileStackNavigator":
        return (
          <Animatable.View
            useNativeDriver
            ref={profileAnimRef}
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : "#585858",
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              <View>
                <AIcon size={26} color={tabIconColor} name="user" />
              </View>
            </Text>
          </Animatable.View>
        );
    }
  };
  const getIconsName = (label, isFocused) => {
    switch (label) {
      case "HomeStackNavigator":
        return "Home";
      case "EventsStackNavigator":
        return "Event";
      case "NotificationStackNavigator":
        return "Notification";
      case "ProfileStackNavigator":
        return "Profile";
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [
              {
                translateX: translateValue,
              },
            ],
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <View style={styles.roundViewStyle} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          if (index === 0) {
            homeAnimRef.current.swing(1000);
          }
          if (index === 1) {
            eventAnimRef.current.swing(1000);
          }
          if (index === 2) {
            notifyAnimRef.current.swing(1000);
          }
          if (index === 3) {
            profileAnimRef.current.swing(1000);
          }
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              paddingBottom: 10,
              FontFamily: FontFamily.bold,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: BaseColors.white,
              borderTopColor: BaseColors.borderColor,
              paddingTop: 5,
              borderTopWidth: 0.5,
              zIndex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: BaseColors.white,
              }}
            >
              {getIcons(label, isFocused, index)}
            </View>
            <Text
              style={{
                color: isFocused ? BaseColors.primary : BaseColors.msgColor,
                fontFamily: FontFamily.bold,
                fontSize: 11,
                marginVertical: 3,
              }}
            >
              {getIconsName(label, isFocused)}
            </Text>
          </TouchableOpacity>
        );
      })}
      <View
        style={{
          zIndex: 0,
          position: "absolute",
          bottom: 0,
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: "row",
    backgroundColor: BaseColors.whiteSmoke,
    textAlign: "center",
    ...BaseStyles.shadow,
  },
  iconContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  tabName: {
    color: BaseColors.backRed,
    fontSize: 15,
  },
});
