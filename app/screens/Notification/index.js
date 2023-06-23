import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import CardList from '@components/CardList';
import { Images } from '@config';
export default function Notification({ navigation }) {
  return (
    <View style={styles.main}>
      <HeaderBar HeaderText={'Notification'} HeaderCenter />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 15, marginTop: 15, marginBottom: 5 }}>
          Today, Aug 11, 2025
        </Text>
        <CardList
          image={Images.emoji1}
          data={'Assessments Due Today'}
          status={'Please fill the assessments'}
        />
        <CardList
          image={Images.emoji1}
          data={'Assessments Due Today'}
          status={'Please fill the assessments'}
        />
      </View>
    </View>
  );
}
