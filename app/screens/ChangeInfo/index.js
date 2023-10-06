import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { getApiData } from '@utils/apiHelper';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { View, StatusBar, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import LabeledInput from '@components/LabeledInput';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { isArray, isEmpty, isNull, isUndefined } from 'lodash';
import CText from '@components/CText';

const errorObj = {
  treatmentErr: false,
  treatmentMsg: '',
  descriptionErr: false,
  descriptionMsg: '',
};
export default function ChangeInfo({ navigation, route }) {
  const IOS = Platform.OS === 'ios';
  const data = route?.params?.otherData;
  const { userData, darkmode } = useSelector(state => state.auth);
  const [selectedValues, setSelectedValues] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const eventId = route?.params?.event_id;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [loader, setLoader] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [otherResponse, setOtherResponse] = useState('');
  const [err, setErr] = useState('');
  const [errObj, setErrObj] = useState(errorObj);

  const handleOtherResponseChange = text => {
    setErrObj({
      ...errObj,
      treatmentErr: false,
      treatmentMsg: '',
    });
    setOtherResponse(text);
  };

  useEffect(() => {
    QuestionListAPI();
  }, []);

  // this function is used for get a question list
  const QuestionListAPI = async (type, list) => {
    setLoader(true);
    const endPoint = `${
      BaseSetting.endpoints.questionList
    }?event_type=${4}&list=${'a' || ''}&patient_id=${userData?.id || ''}
    }`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        if (!isEmpty(res?.data) && isArray(res?.data)) {
          setQuestionList(res?.data);
          response?.data.forEach(que => {
            if (que?.type === '8') {
              selectedValues[que?.meta_name] = que?.answer;
              if (que?.meta_name === 'Add_Other_Ther') {
                selectedValues['Add_Other_Ther'] = isEmpty(que?.answer)
                  ? false
                  : true;
                setOtherResponse(!isEmpty(que?.answer) ? que?.answer : '');
              }
              if (que?.meta_name === 'Add_None_Ther' && !que?.answer) {
                selectedValues['Add_Ther_Comm'] =
                  que?.related_questions[0].answer || null;
              }
            }
          });
          setLoader(false);
        }
      } else {
        setQuestionList([]);
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
      setLoader(false);
    }
  };

  // this function is used for get a questions answer
  function getAnswerTreatmentInfo(
    mainAnswer,
    questionIndex,
    relatedQuestions,
    relatedInd,
    relatedAns,
  ) {
    setQuestionList(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      if (
        mainAnswer &&
        updatedQuestions[questionIndex]?.meta_name === 'Add_None_Ther'
      ) {
        // Uncheck "Add_None_Ther" checkbox when others are checked
        updatedQuestions.forEach(que => {
          if (que?.type === '8') {
            selectedValues[que?.meta_name] = false; // Uncheck other checkboxes
          }
        });
        selectedValues['Add_None_Ther'] = mainAnswer || false;
        selectedValues['Add_Ther_Comm'] = '';
      } else {
        if (mainAnswer) {
          // Uncheck "Add_None_Ther" when other checkboxes are checked
          updatedQuestions.forEach(que => {
            if (que?.type === '8' && (questionIndex === 6 || !que?.answer)) {
              selectedValues[que?.meta_name] = false; // Uncheck other checkboxes
            } else {
              selectedValues['Add_None_Ther'] = false;
            }
          });
          selectedValues[updatedQuestions[questionIndex]?.meta_name] =
            mainAnswer;
        } else {
          selectedValues[updatedQuestions[questionIndex]?.meta_name] =
            mainAnswer;
          if (updatedQuestions[questionIndex]?.meta_name === 'Add_Other_Ther') {
            setOtherResponse('');
          }
          if (!mainAnswer && !isUndefined(relatedQuestions)) {
            let key =
              relatedQuestions[relatedInd]?.metric_name ||
              relatedQuestions[relatedInd]?.meta_name;
            selectedValues[key] = relatedAns;
          }
        }
      }

      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answer: mainAnswer,
        error: false,
      };
      return updatedQuestions;
    });
  }

  // this function is used for validation
  function treatmentInfoValidation() {
    const error = { ...errObj };
    let valid = questionList?.some(question => {
      if (
        question?.type === '8' &&
        (question?.answer || !isEmpty(question?.answer))
      ) {
        return true;
      }
      return false;
    });

    if (!valid) {
      setErr('Please select at least one treatment');
    }

    if (selectedValues['Add_Other_Ther'] && isEmpty(otherResponse)) {
      valid = false;
      error.treatmentErr = true;
      error.treatmentMsg = 'Please enter other treatment';
    }

    if (
      !selectedValues['Add_None_Ther'] &&
      isEmpty(selectedValues['Add_Ther_Comm'])
    ) {
      valid = false;
      error.descriptionErr = true;
      error.descriptionMsg = 'Please enter description';
    }

    setErrObj(error);

    if (valid) {
      submitData();
    }
  }

  const submitData = async () => {
    setLoader(true);
    let endPoints = BaseSetting.endpoints.createTreatmentInfo;
    selectedValues['event_id'] = eventId;
    selectedValues['created_from'] = 'app';
    selectedValues['Add_Other_Ther'] = !isEmpty(otherResponse)
      ? otherResponse
      : false;
    try {
      const resp = await getApiData(
        endPoints,
        'POST',
        selectedValues,
        {},
        false,
      );

      if (resp?.status) {
        Toast.show({
          text1: resp?.message.toString(),
          type: 'success',
        });
        if (data.symptom_info === 0) {
          navigation.navigate('Symptom', {
            event_id: data?.id,
            otherData: data,
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
  const handleCancelPress = () => {
    setShowConfirmation(true); // Show the confirmation modal when the cancel button is pressed
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
        onCancelPress={handleBackPress} // Pass the function as a prop
      />

      <KeyboardAvoidingView
        behavior={IOS ? 'padding' : 'height'}
        style={[
          styles.mainDiv,
          {
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
          },
        ]}
      >
        {loader ? (
          <ActivityIndicator
            size={'large'}
            color={BaseColors.primary}
            animating={true}
          />
        ) : (
          <View style={styles.buttoncontainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {!isEmpty(questionList) &&
                isArray(questionList) &&
                questionList.map((item, index) => (
                  <View key={item.id}>
                    {item?.type === '6' ? (
                      <CText
                        title={item.question}
                        required
                        style={{ marginBottom: 5 }}
                        textColor={{
                          color: darkmode
                            ? BaseColors.white
                            : BaseColors.textColor,
                        }}
                      />
                    ) : item?.type === '8' ? (
                      <View style={{ marginLeft: -15 }}>
                        <CheckBox
                          containerStyle={{
                            borderRadius: 12,
                          }}
                          title={item.question}
                          checked={selectedValues[item?.meta_name] || false}
                          onPress={() => {
                            setErrObj(errorObj);
                            getAnswerTreatmentInfo(
                              isUndefined(item?.answer) ||
                                !selectedValues[item?.meta_name] ||
                                selectedValues[item?.meta_name] === 'false'
                                ? true
                                : false,
                              index,
                            );
                            setErr('');
                          }}
                        />
                      </View>
                    ) : null}
                    {item?.meta_name === 'Add_None_Ther' && !isEmpty(err) ? (
                      <Text style={styles.errorText}>{err}</Text>
                    ) : (
                      ''
                    )}
                    {item?.meta_name === 'Add_None_Ther' &&
                      selectedValues['Add_Other_Ther'] && (
                        <>
                          <LabeledInput
                            isRequired
                            Label={'Other treatment'}
                            LabledTextStyle={styles.textInput}
                            placeholder="Please enter other treatment"
                            onChangeText={handleOtherResponseChange}
                            value={otherResponse}
                          />
                          {errObj.treatmentErr && (
                            <Text style={styles.errorText}>
                              {errObj.treatmentMsg}
                            </Text>
                          )}
                        </>
                      )}
                    {!isNull(item?.related_questions) &&
                      !isUndefined(item?.related_questions) &&
                      !isEmpty(item?.related_questions) &&
                      item?.related_questions?.map((rItem, ind) => {
                        if (!selectedValues[item?.meta_name]) {
                          return (
                            <LabeledInput
                              isRequired
                              Label={rItem?.question}
                              LabledTextStyle={styles.textInput}
                              placeholder="Please enter description"
                              onChangeText={text => {
                                getAnswerTreatmentInfo(
                                  item?.type === '8'
                                    ? selectedValues[item?.meta_name] || false
                                    : item?.answer,
                                  index,
                                  item?.related_questions,
                                  ind,
                                  text,
                                );
                                setErrObj({
                                  ...errObj,
                                  descriptionErr: false,
                                  descriptionMsg: '',
                                });
                              }}
                              value={selectedValues[rItem?.meta_name]}
                            />
                          );
                        }
                      })}
                  </View>
                ))}
              {errObj.descriptionErr && (
                <Text style={styles.errorText}>{errObj.descriptionMsg}</Text>
              )}
            </ScrollView>
            <View style={styles.btnContainer}>
              <Button
                shape="round"
                title={'Next'}
                onPress={() => {
                  treatmentInfoValidation();
                }}
              />
            </View>
          </View>
        )}
        {showConfirmation && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmation}
            onRequestClose={handleCancel}
          >
            <View style={styles.confirmationModalCenteredView}>
              <View
                style={[
                  styles.confirmationModalView,
                  {
                    backgroundColor: darkmode
                      ? BaseColors.textColor
                      : BaseColors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.confirmationModalTitleText,
                    {
                      color: darkmode ? BaseColors.white : BaseColors.black,
                    },
                  ]}
                >
                  Are you sure?
                </Text>
                <Text
                  style={[
                    styles.confirmationModalText,
                    {
                      color: darkmode ? BaseColors.white : BaseColors.black,
                    },
                  ]}
                >
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
      </KeyboardAvoidingView>
    </View>
  );
}
