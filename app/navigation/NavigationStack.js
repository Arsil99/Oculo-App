/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useReducer, useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EventRegister } from 'react-native-event-listeners';
import SplashScreen from '@screens/SplashScreen';
import { NotificationContext, NoInternet } from '@components';
import RemotePushController from '@components/Common/RemotePushController';
import notificationReducer from '@redux/reducers/notificationReducer';
import { store } from '@redux/store/configureStore';
import AuthAction from '@redux/reducers/auth/actions';
import { BaseColors, DarkBaseColor } from '@config/theme';
import { navigationRef } from './NavigationService';
import Home from '@screens/Home';
import Events from '@screens/Events';
import Notification from '@screens/Notification';
import Profile from '@screens/Profile';
import BottomTabBar from './BottomTabBar';
import Login from '@screens/Login';
import ResetPassword from '@screens/ResetPassword';
import ForgetPassword from '@screens/ForgetPassword';
import OTP from '@screens/OTP';
import EventDetails from '@screens/EventDetails';
import Dashboard from '@screens/Dashboard';
import PrivacyPolicy from '@screens/PrivacyPolicy';
import TermsofServices from '@screens/TermsofServices';
import NotificationSettings from '@screens/NotificationSettings';
import Callibration from '@screens/Callibration';

const intitialNotificationState = {
  notification: null,
  openedNotification: null,
  countOfNotification: 0,
};
const IOS = Platform.OS === 'ios';

function App() {
  const dispatch = useDispatch();
  const { setBaseColor, setDarkmode } = AuthAction;

  const [Notifystate, dispatchState] = useReducer(
    notificationReducer,
    intitialNotificationState,
  );
  const notiValue = useMemo(() => {
    return { Notifystate, dispatchState };
  }, [Notifystate, dispatchState]);

  const darkmode = store.getState().auth.darkmode;

  if (darkmode === false) {
    dispatch(setBaseColor(BaseColors));
  } else {
    dispatch(setBaseColor(DarkBaseColor));
  }

  const [darkApp, setdarkApp] = useState(darkmode);

  useEffect(() => {
    const eventListener = EventRegister.addEventListener(
      'changeAppTheme',
      data => {
        setdarkApp(data);
        dispatch(setDarkmode(data));
      },
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...BaseColors,
    },
  };

  const appTheme = lightTheme;

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const HomeStack = createStackNavigator();
  const EventsStack = createStackNavigator();
  const NotificationStack = createStackNavigator();
  const ProfileStack = createStackNavigator();

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator
        detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  };

  const EventsStackNavigator = () => {
    return (
      <EventsStack.Navigator
        detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <EventsStack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
      </EventsStack.Navigator>
    );
  };

  const NotificationStackNavigator = () => {
    return (
      <NotificationStack.Navigator
        detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <NotificationStack.Screen
          name="Events"
          component={Notification}
          options={{ headerShown: false }}
        />
      </NotificationStack.Navigator>
    );
  };

  const ProfileStackNavigator = () => {
    return (
      <ProfileStack.Navigator
        detachInactiveScreens={IOS ? true : false}
        screenOptions={{ animationEnabled: false }}
      >
        <ProfileStack.Screen
          name="Events"
          component={Profile}
          options={{ headerShown: false }}
        />
      </ProfileStack.Navigator>
    );
  };

  const BottomTabsNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={'HomeStackNavigator'}
        tabBar={props => <BottomTabBar {...props} />}
      >
        <Tab.Screen
          name="HomeStackNavigator"
          component={HomeStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Tab.Screen
          name="EventsStackNavigator"
          component={EventsStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Tab.Screen
          name="NotificationStackNavigator"
          component={NotificationStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Tab.Screen
          name="ProfileStackNavigator"
          component={ProfileStackNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NotificationContext.Provider value={notiValue}>
      <RemotePushController />
      <NavigationContainer ref={navigationRef} theme={appTheme}>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          detachInactiveScreens={IOS ? true : false}
          screenOptions={{
            animationEnabled: true,
            gestureEnabled: IOS ? true : false,
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TermsofServices"
            component={TermsofServices}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Callibration"
            component={Callibration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationContext.Provider>
  );
}

export default App;
