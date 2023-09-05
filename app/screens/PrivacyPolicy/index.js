import { ScrollView, View } from 'react-native';
import React from 'react';
import styles from './styles';

import HeaderBar from '@components/HeaderBar';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderBar HeaderText={'privacy Policy'} HeaderCenter leftText="Back" />
    </ScrollView>
  );
};

export default PrivacyPolicy;
