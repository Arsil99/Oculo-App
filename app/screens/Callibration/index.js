import { View, Text, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import styles from './styles';
import { Images } from '@config';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';

export default function Callibration({ navigation }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.main}>
      <StatusBar
        backgroundColor={'#0000'}
        barStyle="light-content"
        translucent={true}
      />
      <Image source={Images?.callibrateImg} style={styles.imgStyle} />

      <HeaderBar
        HeaderText={'Callibration'}
        isTransperant
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
          navigation.goBack();
        }}
        LeftTextStyle={{ color: BaseColors?.white }}
        HeaderTextStyle={{ color: BaseColors?.white }}
      />
      <View
        style={[
          styles.main,
          {
            alignItems: 'center',
            justifyContent: 'space-around',
          },
        ]}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles?.squareBorder}>
            <Image source={Images?.eyeLine} />
            <Text style={styles?.plusStyle}>+</Text>
          </View>
          <View>
            <Text style={styles?.bigtext}>Calibrate Eye Tracking</Text>
            <Text style={styles?.smalltext}>
              Make sure your face is fully visible on the screen.
            </Text>
            <Text style={styles?.smalltext}>
              After calibration, try to keep your face and device still.
            </Text>
          </View>
        </View>
        <Button
          shape="round"
          onPress={() => {
            navigation?.navigate('Symptoms');
          }}
          title={'Get Started'}
          style={styles.requestBtn}
        />
      </View>
    </View>
  );
}
