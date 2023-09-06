import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import BaseSetting from '@config/setting';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-gesture-handler';
import { isNull } from 'lodash';
import { Images } from '@config';

const InfoCard = props => {
  const { userData } = useSelector(state => {
    return state.auth;
  });
  const { data, mainTitle, SwitchChange, tabPress } = props;
  const { darkmode, isBiometric } = useSelector(state => {
    return state.auth;
  });
  const noProfilePic =
    isNull(userData.profile_pic) || userData.profile_pic === undefined;

  return (
    <View
      style={[
        styles.settigCon,
        // {
        //   backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
        // },
      ]}
    >
      <View style={styles.mainTitleStyle}>
        <Text
          style={[
            styles.titleText,
            {
              color: darkmode ? BaseColors.white : BaseColors.lightBlack,
            },
          ]}
        >
          {mainTitle}
        </Text>
      </View>

      <View style={styles.infoshadow}>
        <View
          style={{
            backgroundColor: darkmode ? BaseColors.black90 : BaseColors.white,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          {mainTitle === 'Patient Information' ? (
            <Image
              source={
                noProfilePic ? Images.avatar : { uri: userData.profile_pic }
              }
              resizeMode="cover"
              style={styles.userDp}
            />
          ) : null}
        </View>
        {data.map((item, index) => {
          return item?.title === null ? null : (
            <TouchableOpacity
              key={item?.id}
              activeOpacity={item?.switch ? 1 : BaseSetting.buttonOpacity}
              onPress={() => tabPress && tabPress(item)}
              style={[
                styles.settingItem,
                index === 0 &&
                (mainTitle !== 'Patient Information') &
                  (mainTitle == 'contact Information')
                  ? styles.topBorder
                  : [
                      styles.otherBorder,
                      {
                        borderTopLeftRadius:
                          (index === 0) & (mainTitle !== 'Patient Information')
                            ? 12
                            : null,
                        borderTopRightRadius:
                          (index === 0) & (mainTitle !== 'Patient Information')
                            ? 12
                            : null,
                        backgroundColor: darkmode
                          ? BaseColors.black90
                          : BaseColors.white,
                        borderColor: BaseColors.borderColor,
                        borderTopWidth: index === 0 ? 0 : 0.3,
                      },
                    ],
                index === data.length - 1 ? styles.radiusDesign : null,
              ]}
            >
              <View style={styles.cardContainer}>
                <View style={styles.innerCard}>
                  {item?.title === 'Login With Touch Id' ? (
                    <Icon1
                      name={item.leftIcon}
                      size={15}
                      color={darkmode ? BaseColors.white : BaseColors.black90}
                    />
                  ) : item?.leftIcon === 'microphone' ? (
                    <Icon2
                      name={item.leftIcon}
                      size={15}
                      color={darkmode ? BaseColors.white : BaseColors.black90}
                    />
                  ) : (
                    <Icon
                      name={item.leftIcon}
                      size={15}
                      color={darkmode ? BaseColors.white : BaseColors.black90}
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={[
                      styles.settingItemText,
                      {
                        color: darkmode ? BaseColors.white : BaseColors.black90,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              </View>

              <View>
                <Text
                  style={[
                    styles.righttitletext,
                    { color: darkmode ? BaseColors.white : BaseColors.black90 },
                  ]}
                >
                  {item?.switch ? (
                    <Switch
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={v => {
                        SwitchChange && SwitchChange(item, v);
                      }}
                      value={
                        item.title === 'Dark Theme' ? darkmode : isBiometric
                      }
                    />
                  ) : (
                    item.righttitle
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default InfoCard;
