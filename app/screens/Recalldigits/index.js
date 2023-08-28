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
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Recalldigits({ navigation }) {
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [userInputs, setUserInputs] = useState([]);
  const [manualInputValue, setManualInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const textInputRef = useRef(null); // Create a ref for the text input

  const [data, setData] = useState({
    event_id: 106, //Static
    assessment_id: 68, //Static
    answers: [],
    created_from: 'app',
  });

  const [inputValues, setInputValues] = useState([]);

  const IOS = Platform.OS === 'ios';

  useEffect(() => {
    if (showInput && textInputRef.current) {
      textInputRef.current.focus(); // Focus the input when it becomes visible
    }
  }, [showInput]);

  useEffect(() => {
    QuestionListAPI();
  }, []);

  const inputStartTimes = useRef([]); // Ref to store start times
  const [sumitbutton, setSumitbutton] = useState('Next');

  const onToggleDisplay = () => {
    if (!showInput) {
      // Start the timer when showing a digit
      inputStartTimes.current[currentIndex] = Date.now(); // Record the start timeal
    } else {
      if (manualInputValue === '') {
        setInputError('Please enter digits before proceeding.');
        return;
      }

      const elapsedMilliseconds =
        Date.now() - inputStartTimes.current[currentIndex];

      const answer = {
        digit: questionList[currentIndex],
        fixAOI: 12,
        viewed: 12,
        fixDurAOI: 12,
        fixScreen: 12,
        durScreen: elapsedMilliseconds,
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
        submitData({ ...data, answers: updatedAnswers });
        navigation.navigate('Events');
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setShowInput(!showInput);
    setSumitbutton(
      currentIndex === questionList.length - 2 ? 'Submit' : 'Next',
    );
  };

  async function submitData(val) {
    try {
      val['answers'] = JSON.stringify(val.answers);
      const response = await getApiData(
        BaseSetting.endpoints.sendnumberarray,
        'POST',
        val,
        {},
        false,
      );

      if (response?.status) {
        Toast.show({
          text1: response?.message,
          type: 'success',
        });
      } else {
        Toast.show({
          text1: response?.message,
          type: 'error',
        });
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
        <HeaderBar HeaderText={'Digits Backwards'} HeaderCenter />
        <View style={styles.mainDiv}>
          {loader ? (
            <ActivityIndicator
              size={'large'}
              color={BaseColors.primary}
              animating={true}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.1 }}>
                {showInput ? (
                  <Text style={styles.subtitleText}>
                    Trial {currentIndex + 1}/12{'\n'}Report backwards
                  </Text>
                ) : (
                  <Text style={styles.subtitleText}>
                    Trial {currentIndex + 1}/12{'\n'} Remember these numbers
                  </Text>
                )}
              </View>
              <View>
                {showInput ? (
                  <View style={{ flex: 0.1 }}>
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
                  </View>
                ) : (
                  <View>
                    <View style={styles.numbercontainer}>
                      <Text style={styles.titleText}>
                        {questionList[currentIndex]}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          <View>
            {(currentIndex === questionList.length - 1) & showInput ? (
              <Button
                shape="round"
                title={'Submit'}
                onPress={onToggleDisplay}
              />
            ) : (
              <Button shape="round" title={'Next'} onPress={onToggleDisplay} />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
