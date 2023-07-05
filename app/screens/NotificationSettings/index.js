import { ScrollView, View } from 'react-native';
import React from 'react';
import styles from './styles';

import HeaderBar from '@components/HeaderBar';

const NotificationSettings = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderBar
        HeaderText={'Notifications Settings'}
        HeaderCenter
        leftText="Back"
      />
    </ScrollView>
  );
};

export default NotificationSettings;
