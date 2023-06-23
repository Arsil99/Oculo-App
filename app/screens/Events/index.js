import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import CardList from '@components/CardList';
import { Images } from '@config';
import HeaderBar from '@components/HeaderBar';

export default function Events({ navigation }) {
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={'Events'} HeaderCenter />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 18, marginVertical: 5 }}>Open Events</Text>

        <CardList
          onPress={() => navigation.navigate('EventDetails')}
          image={Images.emoji1}
          data={'March 30, 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />

        <Text style={{ fontSize: 18, marginVertical: 5 }}>Closed Events</Text>

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
