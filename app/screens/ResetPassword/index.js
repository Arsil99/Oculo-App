import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Platform,
  Text,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import LabeledInput from '@components/LabeledInput';
import Button from '@components/Button';
import { Images } from '@config';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Authentication from '@redux/reducers/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { removeCredentials, storeCredentials } from '@utils/CommonFunction';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Switch } from 'react-native-gesture-handler';

const ResetPassword = ({ navigation, route }) => {
  const { setUserData, setAccessToken, setBiometric } = Authentication;
  const IOS = Platform.OS === 'ios';
  const from = route?.params?.from || '';
  const email = route?.params?.email || '';
  const token = route?.params?.token || '';
  const dispatch = useDispatch();
  const cInputRef = useRef();

  const { isBiometric } = useSelector(state => {
    return state.auth;
  });
  const [setpassword, setSetpassword] = useState('');
  const [retypepassword, setRetypepassword] = useState('');
  const [currentpassword, setCurrentpassword] = useState('');
  const [loader, setLoader] = useState(false);

  const [passErrObj, setPassErrObj] = useState({ error: false, msg: '' });
  const [currentErrObj, setCurrentErrObj] = useState({ error: false, msg: '' });
  const [RetypepassErrObj, setRetypepassErrObj] = useState({
    error: false,
    msg: '',
  });

  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + 'some message';

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {
    setPassErrObj({ error: false, msg: '' });
    setRetypepassErrObj({ error: false, msg: '' });
  }, []);

  // Reset OTP
  const resetPass = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.resetPassword;
    const params = {
      password: retypepassword,
      token: token,
    };
    try {
      const resp = await getApiData(endPoints, 'POST', params, {}, false);
      if (resp?.status) {
        dispatch(setBiometric(false));
        removeCredentials();
        Toast.show({
          text1: resp?.message,
          type: 'success',
        });
        navigation.reset({
          routes: [{ name: 'Login' }],
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

  // create OTP
  const createPass = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.createPassword;
    const params = {
      current_password: currentpassword,
      new_password: setpassword,
      confirm_password: retypepassword,
      email: email,
    };
    try {
      const resp = await getApiData(endPoints, 'POST', params, {}, false);
      if (resp?.status) {
        if (resp?.data?.userData?.personal_info?.two_factor_enabled === 0) {
          storeCredentials(email, retypepassword);
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
          dispatch(setUserData(resp?.data?.userData?.personal_info));
          dispatch(setAccessToken(resp?.data?.auth_token));
        } else {
          generateOTP();
        }
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

  // generate OTP
  const generateOTP = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.generateOtp;
    const params = {
      email: email,
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

  const checkSignature = () => {
    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then(resultObject => {
        console.log('resultObject ===check signature==>>> ', resultObject);
        const { success, signature } = resultObject;

        if (success) {
          dispatch(setBiometric(!isBiometric));
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

  function validation() {
    let valid = true;

    if (from === 'tfa') {
      if (currentpassword == '') {
        valid = false;
        setCurrentErrObj({
          error: true,
          msg: 'Please enter current password',
        });
      } else {
        setCurrentErrObj({
          error: false,
          msg: '',
        });
      }
    }

    // validate pass
    if (setpassword == '') {
      valid = false;
      setPassErrObj({
        error: true,
        msg: 'Please enter password',
      });
    } else if (setpassword.length < 8 || setpassword.length > 15) {
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

    // validate retypepassword
    if (retypepassword == '') {
      valid = false;
      setRetypepassErrObj({
        error: true,
        msg: 'Please enter retype password',
      });
    } else if (retypepassword.length < 8 || retypepassword.length > 15) {
      valid = false;
      setRetypepassErrObj({
        error: true,
        msg: 'Password length must be of 8-15',
      });
    } else if (retypepassword !== setpassword) {
      valid = false;
      setRetypepassErrObj({
        error: true,
        msg: 'Retype password  must  same as setpassword ',
      });
    } else {
      setRetypepassErrObj({
        error: false,
        msg: '',
      });
    }

    if (valid) {
      from === 'tfa' ? createPass() : resetPass();
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
          {from === 'tfa' && (
            <LabeledInput
              Label={'Current Password'}
              keyicon
              placeholder={'Enter Current Password'}
              eyePassword
              value={currentpassword}
              onChangeText={val => {
                setCurrentpassword(val);
                setCurrentErrObj({ error: false, msg: '' });
              }}
              showError={currentErrObj.error}
              errorText={currentErrObj.msg}
            />
          )}
          <LabeledInput
            Label={'Set Password'}
            LabledInputStyle={{ marginTop: from === 'tfa' ? 20 : 0 }}
            keyicon
            placeholder={'Enter New Password'}
            eyePassword
            returnKeyType="next"
            value={setpassword}
            onChangeText={val => {
              setSetpassword(val);
              setPassErrObj({ error: false, msg: '' });
            }}
            showError={passErrObj.error}
            errorText={passErrObj.msg}
            onSubmitEditing={() => cInputRef.current.focus()}
          />
          <LabeledInput
            ref={cInputRef}
            Label={'Retype Password'}
            LabledInputStyle={{ marginTop: 20 }}
            keyicon
            value={retypepassword}
            placeholder={'Retype Password'}
            eyePassword
            onChangeText={val => {
              setRetypepassword(val);
              setRetypepassErrObj({ error: false, msg: '' });
            }}
            showError={RetypepassErrObj.error}
            errorText={RetypepassErrObj.msg}
            onSubmitEditing={validation}
          />
          <View style={styles.twofa}>
            <Text style={styles.twofaTExt}>Enable FaceID?</Text>
            <Switch
              ios_backgroundColor="#3e3e3e"
              onValueChange={v => {
                if (v) {
                  checkBiometrics();
                } else {
                  dispatch(setBiometric(!isBiometric));
                }
              }}
              value={isBiometric}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              shape="round"
              title={'Save'}
              style={styles.save}
              onPress={validation}
              loading={loader}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
