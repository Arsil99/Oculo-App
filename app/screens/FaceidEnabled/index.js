import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import styles from './styles';
import Button from '@components/Button';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import { useState } from 'react';
import { items } from '@config/staticData';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getApiData } from '@utils/apiHelper';
import { isEmpty, isNull } from 'lodash';

const errObj = {
  p_phoneErr: false,
  p_phoneErrMsg: '',
};

const FaceidEnabled = ({ navigation, route }) => {
  const [value, setValue] = useState(null);
  const email = route?.params?.email || '';
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [patientPhone, setPatientPhone] = useState('');
  const [ErrObj, setErrObj] = useState(errObj);
  const IOS = Platform.OS === 'ios';

  // generate OTP
  const generateOTP = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.generateOtp;
    const params = {
      value: email,
      type: 'email',
    };
    try {
      const resp = await getApiData(endPoints, 'POST', params, {}, false);
      if (resp?.status) {
        Toast.show({
          text1: resp?.message?.toString(),
          type: 'success',
        });
        navigation.navigate('OTP', {
          email: email,
          from: 'tfa',
        });
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
      }
      setLoader(false);
    } catch (error) {
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      console.log('ERRRRR', error);
      setLoader(false);
    }
  };

  const handleEnable2FA = () => {
    if (!value) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const Validation = () => {
    const error = { ...ErrObj };
    let Valid = true;

    if (isEmpty(patientPhone) || isNull(patientPhone)) {
      Valid = false;
      error.p_phoneErr = true;
      error.p_phoneErrMsg = 'Enter phone number';
    } else if (patientPhone.length !== 10) {
      Valid = false;
      error.p_phoneErr = true;
      error.p_phoneErrMsg = 'Phone number is not 10 digits long';
      // Phone number is not 10 digits long
    }
    handleEnable2FA();
    setErrObj(error);
  };
  return (
    <KeyboardAvoidingView
      behavior={IOS ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoView}>
          <Image source={Images.logo} resizeMode="contain" style={styles.img} />
        </View>
        <View style={styles.imgContainer}>
          <Image
            source={Images.faceid}
            resizeMode="contain"
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={'Enabled Two Factor'}
              style={styles.button}
              onPress={Validation}
            />
            <TouchableOpacity activeOpacity={BaseSetting.buttonOpacity}>
              <Text
                style={styles.skip}
                onPress={() => {
                  navigation.reset({
                    routes: [{ name: 'Home' }],
                  });
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FaceidEnabled;
