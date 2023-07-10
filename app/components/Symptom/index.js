import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import Button from '@components/Button';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors } from '@config/theme';

const Symptom = ({ navigation, handleNextPress }) => {
  return (
    <View style={styles.main}>
      <View
        style={{
          paddingTop: 30,
          flex: 1,
          paddingHorizontal: 25,
          marginTop: 2,
          backgroundColor: BaseColors.white,
        }}
      >
        <View style={{ flex: 0.7 }}>
          <Text style={styles.titleText}>Report your symptoms</Text>
          <Text style={styles.titlesubText}>
            Please report your symptom severity level, based on how you've felt
            over the past 24 hours or since your last assessment, using the
            provided scale for each symptom listed on the following screens.
          </Text>
          <Text style={styles.subtitleText}>
            Your previous assessment value is shown on each symptom.
          </Text>
          <Text style={styles.titleText}>Example:</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Image
              source={Images.sliderimage}
              resizeMode="contain"
              style={styles.img2}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            shape="round"
            title={'Next'}
            style={styles.Assessment}
            onPress={handleNextPress}
          />
        </View>
      </View>
    </View>
  );
};

export default Symptom;
