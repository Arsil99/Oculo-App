import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import styles from './styles';
import BaseSetting from '@config/setting';
export default function CardList({ image, data, status, assessment, onPress }) {
  return (
    <TouchableOpacity
      style={styles.main}
      onPress={onPress}
      activeOpacity={BaseSetting.buttonOpacity}
    >
      <View style={styles.container}>
        <View style={styles.insideBox}>
          <View>
            <Image source={image} style={styles.imgStyle} />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 17 }}>{data}</Text>
            <View style={styles.statusBox}>
              <View style={styles.chipBox}>
                <Text>{status}</Text>
              </View>
              <View style={styles.chipBox}>
                <Text>{assessment}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Icon name="right" size={15} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

CardList.propTypes = {
  image: PropTypes.string,
  data: PropTypes.string,
  status: PropTypes.string,
  assessment: PropTypes.string,
};
CardList.defaultProps = {
  assessment: '',
  status: '',
  image: '',
  onPress: () => {},
  data: '',
};
