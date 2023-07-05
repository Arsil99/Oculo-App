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
  leftText,
  leftBtnPress,
  LeftTextStyle,
  rightComponent,
  containerStyle,
  isTransperant,
}) => {
  const { userData } = useSelector(state => {
    return state.auth;
  });
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: isTransperant ? '#0000' : BaseColors.white,
        width: '100%',
        paddingTop: 10,
      }}
    >
      <View style={[styles.main, containerStyle]}>
        <View style={styles.contentBox}>
          <TouchableOpacity
            activeOpacity={isEmpty(leftText) ? 1 : BaseSetting.buttonOpacity}
            style={styles.imageCon}
            onPress={() => {
              if (leftText === 'Back') {
                navigation.goBack();
              } else if (!isEmpty(leftText)) {
                leftBtnPress && leftBtnPress();
              }
            }}
          >
            <Text style={LeftTextStyle}>{leftText}</Text>
          </TouchableOpacity>
          {!isEmpty(HeaderText) && (
            <View
              style={[
                styles.headerTextCon,
                HeaderCenter && styles.headerTextCenter,
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
                  HeaderTextStyle,
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