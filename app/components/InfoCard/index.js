import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import BaseSetting from '@config/setting';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Authentication from '@redux/reducers/auth/actions';
import { Switch } from 'react-native-gesture-handler';

const InfoCard = props => {
  const { data, mainTitle, SwitchChange, tabPress } = props;
  const { darkmode, isBiometric } = useSelector(state => {
    return state.auth;
  });
  const navigation = useNavigation();

  return (
    <View style={styles.settigCon}>
      <View style={styles.mainTitleStyle}>
        <Text style={styles.titleText}>{mainTitle}</Text>
      </View>
      <View style={styles.infoshadow}>
        {data.map((item, index) => {
          return item?.title === null ? null : (
            <TouchableOpacity
              key={item?.id}
              activeOpacity={item?.switch ? 1 : BaseSetting.buttonOpacity}
              onPress={() => tabPress && tabPress(item)}
              style={[
                styles.settingItem,
                index === 0 ? styles.topBorder : styles.otherBorder,
                index === data.length - 1 ? styles.radiusDesign : null,
              ]}
            >
              <View style={styles.cardContainer}>
                <View style={styles.innerCard}>
                  {item?.title === 'Login With Touch Id' ? (
                    <Icon1
                      name={item.leftIcon}
                      size={15}
                      color={BaseColors.black90}
                    />
                  ) : (
                    <Icon
                      name={item.leftIcon}
                      size={15}
                      color={BaseColors.black90}
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.settingItemText}>{item.title}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.righttitletext}>
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
