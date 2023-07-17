import { Images } from '@config';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import BaseSetting from '@config/setting';

const Details = ({ iconName, text, number, iconColor, numberColor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={BaseSetting.buttonOpacity}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ height: 45, width: 90 }}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <Image source={Images.emoji1} resizeMode="contain" />
        </View>
        <View style={styles.graphcontainer}>
          <Image
            source={Images.graph1}
            resizeMode="contain"
            style={styles.img2}
          />

          <View style={styles.numbercontainer}>
            <View>
              <Text style={[styles.number, { color: numberColor }]}>
                {number}
              </Text>
            </View>
            <Image source={Images.down} resizeMode="contain" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
