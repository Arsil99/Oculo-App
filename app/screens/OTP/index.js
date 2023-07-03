import { View, Text, Image, TextInput, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './styles';
import Button from '@components/Button';
import { Images } from '@config';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Authentication from '@redux/reducers/auth/actions';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

export default function OTP({ navigation, route }) {
  const email = route?.params?.email || '';
  const from = route?.params?.from || '';
  const dispatch = useDispatch();

  const { setUserData, setAccessToken } = Authentication;
  const [code, setcode] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!isEmpty(code)) {
      verifyOTP();
    }
  }, [code]);

  const renderInputField = (index, isSelected) => {
    const inputStyle = {
      color: 'red',
      // Add other styles as needed
    };

    return (
      <TextInput
        key={`input-field-${index}`}
        style={inputStyle}
        // Other props
      />
    );
  };

  // verify OTP
  const verifyOTP = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.verifyOtp;
    const params = {
      value: email,
      type: from === 'tfa' ? 'tfa' : 'forgot-password',
      parameterType: 'email',
      otp: code,
    };
    try {
      const resp = await getApiData(endPoints, 'POST', params, {}, false);
      if (resp?.status) {
        if (from === 'tfa') {
          dispatch(setUserData(resp?.data?.personal_info));
          dispatch(setAccessToken(resp?.data?.auth_token));
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
        } else {
          navigation.navigate('ResetPassword', {
            from: 'forget',
            token: resp?.data?.otp_token,
          });
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
  const handleCodeFilled = code => {
    console.log(`Code is ${code}, you are good to go!`);
    Keyboard.dismiss(); // Dismiss the keyboard after code is filled
  };
  return (
    <View style={styles.main}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={Images.logo}
          style={{ marginBottom: 25, marginTop: -5 }}
        />
        <Text style={{ fontSize: 18 }}>Code has sent to</Text>
        <Text style={{ fontSize: 18 }}>{email}</Text>
      </View>
      <View style={{ height: 100, marginVertical: 25 }}>
        <OTPInputView
          pinCount={6}
          editable
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setcode(code);
            handleCodeFilled;
          }}
          inputTextStyle={{ color: 'red' }}
          renderInputField={renderInputField}
        />
      </View>
      <Button
        shape="round"
        title={'Verify OTP'}
        style={styles.otpBtn}
        onPress={verifyOTP}
        loading={loader}
      />
    </View>
  );
}
