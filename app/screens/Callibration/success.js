/* eslint-disable */
import React from 'react';
import {
  View,
  StatusBar,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';

export default function Success() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
 

  return (
    <View
      style={[
        styles.main,
        {
          // backgroundColor: caliStatus ? BaseColors.borderColor : '#0005',
          backgroundColor: '#58595A',
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar
        backgroundColor={'#0000'}
        barStyle="light-content"
        translucent={true}
      />
      <HeaderBar
        HeaderText={''}
        isTransperant
        HeaderCenter
        leftText="Cancel"
        leftBtnPress={() => {
            navigation.goBack();
        }}
        LeftTextStyle={{ color: BaseColors?.white }}
        HeaderTextStyle={{ color: BaseColors?.white }}
      />
      <View style={styles.dotContainer}>
        <Text>Set this screen</Text>
      </View>
    </View>
  );
}
