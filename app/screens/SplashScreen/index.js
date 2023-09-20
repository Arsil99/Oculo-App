import React, { useEffect, useState } from 'react';
import styles from './styles';
import { StatusBar, View, Image, Animated } from 'react-native';
import { Images } from '@config';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authentication from '@redux/reducers/auth/actions';
import { BaseColors } from '@config/theme';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { setFcmToken } = Authentication;
  useEffect(() => {
    requestUserPermission();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      GetFcmToken();
    }
  }
  async function GetFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    console.log('oldToken => ', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('NEW Token => ', fcmToken);
          await AsyncStorage.setItem('fcmtoken', fcmToken);
          dispatch(setFcmToken(fcmToken));
        }
      } catch (error) {
        console.log('Error while get fcmtoken ===> ', error);
      }
    }
  }
  const { userData } = useSelector(state => state.auth);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
    }).start();
    setTimeout(() => {
      if (!isEmpty(userData)) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 3000);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'#0000'}
        translucent
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <Image
            source={Images.logo}
            resizeMode="contain"
            style={styles.img}
            tintColor={BaseColors.primary}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default SplashScreen;
