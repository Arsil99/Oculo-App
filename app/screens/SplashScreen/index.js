import React, { useEffect, useState } from 'react';
import styles from './styles';
import { StatusBar, View, Image, Animated } from 'react-native';
import { Images } from '@config';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const SplashScreen = ({ navigation }) => {
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
          <Image source={Images.logo} height={100} width={100} />
        </Animated.View>
      </View>
    </>
  );
};

export default SplashScreen;
