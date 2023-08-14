import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import LabeledInput from '@components/LabeledInput';

export default function Recalldigits({ navigation }) {
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [userInputs, setUserInputs] = useState([]);
  const [manualInputValue, setManualInputValue] = useState('');
  const IOS = Platform.OS === 'ios';
  useEffect(() => {
    QuestionListAPI();
  }, []);

  const onToggleDisplay = () => {
    if (!showInput) {
      setManualInputValue(userInputs[currentIndex] || ''); // Initialize input field with previous value
    }

    if (showInput && manualInputValue === '') {
      Alert.alert('Error', 'Please enter a digits before proceeding.');
      return;
    }

    if (showInput) {
      const updatedInputs = [...userInputs];
      updatedInputs[currentIndex] = manualInputValue;
      setUserInputs(updatedInputs);

      setManualInputValue('');
    }

    setShowInput(!showInput);

    if (!showInput && currentIndex < questionList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const QuestionListAPI = async () => {
    setLoader(true);
    const endPoint = `${BaseSetting.endpoints.numberarray}?event_type=7`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');

      if (res?.status) {
        setQuestionList(res?.data[1].options);
        setUserInputs(Array(res?.data[1].options.length).fill('')); // Initialize userInputs array
      } else {
        setQuestionList([]);
      }
      setLoader(false);
    } catch (error) {
      console.log('Error:', error);
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={IOS ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="dark-content" backgroundColor={BaseColors.white} />
        <HeaderBar
          HeaderText={'Recall Digits'}
          HeaderCenter
          leftText={'Cancel'}
          leftBtnPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.mainDiv}>
          {loader ? (
            <ActivityIndicator
              size={'large'}
              color={BaseColors.primary}
              animating={true}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.2 }}>
                {showInput ? (
                  <Text style={styles.subtitleText}>
                    Enter digits from previous screen
                  </Text>
                ) : (
                  <Text style={styles.subtitleText}>
                    Please memorize the digits and enter them on the next screen
                  </Text>
                )}
              </View>
              <View>
                {showInput ? (
                  <View style={{ flex: 0.5 }}>
                    <LabeledInput
                      value={manualInputValue}
                      keyboardType="numeric"
                      onChangeText={setManualInputValue}
                      placeholder="Enter your input"
                    />

                    <Button
                      style={{ marginTop: 30 }}
                      shape="round"
                      title={'Next'}
                      onPress={onToggleDisplay}
                    />
                  </View>
                ) : (
                  <View>
                    <View style={styles.numbercontainer}>
                      <Text style={styles.titleText}>
                        {questionList[currentIndex]}
                      </Text>
                    </View>

                    <Button
                      style={{ marginTop: 30 }}
                      shape="round"
                      title={'Next'}
                      onPress={onToggleDisplay}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
