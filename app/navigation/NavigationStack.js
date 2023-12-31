/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useReducer, useEffect } from 'react';
import { Platform, Text, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import CallibrationStart from '@screens/Callibration/start';
import Symptoms from '@screens/Symptoms';
import Assessment from '@screens/Assessment';
import ChangeInfo from '@screens/ChangeInfo';
import ImmediateRecall from '@screens/ImmediateRecall';
import TwofactorEnabled from '@screens/TwofactorEnabled';
import VoiceInput from '@screens/VoiceInput';
import Wordlist from '@screens/Wordlist';
import DigitalRecall from '@screens/DigitalRecall';
import Recalldigits from '@screens/Recalldigits';
import FaceidEnabled from '@screens/FaceidEnabled';
import ImmediateRecallmain from '@screens/ImmediateRecallmain';
import Comment from '@screens/Comment';
import AuthenticationFactor from '@screens/Authentication';
import Symptom from '@screens/Symptom';
import Instructions from '@screens/Callibration/instructions';
import Success from '@screens/Callibration/success';
import _ from 'lodash';
import moment from 'moment';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';

const intitialNotificationState = {
  notification: null,
  openedNotification: null,
  countOfNotification: 0,
};
const IOS = Platform.OS === 'ios';

// Remove font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
// DatePicker.defaultProps = DatePicker.defaultProps || {};
// DatePicker.defaultProps.allowFontScaling = false;

function App() {
  const dispatch = useDispatch();
  const {
    setBaseColor,
    setDarkmode,
    setUserData,
    setRefreshTokenExpire,
    setAccessToken,
  } = AuthAction;

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
    const { userData, accessToken, refreshTokenExpire } = useSelector(
      state => state.auth,
    );

    const ref_roken = !_.isEmpty(userData)
      ? userData.refresh_token_expired_at
      : '';
    console.log('this : ', userData);
    const todaysDate = moment().format();
    console.log('ref. ', ref_roken);
    if (ref_roken !== '' && !_.isUndefined(ref_roken)) {
      const current_tm = new Date(todaysDate);
      const expired_on = new Date(ref_roken);
      console.log('current ====>>> ', current_tm);
      console.log('expired ====>>> ', expired_on);
      console.log('refreshTokenExpire ====>>> ', ref_roken);
      console.log('uData ====>>> ', userData);
      if (current_tm > expired_on && !_.isEmpty(accessToken)) {
        RefreshTokenApiCall();
      }
    }
    async function RefreshTokenApiCall() {
      let endPoint = BaseSetting.endpoints.refreshToken;

      try {
        const data = { refreshToken: JSON.stringify(userData) };
        const response = await getApiData(endPoint, 'POST', data, {}, false);
        console.log('RESP API : ', JSON.stringify(response));
        if (response?.status) {
          console.log(
            'RESPINSE NAV >>>  : ',
            JSON.stringify(response?.data?.userData),
          );
          // setRefreshToken(response?.data?.refresh_token_expired_at);
          dispatch(setAccessToken(response?.data?.auth_token));
          dispatch(setRefreshTokenExpire(response?.refresh_token_expired_at));
          const dataBundle = {
            ...response?.data?.userData?.personal_info,
            refresh_token_expired_at: response?.data?.refresh_token_expired_at,
          };
          dispatch(setUserData(dataBundle));
        }
      } catch (error) {
        console.log('response ~ RefreshTokenApiCall', error);
      }
    }
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
            name="CalibrationInstruction"
            component={Instructions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Callibration"
            component={Callibration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CallibrationStart"
            component={CallibrationStart}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="CallibrationSuccess"
            component={Success}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Symptom"
            component={Symptom}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Symptoms"
            component={Symptoms}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Assessment"
            component={Assessment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangeInfo"
            component={ChangeInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TwofactorEnabled"
            component={TwofactorEnabled}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImmediateRecall"
            component={ImmediateRecall}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wordlist"
            component={Wordlist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DigitalRecall"
            component={DigitalRecall}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Recalldigits"
            component={Recalldigits}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FaceidEnabled"
            component={FaceidEnabled}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImmediateRecallmain"
            component={ImmediateRecallmain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VoiceInput"
            component={VoiceInput}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Comment"
            component={Comment}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AuthenticationFactor"
            component={AuthenticationFactor}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationContext.Provider>
  );
}

export default App;
