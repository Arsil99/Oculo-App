import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Recalldigits({ navigation }) {
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [userInputs, setUserInputs] = useState([]);
  const [manualInputValue, setManualInputValue] = useState([]);
  const [inputError, setInputError] = useState('');
  const textInputRef = useRef(null); // Create a ref for the text input
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
  const [data, setData] = useState({
    patient_id: 18, //Static
    event_id: 1, //Static
    assessment_id: 1, //Static
    answers: [
      {
        digit: 12, //Static
        fixAOI: 12, //Static
        viewed: 12, //Static
        fixDurAOI: 12, //Static
        fixScreen: 12, //Static
        durScreen: 12, //Temp
        userResponse: Array(questionList.length).fill(null), // Initialize with null values
      },
    ],
    created_from: 'app',
  });
  console.log('🚀 ~ file: index.js:40 ~ Recalldigits ~ data:', data);

  const [inputValues, setInputValues] = useState([]);
  console.log(
    '🚀 ~ file: index.js:61 ~ Recalldigits ~ inputValues:',
    inputValues,
  );
  const { userData } = useSelector(state => state.auth);

  useEffect(() => {
    if (showInput && textInputRef.current) {
      textInputRef.current.focus(); // Focus the input when it becomes visible
    }
  }, [showInput]);
  const IOS = Platform.OS === 'ios';
  useEffect(() => {
    QuestionListAPI();
  }, []);

  const onToggleDisplay = () => {
    if (showInput) {
      if (manualInputValue === '') {
        setInputError('Please enter digits before proceeding.');
        return;
      }
      const answer = {
        digit: 12,
        fixAOI: 12,
        viewed: 12,
        fixDurAOI: 12,
        fixScreen: 12,
        durScreen: 12, // Temp
        userResponse: manualInputValue,
      };

      const updatedAnswers = [...data.answers];
      updatedAnswers[currentIndex] = answer;
      setData({ ...data, answers: updatedAnswers });

      const updatedInputs = [...userInputs];
      updatedInputs[currentIndex] = manualInputValue;
      setUserInputs(updatedInputs);

      const updatedInputValues = [...inputValues];
      updatedInputValues[currentIndex] = manualInputValue;
      setInputValues(updatedInputValues);

      setManualInputValue('');

      setInputError('');

      if (currentIndex === questionList.length - 1) {
        submitData(data);
        navigation.goBack();
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setShowInput(!showInput);
  };

  async function submitData() {
    try {
      const response = await getApiData(
        BaseSetting.endpoints.sendnumberarray,
        'POST',
        data,
        false,
      );
      if (response?.status) {
        console.success(' submitting data:', 'success');
      } else {
        console.error('Error submitting data:', 'error');
      }
    } catch (error) {
      console.log('error =======>>>', error);
    }
  }

  const QuestionListAPI = async () => {
    setLoader(true);
    const endPoint = `${BaseSetting.endpoints.numberarray}?event_type=7`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');

      if (res?.status) {
        setQuestionList(res?.data[1].options);
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
              <View style={{ flex: 0.3 }}>
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
                  <View style={{ flex: 0.5, marginTop: 25 }}>
                    <TextInput
                      ref={textInputRef} // Create a ref using useRef
                      value={manualInputValue}
                      keyboardType="numeric"
                      onChangeText={text => {
                        setManualInputValue(text);
                        setInputError(''); // Clear the error when the user starts typing
                      }}
                      // placeholder="Enter digits"
                      // placeholderTextColor={BaseColors.black20}
                      style={styles.numbercontainer}
                    />

                    {inputError && (
                      <Text style={styles.errorTxt}>{inputError}</Text>
                    )}
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
                      disabled={!submitButtonEnabled}
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
