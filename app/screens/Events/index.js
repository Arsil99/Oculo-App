import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import CardList from '@components/CardList';
import { Images } from '@config';
import HeaderBar from '@components/HeaderBar';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';

export default function Events({ navigation }) {
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
      <HeaderBar HeaderText={'Events'} HeaderCenter />
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            color: darkmode ? BaseColors.white : BaseColors.black90,
          }}
        >
          Open Events
        </Text>

        <CardList
          onPress={() => navigation.navigate('Callibration')}
          image={Images.emoji1}
          data={'March 30, 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />

        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            color: darkmode ? BaseColors.white : BaseColors.black90,
          }}
        >
          Closed Events
        </Text>

        <CardList
          onPress={() => navigation.navigate('EventDetails')}
          image={Images.emoji1}
          data={'March 30, 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />
        <CardList
          onPress={() => navigation.navigate('EventDetails')}
          image={Images.emoji1}
          data={'March 30, 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />
      </View>
    </View>
  );
}
