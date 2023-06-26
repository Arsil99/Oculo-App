import { Images } from '@config';
import { CustomIcon } from '@config/LoadIcons';
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const Details = ({ iconName, text, number, iconColor, numberColor }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ height: 50, width: 100 }}>
          <Text style={styles.text}>{text}</Text>
        </View>

        <Image source={Images.emoji1} resizeMode="contain" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Image
            source={Images.graph1}
            resizeMode="contain"
            style={styles.img2}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 5,
          }}
        >
          <View>
            <Text style={[styles.number, { color: numberColor }]}>
              {number}
            </Text>
          </View>
          <Image source={Images.down} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

export default Details;
