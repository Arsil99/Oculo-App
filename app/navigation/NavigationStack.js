/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useReducer, useEffect} from 'react';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import {EventRegister} from 'react-native-event-listeners';
import SplashScreen from '@screens/SplashScreen';
import {NotificationContext, NoInternet} from '@components';
import RemotePushController from '@components/Common/RemotePushController';
import notificationReducer from '@redux/reducers/notificationReducer';
import {store} from '@redux/store/configureStore';
import AuthAction from '@redux/reducers/auth/actions';
import {BaseColors, DarkBaseColor} from '@config/theme';
import {navigationRef} from './NavigationService';
// import BottomTabBar from './BottomTabBar';

const intitialNotificationState = {
  notification: null,
  openedNotification: null,
  countOfNotification: 0,
};
const IOS = Platform.OS === 'ios';

function App() {
  const dispatch = useDispatch();
  const {setBaseColor, setDarkmode, setActiveScreen} = AuthAction;

  const [Notifystate, dispatchState] = useReducer(
    notificationReducer,
    intitialNotificationState,
  );
  const notiValue = useMemo(() => {
    return {Notifystate, dispatchState};
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
  console.log('app theme ====>>>>> ', appTheme);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // const BottomTabsNavigator = () => {
  //   return (
  //     <Tab.Navigator
  //       initialRouteName={'Home'}
  //       tabBar={props => <BottomTabBar {...props} />}>
  //       <Tab.Screen name="Mission" component={MissionsLog} />
  //       <Tab.Screen name="Chat" component={Chat} />
  //       <Tab.Screen name="Home" component={Home} />
  //       <Tab.Screen name="Helpdesk" component={Helpdesk} />
  //       <Tab.Screen name="Account" component={Account} />
  //     </Tab.Navigator>
  //   );
  // };

  return (
    <NotificationContext.Provider value={notiValue}>
      <RemotePushController />
      <NavigationContainer
        ref={navigationRef}
        theme={appTheme}
        // onStateChange={async (state) => {
        //   console.log(
        //     '🚀 ~ file: NavigationStack.js ~ line 438 ~ App ~ state',
        //     state,
        //   );
        //   const currentRouteName = await getActiveRouteName(state);
        //   console.log(
        //     '🚀 ~ file: NavigationStack.js ~ line 443 ~ App ~ currentRouteName',
        //     currentRouteName,
        //   );
        //   if (!isEmpty(currentRouteName)) {
        //     dispatch(setActiveScreen(currentRouteName));
        //   }
        // }}
      >
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          detachInactiveScreens={IOS ? true : false}
          screenOptions={{
            animationEnabled: true,
            gestureEnabled: IOS ? true : false,
          }}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false, animationEnabled: false}}
          />
          {/* <Stack.Screen
            name="Intro"
            component={Intro}
            options={{
              headerShown: false,
              animationEnabled: false,
              gestureEnabled: false,
            }}
          /> */}
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
        {/* <NoInternet /> */}
      </NavigationContainer>
    </NotificationContext.Provider>
  );
}

export default App;
