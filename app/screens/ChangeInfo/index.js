import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import Symptom from '@components/Symptom';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { getApiData } from '@utils/apiHelper';
import { isArray, isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image } from 'react-native';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import LabeledInput from '@components/LabeledInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Images } from '@config';

export default function ChangeInfo({ navigation, route }) {
  const data = route?.params?.otherData;
  const { userData, darkmode } = useSelector(state => state.auth);
  const [selectedValues, setSelectedValues] = useState({}); // Initialize selectedValues as an empty object
  const eventId = route?.params?.event_id;
  const [response, setResponse] = useState('');
  const [rightHistoryText, setRightHistoryText] = useState('Edit');
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [otherResponse, setOtherResponse] = useState('');
  const [showCustomResponse, setShowCustomResponse] = useState(false);
  const [isNoneSelected, setIsNoneSelected] = useState(false);
  const [isAtLeastOneCheckboxSelected, setIsAtLeastOneCheckboxSelected] =
    useState(false);

  const handleOtherResponseChange = text => {
    setOtherResponse(text);
  };

  const handleResponseChange = text => {
    setResponse(text);
    setResponseError('');
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

  const handleCheckBoxToggle = (id, metaName, question) => {
    const updatedValues = { ...selectedValues };

    if (question === 'Other') {
      setShowCustomResponse(!showCustomResponse);
      setIsNoneSelected(false);
      setSelectedQuestions([]);
      // Set the "Other" answer to 1 when it's selected and 0 when it's not selected
      updatedValues[metaName] = showCustomResponse ? 0 : 1;

      // Set the value of "Add_Ther_Comm" to the content of the regular text input
      updatedValues.Add_Ther_Comm = response;
    } else if (question === 'None') {
      // Clear the value of other options when "None" is selected
      Object.keys(updatedValues).forEach(key => {
        if (key !== metaName) {
          updatedValues[key] = 0;
        }
      });

      // Set the value for "None" to 1 when it's selected
      updatedValues[metaName] = isNoneSelected ? 0 : 1;

      // Update the state for selected questions and other related states
      setSelectedValues(updatedValues);
      setIsNoneSelected(!isNoneSelected);
      setSelectedQuestions([]);
      setShowCustomResponse(false);
      setResponse('');
      setResponseError('');
    } else {
      // Toggle the selected value between 1 and 0
      updatedValues[metaName] = updatedValues[metaName] === 1 ? 0 : 1;

      setSelectedQuestions(prevSelected => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter(qId => qId !== id);
        } else {
          setIsNoneSelected(false);
          setResponse('');
          setResponseError('');
          return [...prevSelected, id];
        }
      });
    }

    setSelectedValues(updatedValues);
    const isAtLeastOneSelected = Object.values(updatedValues).some(
      value => value === 1,
    );
    setIsAtLeastOneCheckboxSelected(isAtLeastOneSelected);
  };

  const [responseError, setResponseError] = useState('');

  const validateForm = () => {
    const selectedOptions = Object.values(selectedValues);

    if (selectedOptions.every(value => value !== 1)) {
      // No checkbox is selected, show an error message
      Toast.show({
        text1: 'Please select at least one checkbox.',
        type: 'error',
      });
      return false;
    }

    submitData();
    return true; // At least one checkbox is selected, form is valid
  };

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
    const dataObject = {
      event_id: eventId,

      Add_Ther: 2,
      Add_Vest_Ther: selectedValues['Vestibular Therapy'] === 1 ? 1 : 0,
      Add_Visi_Ther: selectedValues['Vision Therapy'] === 1 ? 1 : 0,
      Add_Cogn_Ther:
        selectedValues['Cognitive/Behavioral Therapy'] === 1 ? 1 : 0,
      Add_Chir_Ther: selectedValues['Chiropractic'] === 1 ? 1 : 0,
      Add_Other_Ther: otherResponse === '' ? 0 : otherResponse, // Use the value of otherResponse here
      Add_None_Ther: selectedValues['None'] === 1 ? 1 : 0,
      Add_Ther_Comm: response, // Use the value of response here
      created_from: 'app',
    };
    console.log(
      '🚀 ~ file: index.js:153 ~ submitData ~ dataObject:',
      dataObject,
    );
    try {
      const resp = await getApiData(endPoints, 'POST', dataObject, {}, false);
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
  const handleSubmit = () => {
    const selectedOptions = Object.values(selectedValues);

    if (selectedOptions.every(value => value !== 1)) {
      // No checkbox is selected, show an error message
      Toast.show({
        text1: 'Please select at least one checkbox.',
        type: 'error',
      });
    } else if (response.trim() === '') {
      setResponseError('Please enter a description before submitting.');
    } else {
      // Clear the validation error message if the input is valid
      setResponseError('');
      submitData(); // Submit data if validation passes

      // Navigate to the 'Symptom' screen if data.symptom_info === 0
      if (data.symptom_info === 0) {
        navigation.navigate('Symptom', {
          event_id: data?.id,
          otherData: data,
        });
      }
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkmode ? BaseColors.textColor : BaseColors.lightBg,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={BaseColors.white} />

      <HeaderBar
        HeaderText={'Treatment Information'}
        HeaderCenter
        leftText={'Cancel'}
        leftBtnPress={() => {
          navigation.navigate('Events');
        }}
      />

      <View
        style={[
          styles.mainDiv,
          { backgroundColor: darkmode ? BaseColors.black : BaseColors.white },
        ]}
      >
        {loader ? (
          <ActivityIndicator
            size={'large'}
            color={BaseColors.primary}
            animating={true}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={[
                styles.subtitleText,
                { color: darkmode ? BaseColors.white : BaseColors.textColor },
              ]}
            >
              {questionList.length > 0 ? questionList[0].question : ''}
            </Text>

            <View style={styles.buttoncontainer}>
              {questionList.slice(1).map(item => (
                <View style={styles.row} key={item.id}>
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
                      }
                      if (item.question === 'None') {
                        setIsNoneSelected(!isNoneSelected);
                        setSelectedQuestions([]);
                        setShowCustomResponse(false);
                      } else {
                        handleCheckBoxToggle(item.id, item.question);
                      }
                    }}
                  />
                </View>
              ))}
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

            <View style={styles.btnContainer}>
              <Button
                shape="round"
                title={'Next'}
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
