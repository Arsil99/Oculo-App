import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import LabeledInput from '@components/LabeledInput';
import Button from '@components/Button';
import { Images } from '@config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseSetting from '@config/setting';
import { Platform } from 'react-native';
import { getApiData } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BaseColors } from '@config/theme';

const ForgetPassword = ({ navigation }) => {
  const IOS = Platform.OS === 'ios';
  const emailRegex = BaseSetting?.emailRegex;

  const [email, setEmail] = useState();
  const [loader, setLoader] = useState(false);

  const [emailErrObj, setEmailErrObj] = useState({ error: false, msg: '' });

  useEffect(() => {
    setEmailErrObj({ error: false, msg: '' });
  }, []);

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
          text1: resp?.message.toString(),
          type: 'success',
        });
        navigation.navigate('OTP', {
          email: email,
          from: 'forget',
          medium: 'Email',
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

  function validation() {
    let valid = true;

    // validate email
    if (email == '') {
      valid = false;
      setEmailErrObj({
        error: true,
        msg: 'Please enter email',
      });
    } else if (!emailRegex.test(email)) {
      valid = false;
      setEmailErrObj({
        error: true,
        msg: 'Please enter valid email',
      });
    } else {
      setEmailErrObj({
        error: false,
        msg: '',
      });
    }

    if (valid) {
      generateOTP();
    }
  }

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
        <View style={styles.contentView}>
          <Image
            source={Images.updatedlogo}
            resizeMode="contain"
            style={styles.img}
            tintColor={BaseColors.primary}
          />
        </View>
        <View style={styles.inputcontainer}>
          <LabeledInput
            Label={'EMAIL'}
            mailicon
            placeholder={'Enter Email'}
            value={email}
            onChangeText={val => {
              setEmail(val);
              setEmailErrObj({ error: false, msg: '' });
            }}
            showError={emailErrObj.error}
            errorText={emailErrObj.msg}
          />

          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={'Send Email'}
              style={styles.sendemail}
              onPress={validation}
              loading={loader}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 30,
            }}
            activeOpacity={BaseSetting.buttonOpacity}
          >
            <Text style={styles.forgotPasswordTextStyle}> Back To Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;
