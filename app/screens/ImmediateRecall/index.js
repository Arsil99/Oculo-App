import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import Button from '@components/Button';

const ImmediateRecall = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor={'#0000'}
      />
      <HeaderBar HeaderText={'Immediate Recall'} HeaderCenter />

      <ScrollView
        contentContainerStyle={styles.topcontainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.titleText}>Instructions</Text>
          <Text style={styles.titlesubText}>
            Next we will test your memory. When the test begins, a list of words
            will appear on the screen. Remember these words.{'\n'} {'\n'}On the
            response screen, tap the microphone and repeat back as many words as
            you can remember, in any order.{'\n'}
            {'\n'} For Trials 2 & 3 you will see the same list again. Repeat
            back as many words as you can remember in any order, even if you
            said the word before.
          </Text>
          <Text style={styles.example}>Example:</Text>
        </View>

        <View style={styles.imgcontainer}>
          {/* <Image source={Images.emoji5} resizeMode="contain" /> */}
          <Image
            source={Images.rememberword}
            resizeMode="contain"
            style={styles.img2}
          />
          <Image
            source={Images.speech}
            resizeMode="contain"
            style={styles.img2}
          />
          <Image
            source={Images.typetobox}
            resizeMode="contain"
            style={styles.img2}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            shape="round"
            title={'Next'}
            onPress={() => {
              navigation?.navigate('Wordlist');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ImmediateRecall;
