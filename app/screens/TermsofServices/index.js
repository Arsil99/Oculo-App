import { ScrollView, View } from 'react-native';
import React from 'react';
import styles from './styles';

import HeaderBar from '@components/HeaderBar';

const TermsofServices = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeaderBar HeaderText={'Terms of Services'} HeaderCenter backPress />
    </ScrollView>
  );
};

export default TermsofServices;
