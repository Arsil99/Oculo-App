import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import Button from '@components/Button';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { TextInput } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Recalldigits({ navigation, route }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const eventId = route?.params?.event_id;
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [userInputs, setUserInputs] = useState([]);
  const [manualInputValue, setManualInputValue] = useState('');
  const [firstInputIncorrect, setFirstInputIncorrect] = useState(false);
  const [inputError, setInputError] = useState('');
  const textInputRef = useRef(null); // Create a ref for the text input

  const [data, setData] = useState({
    event_id: eventId,
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

      if (currentIndex % 2 === 0) {
        const currentItem = questionList[currentIndex];
        if (
          currentItem &&
          manualInputValue ===
            (String(currentItem).split('').reverse().join('') || '')
        ) {
          // User input is correct for the first digit in the set
          const nextIndex = currentIndex + 2; // Move to the next set

          // Update the first digit's answer
          const answer = {
            digit: currentItem,
            fixAOI: 12,
            viewed: 12,
            fixDurAOI: 12,
            fixScreen: 12,
            durScreen: elapsedMilliseconds,
            userResponse: manualInputValue,
          };

          const secondDigitAnswer = {
            digit: null,
            fixAOI: null,
            viewed: null,
            fixDurAOI: null,
            fixScreen: null,
            durScreen: null,
            userResponse: null,
          };

          const updatedAnswers = [...data.answers];
          updatedAnswers[currentIndex] = answer;
          updatedAnswers[currentIndex + 1] = secondDigitAnswer;
          setData({ ...data, answers: updatedAnswers });

          if (nextIndex >= questionList.length) {
            // No more sets, submit data as correct and show success message
            submitData({ ...data, answers: updatedAnswers });
            Toast.show({
              text1: 'Data submitted successfully with correct input.',
              type: 'success',
            });
            navigation.navigate('Events');
          } else {
            setCurrentIndex(nextIndex);
          }
        } else {
          // User input is incorrect for the first digit
          setCurrentIndex(currentIndex + 1);
        }
      } else {
        const currentItem = questionList[currentIndex];
        if (
          currentItem &&
          manualInputValue ===
            (String(currentItem).split('').reverse().join('') || '')
        ) {
          // User input is correct for the second digit in the set
          const nextIndex = currentIndex + 1; // Move to the next set

          // Update the second digit's answer
          const answer = {
            digit: currentItem,
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

          if (nextIndex >= questionList.length) {
            // No more sets, submit data as correct and show success message
            submitData({ ...data, answers: updatedAnswers });
            Toast.show({
              text1: 'Data submitted successfully with correct input.',
              type: 'success',
            });
            navigation.navigate('Events');
          } else {
            setCurrentIndex(nextIndex);
          }
        } else {
          // User input is incorrect for the second digit, submit data as wrong and show success message
          submitData({ ...data, answers: updatedAnswers });
          Toast.show({
            text1: 'Data submitted successfully.',
            type: 'success',
          });
          navigation.navigate('Events');
        }
      }
    }

    setShowInput(!showInput);
  };

  async function submitData(val) {
    console.log('🚀 ~ file: index.js:183 ~ submitData ~ val:', val);
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    setShowConfirmation(true);
    return true;
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    navigation.navigate('Events');
  };
  // Define an array of trial text based on digit length and position
  const trialTexts = [
    '3 Digits A',
    '3 Digits B',
    '4 Digits A',
    '4 Digits B',
    '5 Digits A',
    '5 Digits B',
    '6 Digits A',
    '6 Digits B',
  ];

  // Calculate the current trial text based on the length of the current digit
  const currentTrialText = trialTexts[currentIndex] || 'Unknown Trial';

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
          HeaderText={'Digits Backwards'}
          HeaderCenter
          leftText="Cancel"
          leftBtnPress={() => {
            handleBackPress();
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
              <View style={{ flex: 0.1 }}>
                <Text style={styles.subtitleText}>{currentTrialText}</Text>
                {showInput ? (
                  <Text style={styles.subtitleText}>Report backwards</Text>
                ) : (
                  <Text style={styles.subtitleText}>
                    Remember these numbers
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
            ) : showInput ? (
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
        {showConfirmation && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmation}
            onRequestClose={handleCancel}
          >
            <View style={styles.confirmationModalCenteredView}>
              <View style={styles.confirmationModalView}>
                <Text style={styles.confirmationModalTitleText}>
                  Are you sure?
                </Text>
                <Text style={styles.confirmationModalText}>
                  You want to leave this screen?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={handleConfirm}
                    // disabled={confirmLoading}
                  >
                    {confirmLoading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text style={styles.buttonText}>Confirm</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
