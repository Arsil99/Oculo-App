import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { Image } from 'react-native';
import { Images } from '@config';

import Button from '@components/Button';

const ImmediateRecallmain = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="dark-content" // Set text/icons to dark color
        backgroundColor={'#FFFFFF'} // White background
      />

      <HeaderBar
        HeaderText={'Digits Backwards'}
        leftText={'Cancel'}
        leftBtnPress={() => {
          navigation.goBack();
        }}
        HeaderCenter
      />

      <ScrollView
        contentContainerStyle={styles.topcontainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.titleText}>Instructions</Text>
          <Text style={styles.titlesubText}>
            A list of numbers will appear on the screen. Remember these numbers.
            {'\n'}
            {'\n'}
            When the number pad appears, do your best to report as many numbers
            as you can remember in the exact reverse order as they appeared.
          </Text>
          <Text style={styles.example}>Example:{'\n'}</Text>
          <Text style={styles.subText}>
            If you saw{'\n'} 1 2 3 {'\n'}
            {'\n'}You would report {'\n'}3 2 1
          </Text>

          <Text style={styles.example}>Example:</Text>
        </View>

        <View style={styles.imgcontainer}>
          <Image
            source={Images.digit}
            resizeMode="contain"
            style={styles.img2}
          />
          <Image
            source={Images.digitreverse}
            resizeMode="contain"
            style={styles.img2}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            shape="round"
            title={'Next'}
            onPress={() => {
              navigation?.navigate('Recalldigits');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ImmediateRecallmain;
