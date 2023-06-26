/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { BaseColors } from '@config/theme';
import { logout } from '@utils/CommonFunction';

export default function ProfileDetailcard({
  navigation,
  maintitle,
  data,
  onPress,
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'flex-start',
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.titleText}>{maintitle}</Text>
      </View>

      <View style={styles.settigCon}>
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item?.id}
              activeOpacity={0.7}
              onPress={() => (item?.title === 'Sign Out' ? logout() : null)}
              style={[
                styles.settingItem,
                index === 0
                  ? { borderTopLeftRadius: 12, borderTopRightRadius: 12 }
                  : {
                      borderTopWidth: 0.7,
                      borderColor: BaseColors.borderColor,
                    },
                index === data.length - 1
                  ? {
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }
                  : null,
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 20,
                    marginRight: 20,
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    name={item.leftIcon}
                    size={15}
                    color={BaseColors.black90}
                  />
                </View>
                <View>
                  <Text style={styles.settingItemText}>{item.title}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.righttitletext}>
                  {item?.switch ? (
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={
                        isEnabled ? BaseColors.primary : BaseColors.offWhite
                      }
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
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
}

ProfileDetailcard.propTypes = {
  maintitle: PropTypes.string,
  data: PropTypes.string,
};
ProfileDetailcard.defaultProps = {
  maintitle: '',
  onPress: () => {},
  data: '',
};
