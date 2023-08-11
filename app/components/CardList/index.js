import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import styles from './styles';
import BaseSetting from '@config/setting';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
export default function CardList({ image, data, status, assessment, onPress }) {
  const { darkmode } = useSelector(state => state.auth);
  return (
    <TouchableOpacity
      style={[
        styles.main,
        {
          backgroundColor: darkmode ? null : BaseColors.white,
          borderColor: darkmode ? BaseColors.textColor : BaseColors.black10,
          elevation: darkmode ? 0 : 3,
        },
      ]}
      onPress={onPress}
      activeOpacity={BaseSetting.buttonOpacity}
    >
      <View style={styles.container}>
        <View style={styles.insideBox}>
          <View>
            <Image source={image} style={styles.imgStyle} />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                fontSize: 17,
                color: darkmode ? BaseColors.white : BaseColors.black80,
              }}
            >
              {data}
            </Text>
            <View style={styles.statusBox}>
              <View
                style={[
                  styles.chipBox,
                  {
                    backgroundColor: darkmode
                      ? BaseColors.black10
                      : BaseColors.lightBg,
                    borderColor: darkmode
                      ? BaseColors.textColor
                      : BaseColors.black80,
                  },
                ]}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.colorcontainer}></View>
                  <Text
                    style={{
                      color: darkmode ? BaseColors.white : BaseColors.black80,
                      textAlign: 'center',
                      fontSize: 12,
                    }}
                  >
                    {status}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.chipBox,
                  {
                    backgroundColor: darkmode ? null : BaseColors.lightBg,
                    borderColor: darkmode
                      ? BaseColors.textColor
                      : BaseColors.black80,
                  },
                ]}
              >
                <Text
                  style={{
                    color: darkmode ? BaseColors.white : BaseColors.black80,
                    textAlign: 'center',
                    fontSize: 12,
                  }}
                >
                  {assessment}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Icon
            name="right"
            size={15}
            style={{
              color: darkmode ? BaseColors.textGrey : BaseColors.black10,
            }}
          />
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
