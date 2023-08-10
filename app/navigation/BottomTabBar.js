/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import { BaseColors, BaseStyles, FontFamily } from '@config/theme';
import { useSelector } from 'react-redux';

export default function BottomTabBar({ state, descriptors, navigation }) {
  const { darkmode } = useSelector(state => {
    return state.auth;
  });
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(tabWidth * 2 - 7));
  const homeAnimRef = useRef();
  const eventAnimRef = useRef();
  const notifyAnimRef = useRef();
  const profileAnimRef = useRef();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const IOS = Platform.OS === 'ios';

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  /* All events in bottombar are hendle here it means when user change screen it will be store in redux */

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getIcons = (label, isFocused, index) => {
    const tabIconColor = isFocused ? BaseColors.primary : BaseColors.msgColor;
    switch (label) {
      case 'HomeStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={homeAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              {!isFocused ? (
                <AIcon size={26} color={tabIconColor} name="home" />
              ) : (
                <MIcon size={31} color={tabIconColor} name="home" />
              )}
            </Text>
          </Animatable.View>
        );
      case 'EventsStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={eventAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.regular,
                textAlign: 'center',
              }}
            >
              {!isFocused ? (
                <AIcon size={26} color={tabIconColor} name="calendar" />
              ) : (
                <FIcon size={26} color={tabIconColor} name="calendar-alt" />
              )}
            </Text>
          </Animatable.View>
        );
      case 'NotificationStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={notifyAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              {!isFocused ? (
                <IIcon
                  size={26}
                  color={tabIconColor}
                  name="notifications-outline"
                />
              ) : (
                <MCIcon size={26} color={tabIconColor} name="bell" />
              )}
            </Text>
          </Animatable.View>
        );

      case 'ProfileStackNavigator':
        return (
          <Animatable.View
            useNativeDriver
            ref={profileAnimRef}
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: isFocused ? BaseColors.primary : '#585858',
                fontSize: 12,
                fontFamily: FontFamily.regular,
              }}
            >
              <View>
                {!isFocused ? (
                  <IIcon size={26} color={tabIconColor} name="person-outline" />
                ) : (
                  <IIcon size={26} color={tabIconColor} name="person" />
                )}
              </View>
            </Text>
          </Animatable.View>
        );
    }
  };

  const getIconsName = (label, isFocused) => {
    switch (label) {
      case 'HomeStackNavigator':
        return 'Home';
      case 'EventsStackNavigator':
        return 'Event';
      case 'NotificationStackNavigator':
        return 'Notification';
      case 'ProfileStackNavigator':
        return 'Profile';
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        flexDirection: 'row',
        // display: isKeyboardOpen && !IOS ? 'none' : null,
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
            alignItems: 'center',
            justifyContent: 'center',
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
            homeAnimRef.current.zoomIn(300);
          }
          if (index === 1) {
            eventAnimRef.current.zoomIn(300);
          }
          if (index === 2) {
            notifyAnimRef.current.zoomIn(300);
          }
          if (index === 3) {
            profileAnimRef.current.zoomIn(300);
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
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: darkmode
                ? BaseColors.lightBlack
                : BaseColors.white,
              borderTopColor: BaseColors.borderColor,
              paddingTop: 5,
              borderTopWidth: 0.5,
              zIndex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: darkmode
                  ? BaseColors.lightBlack
                  : BaseColors.white,
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
          position: 'absolute',
          bottom: 0,
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    backgroundColor: BaseColors.whiteSmoke,
    textAlign: 'center',
    ...BaseStyles.shadow,
  },
  iconContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabName: {
    color: BaseColors.backRed,
    fontSize: 15,
  },
});
