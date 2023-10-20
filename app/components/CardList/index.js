import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import styles from './styles';
import BaseSetting from '@config/setting';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CardList({
  showClock, // Prop to control whether to show the clock icon
  image,
  showmanIcon,
  iconName,
  othericons,
  backgroundColoricon,
  data,
  status,
  assessment,
  onPress,
  rightArrow,
}) {
  const { darkmode } = useSelector(state => state.auth);
  const ClockIcon = () => (
    <View
      style={[styles.iconContainer, { backgroundColor: backgroundColoricon }]}
    >
      <Icon1 name={iconName} size={30} color="white" />
    </View>
  );
  const Othericon = () => (
    <View
      style={[styles.iconContainer, { backgroundColor: backgroundColoricon }]}
    >
      <Icon3 name={iconName} size={20} color="white" />
    </View>
  );
  const ManIcon = () => (
    <View
      style={[styles.iconContainer, { backgroundColor: backgroundColoricon }]}
    >
      <Icon2 name={iconName} size={30} color="white" />
    </View>
  );
  return (
    <Animated.View entering={FadeInDown}>
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
            {showClock ? (
              <ClockIcon /> // Display the ClockIcon if showClock is true
            ) : othericons ? (
              <Othericon />
            ) : showmanIcon ? (
              <ManIcon />
            ) : (
              <Image source={image} style={styles.imgStyle} /> // Display the image otherwise
            )}
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
                        ? BaseColors.black80
                        : BaseColors.lightBg,
                      borderColor: darkmode
                        ? BaseColors.textColor
                        : BaseColors.black80,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={[
                        styles.colorcontainer,
                        {
                          backgroundColor:
                            status === 'Completed' || status === 'Initial Visit'
                              ? BaseColors.secondary
                              : BaseColors.lightorange,
                        },
                      ]}
                    ></View>
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
                      backgroundColor:
                        assessment === ''
                          ? null
                          : darkmode
                          ? BaseColors.black80
                          : BaseColors.lightBg,
                      borderColor: darkmode
                        ? BaseColors.white
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
          {rightArrow && (
            <View>
              <Icon
                name="right"
                size={15}
                style={{
                  color: darkmode ? BaseColors.white : BaseColors.black80,
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

CardList.propTypes = {
  showClock: PropTypes.bool, // Prop to control whether to show the clock icon
  image: PropTypes.string,
  data: PropTypes.string,
  status: PropTypes.string,
  assessment: PropTypes.string,
  onPress: PropTypes.func,
  rightArrow: PropTypes.bool,
};

CardList.defaultProps = {
  showClock: false, // Default to not show the clock icon
  assessment: '',
  status: '',
  image: '',
  onPress: () => {},
  data: '',
};
