import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import Symptom from '@components/Symptom';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { getApiData } from '@utils/apiHelper';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import LabeledInput from '@components/LabeledInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function ChangeInfo({ navigation, route }) {
  const { userData } = useSelector(state => state.auth);

  const eventId = route?.params?.event_id;
  const [response, setResponse] = useState('');
  const [editHistory, setEditHistory] = useState(true);
  const [rightHistoryText, setRightHistoryText] = useState('Edit');
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [otherResponse, setOtherResponse] = useState('');
  const [showCustomResponse, setShowCustomResponse] = useState(false);
  const [isNoneSelected, setIsNoneSelected] = useState(false);

  const handleOtherResponseChange = text => {
    setOtherResponse(text);
  };

  const handleResponseChange = text => {
    setResponse(text);
    setResponseError('');
  };

  const HandleHistoryUpdateBtn = () => {
    setEditHistory(!editHistory);
    setRightHistoryText(rightHistoryText === 'Edit' ? 'Save' : 'Edit');
  };

  useEffect(() => {
    QuestionListAPI();
  }, []);

  const QuestionListAPI = async (type, list) => {
    setLoader(true);
    const endPoint = `${
      BaseSetting.endpoints.questionList
    }?event_type=${4}&list=${'a' || ''}&patient_id=${userData?.id || ''}
    }`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        console.log('🚀 ~ file: index.js:60 ~ ChangeInfo ~ res:', res);
        setQuestionList(res?.data);
      } else {
        setQuestionList([]);
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
      setLoader(false);
    }
  };

  const handleCheckBoxToggle = (id, question) => {
    if (question === 'Other') {
      // Special case for "Other" question

      setShowCustomResponse(!showCustomResponse);
    } else if (question === 'None') {
      setIsNoneSelected(!isNoneSelected);
      // Clear all selected checkboxes and hide the "Other" TextInput
      setSelectedQuestions([]);
      setShowCustomResponse(false);
      // Clear the response and responseError
      setResponse('');
      setResponseError('');
    } else {
      // Toggle other checkbox selections
      setSelectedQuestions(prevSelected => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter(qId => qId !== id);
        } else {
          setIsNoneSelected(false);
          return [...prevSelected, id];
        }
      });
    }
  };
  const [responseError, setResponseError] = useState('');
  const submitData = async () => {
    setLoader(true);
    if (response.trim() === '') {
      setResponseError('Please enter a description before submitting.');
      return;
    } else {
      // Clear the validation error message if the input is valid
      setResponseError('');
    }

    let endPoints = BaseSetting.endpoints.createTreatmentInfo;
    const data = {
      patient_id: userData.id || '',
      event_id: eventId || '',
      created_from: 'app',
      selectedQuestions: selectedQuestions, // Array of selected questions
      response: response, // Value of the response text input
      otherResponse: otherResponse, // Value of the "Other" text input
    };
    try {
      const resp = await getApiData(endPoints, 'POST', data, {}, false);
      console.log('🚀 ~ file: index.js:94 ~ submitData ~ resp:', resp);
      if (resp?.status) {
        Toast.show({
          text1: resp?.message.toString(),
          type: 'success',
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
  return editHistory ? (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BaseColors.white} />

      <HeaderBar
        HeaderText={'Treatment Information'}
        HeaderCenter
        leftText={editHistory ? 'Cancel' : ''}
        leftBtnPress={() => {
          navigation.goBack();
        }}
        rightComponent={
          <TouchableOpacity
            onPress={() =>
              rightHistoryText === 'Edit'
                ? (setEditHistory(!editHistory),
                  setRightHistoryText(
                    rightHistoryText === 'Edit' ? 'Save' : 'Edit',
                  ))
                : HandleHistoryUpdateBtn()
            }
            activeOpacity={BaseSetting.buttonOpacity}
          >
            <Text>{rightHistoryText}</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.mainDiv}>
        {loader ? (
          <ActivityIndicator
            size={'large'}
            color={BaseColors.primary}
            animating={true}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.subtitleText}>
              {questionList.length > 0 ? questionList[0].question : ''}
            </Text>
            {editHistory ? (
              <View style={styles.buttoncontainer}>
                <FlatList
                  data={questionList.slice(1)}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.row}>
                      <CheckBox
                        title={item.question}
                        checked={
                          item.question === 'Other'
                            ? showCustomResponse
                            : item.question === 'None'
                            ? isNoneSelected
                            : selectedQuestions.includes(item.id)
                        }
                        onPress={() => {
                          if (item.question === 'Other') {
                            setShowCustomResponse(!showCustomResponse);
                          } else {
                            handleCheckBoxToggle(item.id, item.question);
                          }
                        }}
                      />
                    </View>
                  )}
                />
                {showCustomResponse && (
                  <LabeledInput
                    Label={'Please Describe Other'}
                    LabledTextStyle={styles.textInput}
                    placeholder="Enter your other response here"
                    onChangeText={handleOtherResponseChange}
                    value={otherResponse}
                  />
                )}
                <LabeledInput
                  Label={'Please Describe'}
                  LabledTextStyle={styles.textInput}
                  placeholder="Enter your response here"
                  onChangeText={handleResponseChange}
                  value={response}
                />
                <Text style={styles.errorText}>{responseError}</Text>
              </View>
            ) : (
              <Text style={styles.subtitleText}>Yes</Text>
            )}
            <View style={styles.btnContainer}>
              <Button
                shape="round"
                title={'Next'}
                onPress={() => {
                  // setEditHistory(false);
                  submitData();
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  ) : (
    <Symptom navigation={navigation} eventId={eventId} />
  );
}
