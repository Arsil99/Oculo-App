import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images } from '@config';
import { isEmpty } from 'lodash';
import BaseSetting from '@config/setting';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import Authentication from '@redux/reducers/auth/actions';
const HeaderBar = ({
  HeaderText,
  HeaderTextStyle,
  userProfile,
  HeaderCenter,
  Greatings,
  rightComponent,
  containerStyle,
  arrowPress,
  backPress,
  closeBack,
  hiddenBack,
}) => {
  const { userData } = useSelector(state => {
    return state.auth;
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { setEditProfiles, setSaveEdit } = Authentication;
  return (
    <View
      style={{
        backgroundColor: BaseColors.white,
        width: '100%',
        paddingTop: 10,
      }}
    >
      <View style={[styles.main, containerStyle]}>
        <View style={styles.contentBox}>
          {backPress && (
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              style={styles.imageCon}
              onPress={() => {
                arrowPress ? arrowPress() : navigation.goBack();
              }}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          )}
          {hiddenBack && <View />}
          {closeBack && (
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              style={styles.imageCon}
              onPress={() => {
                dispatch(setSaveEdit('Edit'));
                dispatch(setEditProfiles(false));
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          )}
          {!isEmpty(HeaderText) && (
            <View
              style={[
                styles.headerTextCon,
                HeaderCenter && styles.headerTextCenter,
                HeaderTextStyle,
              ]}
            >
              <Text
                style={[
                  styles.headerText,
                  {
                    textTransform: `${
                      HeaderText === 'VISITORS' || HeaderText === 'WINKS'
                        ? 'uppercase'
                        : 'capitalize'
                    }`,
                  },
                ]}
                numberOfLines={1}
              >
                {HeaderText}
              </Text>
            </View>
          )}

          {userProfile && (
            <TouchableOpacity
              activeOpacity={BaseSetting.buttonOpacity}
              style={styles.userImgCon}
              onPress={() =>
                navigation.navigate('Profile', {
                  from: 'Personal',
                  id: userData?.id,
                })
              }
            >
              <Image
                source={
                  userData?.profile_photo
                    ? {
                        uri: userData.profile_photo,
                      }
                    : Images.blankImage
                }
                resizeMode="cover"
                style={{ height: '100%', width: '100%', borderRadius: 50 }}
              />
            </TouchableOpacity>
          )}
          {rightComponent}
        </View>
      </View>
    </View>
  );
};

export default HeaderBar;
