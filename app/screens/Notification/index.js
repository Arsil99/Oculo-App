import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import CardList from '@components/CardList';
import { Images } from '@config';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';

export default function Notification({ navigation }) {
  const { darkmode } = useSelector(state => state.auth);
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode
            ? BaseColors.lightBlack
            : BaseColors.lightBg,
        },
      ]}
    >
      <HeaderBar HeaderText={'Notification'} HeaderCenter />
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            fontSize: 15,
            marginTop: 15,
            marginBottom: 5,
            color: darkmode ? BaseColors.white : BaseColors.black90,
          }}
        >
          Today, Aug 11, 2025
        </Text>
        <CardList
          iconName="clock-o"
          backgroundColoricon={BaseColors.darkorange}
          showClock={true} // Display the clock icon
          data={'Assessments Due Today'}
          status={'Please fill the assessments'}
        />
        <CardList
          iconName="clock-o"
          backgroundColoricon={BaseColors.darkorange}
          showClock={true} // Display the clock icon
          data={'Assessments Due Today'}
          status={'Please fill the assessments'}
        />
      </View>
    </View>
  );
}
