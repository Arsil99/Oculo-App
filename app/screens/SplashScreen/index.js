import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import styles from './styles';

const SplashScreen = ({navigation}) => {
  return (
    <>
      <StatusBar
        backgroundColor={'#0000'}
        translucent
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Text>ddfhdgiuhuih</Text>
      </View>
    </>
  );
};

export default SplashScreen;
