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
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getApiData } from '@utils/apiHelper';
import Authentication from '@redux/reducers/auth/actions';
import { BaseColors } from '@config/theme';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { storeCredentials } from '@utils/CommonFunction';
import * as Keychain from 'react-native-keychain';

const Login = ({ navigation }) => {
  const { setUserData, setAccessToken } = Authentication;
  const { isBiometric } = useSelector(state => state.auth);
  const IOS = Platform.OS === 'ios';
  const emailRegex = BaseSetting?.emailRegex;
  const dispatch = useDispatch();
  const cInputRef = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const [emailErrObj, setEmailErrObj] = useState({ error: false, msg: '' });
  const [passErrObj, setPassErrObj] = useState({ error: false, msg: '' });

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + 'some message';

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {
    setEmailErrObj({ error: false, msg: '' });
    setPassErrObj({ error: false, msg: '' });
  }, []);

  const getStoredCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const { username, password } = credentials;
        LoginCall('bio', username, password);
      } else {
        console.log('No credentials stored.');
        return;
      }
    } catch (error) {
      console.log('Error retrieving credentials:', error);
      return;
    }
  };

  const checkBiometrics = async () => {
    try {
      rnBiometrics.isSensorAvailable().then(resultObject => {
        const { available, biometryType } = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supported');
          authenticate();
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported');
          authenticate();
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supported');
          authenticate();
        } else {
          console.log('Biometrics not supported');
          authenticate();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const authenticate = async () => {
    try {
      rnBiometrics
        .biometricKeysExist()
        .then(resultObject => {
          const { keysExist } = resultObject;
          console.log('resultObject ==key exists or not===>>> ', resultObject);
          if (keysExist) {
            checkSignature();
          } else {
            rnBiometrics
              .createKeys()
              .then(resultObject => {
                console.log('resultObject ==create keys===>>> ', resultObject);
                const { publicKey } = resultObject;
                if (publicKey) {
                  setTimeout(() => {
                    // checkSignature();
                  }, 400);
                }
              })
              .catch(error => {
                // moveToParticularPage();
                console.log('Create keys error-----', error);
              });
          }
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Please turn on and add your device fingerprint',
          });
          console.log('Authentic error--', err);
          // moveToParticularPage();
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Please turn on and add your device fingerprint',
      });
      console.log(error);
      // moveToParticularPage();
    }
  };

  const checkSignature = async () => {
    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then(resultObject => {
        console.log('resultObject ===check signature==>>> ', resultObject);
        const { success, signature } = resultObject;

        if (success) {
          getStoredCredentials();
          // moveToParticularPage();
        } else {
          setTimeout(() => {
            checkSignature();
          }, 3000);
        }
      })
      .catch(err => {
        console.log('Err----', err);
        if (Platform.OS === 'ios') {
          Toast.show({
            type: 'error',
            text1: 'Please try again by reopen the app',
          });
        } else {
          // moveToParticularPage();
        }
      });
  };

  // login call
  const LoginCall = async (from, id, pass) => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.login;
    const params = {
      email: from === 'bio' ? id : email.trim(),
      password: from === 'bio' ? pass : password,
    };
    try {
      const resp = await getApiData(endPoints, 'POST', params, {}, false);
      if (resp?.status) {
        if (resp?.data?.check_data?.is_password_set === 0) {
          navigation.navigate('ResetPassword', {
            email: from === 'bio' ? id : email,
            from: 'tfa',
          });
          clearData();
          setLoader(false);
        } else if (resp?.data?.enable_2fa) {
          generateOTP(from, id, pass);
        } else {
          storeCredentials(email, password);
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
  const generateOTP = async (from, id, pass) => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.generateOtp;
    const params = {
      value: from === 'bio' ? id : email,
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
          email: from === 'bio' ? id : email,
          from: 'tfa',
          password: from === 'bio' ? pass : password,
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
            {Platform.OS === 'ios' && isBiometric ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  checkBiometrics();
                }}
                style={{ marginLeft: 20 }}
              >
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
