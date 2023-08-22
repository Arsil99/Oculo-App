import { View, Text, Image, StatusBar, ImageBackground } from 'react-native';
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
            top: 0,
            bottom: 0,
            marginHorizontal: 10,
            width: '100%',
            height: '90%',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'absolute',
          }}
        >
          <Image
            source={Images?.faceposition}
            resizeMode="contain"
            style={styles.imgStylee}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles?.squareBorder}>
            <Image
              resizeMode="contain"
              style={{ width: '100%', marginBottom: -20 }}
              source={Images?.line}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Image
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                  source={Images?.round}
                />
                <Image
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                  source={Images?.arrowr}
                />
              </View>
              <View>
                <Image
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                  source={Images?.round}
                />
                <Image
                  resizeMode="contain"
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 10,
                  }}
                  source={Images?.arrowleft}
                />
              </View>
            </View>
          </View>
          <View style={{ width: '50%', flex: 0.5, justifyContent: 'flex-end' }}>
            <Text style={styles?.bigtext}>
              Position Face for{'\n'} Calibration
            </Text>
          </View>
        </View>
        <Button
          shape="round"
          onPress={() => {
            navigation?.navigate('CallibrationStart');
          }}
          title={'Get Started'}
          style={styles.requestBtn}
        />
      </View>
    </View>
  );
}
