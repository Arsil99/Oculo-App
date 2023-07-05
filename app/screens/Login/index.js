import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import LabeledInput from '@components/LabeledInput';
import Button from '@components/Button';
import { Images } from '@config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseSetting from '@config/setting';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getApiData } from '@utils/apiHelper';
import Authentication from '@redux/reducers/auth/actions';
import { BaseColors } from '@config/theme';
import CInput from '@components/CInput';

const Login = ({ navigation }) => {
  const { setUserData, setAccessToken } = Authentication;
  const IOS = Platform.OS === 'ios';
  const emailRegex = BaseSetting?.emailRegex;
  const dispatch = useDispatch();
  const cInputRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const [emailErrObj, setEmailErrObj] = useState({ error: false, msg: '' });
  const [passErrObj, setPassErrObj] = useState({ error: false, msg: '' });

  useEffect(() => {
    setEmailErrObj({ error: false, msg: '' });
    setPassErrObj({ error: false, msg: '' });
  }, []);

  // login call
  const LoginCall = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.login;
    const params = {
      email: email.trim(),
      password: password,
    };
    try {
      const resp = await getApiData(endPoints, 'POST', params, {}, false);
      if (resp?.status) {
        if (resp?.data?.check_data?.is_password_set === 0) {
          navigation.navigate('ResetPassword', {
            email: email,
            from: 'tfa',
          });
          clearData();
          setLoader(false);
        } else if (resp?.data?.enable_2fa) {
          generateOTP();
        } else {
          dispatch(setUserData(resp?.data));
          dispatch(setAccessToken(resp?.data?.auth_token));
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
          clearData();
          setLoader(false);
        }
      } else {
        Toast.show({
          text1: resp?.message,
          type: 'error',
        });
        setLoader(false);
      }
    } catch (error) {
      Toast.show({
        text1: error?.toString(),
        type: 'error',
      });
      console.log('ERRRRR', error);
      setLoader(false);
    }
  };

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
      clearData();
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

  function clearData() {
    setEmail('');
    setPassword('');
  }

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

    // validate password
    if (password == '') {
      valid = false;
      setPassErrObj({
        error: true,
        msg: 'Please enter password',
      });
    } else if (password.length < 8 || password.length > 15) {
      valid = false;
      setPassErrObj({
        error: true,
        msg: 'Password length must be of 8-15',
      });
    } else {
      setPassErrObj({
        error: false,
        msg: '',
      });
    }

    if (valid) {
      LoginCall();
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
          <Image source={Images.logo} resizeMode="contain" style={styles.img} />
        </View>
        <View style={styles.inputcontainer}>
          <LabeledInput
            changeViewWidthSty={{
              shadowColor: BaseColors.black,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 2,
              backgroundColor: BaseColors.white,
            }}
            Label={'EMAIL'}
            mailicon
            returnKeyType="next"
            placeholder={'Enter Email'}
            value={email}
            onChangeText={val => {
              setEmail(val);
              setEmailErrObj({ error: false, msg: '' });
            }}
            showError={emailErrObj.error}
            errorText={emailErrObj.msg}
            onSubmitEditing={() => cInputRef.current.focus()}
          />

          <LabeledInput
            ref={cInputRef}
            changeViewWidthSty={{
              shadowColor: BaseColors.black,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 2,
              backgroundColor: BaseColors.white,
            }}
            LabledInputStyle={{ marginTop: 20 }}
            Label={'Password'}
            keyicon
            value={password}
            placeholder={'Enter Password'}
            eyePassword
            onChangeText={val => {
              setPassword(val);
              setPassErrObj({ error: false, msg: '' });
            }}
            showError={passErrObj.error}
            errorText={passErrObj.msg}
            onSubmitEditing={validation}
          />

          <View
            style={{
              marginTop: 6,
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ForgetPassword')}
            >
              <Text style={styles.forgotPasswordTextStyle}>
                Forget password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={'Login'}
              style={styles.signinbutton}
              onPress={validation}
              loading={loader}
            />
            {Platform.OS === 'ios' ? (
              <TouchableOpacity activeOpacity={0.7}>
                <Image source={Images.faceid} resizeMode="contain" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
