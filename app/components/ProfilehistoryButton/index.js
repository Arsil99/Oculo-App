import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import LabeledInput from '@components/LabeledInput';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { getApiData } from '@utils/apiHelper';
import { isBoolean, isEmpty, isNull, isNumber, isUndefined } from 'lodash';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function ProfilehistoryButton(props) {
  const [btnLoad, setBtnLoad] = useState(false);
  const { editHistory } = props;
  const [loader, setLoader] = useState(true);
  const [textInputValue, setTextInputValue] = useState('');
  const [textnumberValue, setTextnumberValue] = useState('');
  const [unknown, setUnknown] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [data, setData] = useState({});
  const [isButtonSelected, setIsButtonSelected] = useState(false);
  const { userData } = useSelector(state => state.auth);
  console.log('🚀 ~ file: index.js:28 ~ userData:', userData);

  const [questionList, setQuestionList] = useState([]);
  const optionList = ['Yes', 'No', 'Undiagnosed'];
  const recoveryArr = [
    '7 to 10 days',
    '2 weeks to 1 month',
    '1 to 6 months',
    'greater than 6 months',
    'Still recovering',
  ];

  useEffect(() => {
    QuestionListAPI();
  }, []);

  const items = [
    { label: '7 to 10 days', value: '7 to 10 days' },
    { label: '2 weeks to 1 month', value: '2 weeks to 1 month' },
    { label: '1 to 6 months', value: '1 to 6 months' },
    { label: 'greater than', value: 'greater than' },
  ];

  const QuestionListAPI = async () => {
    setLoader(true);
    const endPoint = BaseSetting.endpoints.question;
    try {
      const res = await getApiData(`${endPoint}?event_type=1`, 'GET');

      console.log('🚀 ~ file: index.js:56 ~ QuestionListAPI ~ res:', res);
      if (res?.status) {
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
  // const initialQuestionList = questionList.map(item => ({
  //   ...item,
  //   error: false,
  // }));
  // const handleButtonPress = (itemId, buttonType) => {
  //   const updatedData = questionList.map(item => {
  //     if (item.id === itemId) {
  //       return {
  //         ...item,
  //         buttonColor: buttonType,
  //         error: false, // Reset error for the current question
  //       };
  //     }
  //     return item;
  //   });
  //   setQuestionList(updatedData);
  //   const postData = {
  //     itemId: itemId,
  //     buttonType: buttonType,
  //   };
  //   buttonType === 'Yes' && itemId === 4 ? setUnknown(true) : setUnknown(false);
  //   if (
  //     buttonType === 'Yes' ||
  //     buttonType === 'No' ||
  //     buttonType === 'Undiagnosed'
  //   ) {
  //     setIsButtonSelected(true);
  //   } else {
  //     setIsButtonSelected(false);
  //   }

  //   // Call getAnswer with the selected button value
  //   getAnswer(buttonType, itemId);
  // };

  const { darkmode } = useSelector(state => {
    return state.auth;
  });

  function getAnswer(
    ans,
    questionIndex,
    relatedQuestions,
    relatedAns,
    relatedInd,
  ) {
    setQuestionList(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const mainQuestion = updatedQuestions[questionIndex];
      data[updatedQuestions[questionIndex]?.meta_name] = isBoolean(ans)
        ? ans
        : ans + 1;

      // If the question has related questions
      if (relatedQuestions && relatedQuestions.length > 0) {
        // Update the main question's answer separately
        mainQuestion.mainAnswer = isBoolean(ans) ? ans : ans + 1;

        if (!isUndefined(relatedInd) && !isUndefined(relatedAns)) {
          data[relatedQuestions[relatedInd]?.metric_name] = relatedAns;
        }

        relatedQuestions.forEach(relatedQuestion => {
          const relatedQuestionIndex = updatedQuestions.findIndex(
            q => q.meta_name === relatedQuestion?.parent_meta_name,
          );
          if (relatedQuestionIndex !== -1) {
            if (!isNull(relatedQuestions) && !isUndefined(relatedInd)) {
              // Update the answer for the related question
              updatedQuestions[relatedQuestionIndex].related_questions[
                relatedInd
              ].relatedAns = relatedAns;
            }
          }
        });
      } else {
        // If there are no related questions, update the main question's answer only
        mainQuestion.mainAnswer = isBoolean(ans) ? ans : ans + 1;
      }

      // Log the updated questions for debugging purposes

      return updatedQuestions;
    });
  }

  function validation() {
    let valid = true;

    const updatedQuestions = questionList.map(question => {
      let mainQuestionError = false;

      // Check if main answer is not selected
      if (isUndefined(question?.mainAnswer) || isEmpty(question?.mainAnswer)) {
        if (isBoolean(question?.mainAnswer) || isNumber(question?.mainAnswer)) {
          mainQuestionError = false;
        } else {
          mainQuestionError = true;
          valid = false; // Set valid to false if any main question has an error
        }
      }

      // Validate related questions if any
      if (question.related_questions && question.related_questions.length > 0) {
        const updatedRelatedQuestions = question.related_questions.map(
          relatedQuestion => {
            if (!relatedQuestion.relatedAns) {
              return { ...relatedQuestion, error: true };
            }
            return { ...relatedQuestion, error: false };
          },
        );

        // If any related question has an error, set mainQuestionError to true
        if (question?.mainAnswer === 'Yes' || question?.mainAnswer === true) {
          if (updatedRelatedQuestions.some(q => q.error)) {
            mainQuestionError = true;
            valid = false; // Set valid to false if any related question has an error
          }
        }

        return {
          ...question,
          error: mainQuestionError,
          related_questions: updatedRelatedQuestions,
        };
      }

      return { ...question, error: mainQuestionError };
    });

    setQuestionList(updatedQuestions);

    if (valid) {
      savePatientHistory();
    }
  }

  async function savePatientHistory() {
    try {
      const response = await getApiData(
        BaseSetting.endpoints.savePatient,
        'POST',
        {
          patientId: userData.id,
          answers: JSON.stringify([data]),
        },
      );
      console.log(
        '🚀 ~ file: index.js:218 ~ savePatientHistory ~ response:',
        response,
      );

      if (response?.status) {
        Toast.show({
          text1: response?.message.toString(),
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
  return (
    <View style={styles.container}>
      <View style={styles.titleTextcontainer}>
        <Text
          style={[
            styles.titleText,
            { color: darkmode ? BaseColors.white : BaseColors.black90 },
          ]}
        >
          Medical History
        </Text>
      </View>
      {editHistory ? (
        <View style={styles.mainDiv}>
          {loader ? (
            <ActivityIndicator
              size={'large'}
              color={BaseColors.primary}
              animating={true}
            />
          ) : (
            // Render the main content

            <View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 20 }}
              >
                {/* Your main content */}
                {questionList.length > 0 ? (
                  questionList.map((item, index) => (
                    <View key={index}>
                      {/* Render question */}
                      <Text style={[styles.questionText]}>{item.question}</Text>
                      {/* Render answer options */}
                      {item.type === '1' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                          }}
                        >
                          {['Yes', 'No', 'Undiagnosed'].map((it1, ind1) => {
                            if (item?.meta_name === 'Hist_HI' && ind1 === 2) {
                              return null;
                            } else {
                              return (
                                <View style={styles.buttoncontainer}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      getAnswer(
                                        ind1,
                                        index,
                                        item?.related_questions,
                                      );
                                    }}
                                    style={[
                                      {
                                        backgroundColor:
                                          item?.mainAnswer === ind1 + 1
                                            ? BaseColors.secondary
                                            : BaseColors.transparent,
                                        borderColor: BaseColors.borderColor,
                                        marginRight: 40,
                                      },
                                      styles.yesbutton,
                                    ]}
                                    // style={[
                                    //   {
                                    //     backgroundColor:
                                    //       item.mainAnswer ===
                                    //       (ind1 === 0 ? true : false)
                                    //         ? BaseColors.secondary
                                    //         : 'transparent',
                                    //   },
                                    //   styles.yesbutton,
                                    // ]}
                                  >
                                    <Text
                                      style={{
                                        color:
                                          item?.mainAnswer === ind1 + 1
                                            ? BaseColors.white
                                            : BaseColors.textColor,
                                      }}
                                    >
                                      {it1}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            }
                          })}
                        </View>
                      ) : item.type === '2' ? (
                        // Render text input for type 2
                        <LabeledInput
                          placeholder="Enter your response here"
                          value={''}
                          onChangeText={text => {
                            // Handle text input change
                          }}
                          style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: 8,
                            marginVertical: 5,
                            borderRadius: 5,
                          }}
                        />
                      ) : item.type === '3' ? (
                        // Render another text input for type 3
                        <LabeledInput
                          placeholder="Enter your response here"
                          value={item.mainAnswer || ''}
                          onChangeText={text => getAnswer(text, index)}
                          style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            padding: 8,
                            marginVertical: 5,
                            borderRadius: 5,
                          }}
                        />
                      ) : item.type === '4' ? (
                        // Render a scale or something for type 4
                        <Text>Scale</Text>
                      ) : (
                        // Render buttons for type 5
                        <View style={{ flexDirection: 'row' }}>
                          {['Yes', 'No'].map((option, optionIndex) => (
                            <View
                              style={styles.buttoncontainer}
                              key={optionIndex}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  getAnswer(
                                    optionIndex === 0 ? true : false,
                                    index,
                                  )
                                }
                                style={[
                                  {
                                    backgroundColor:
                                      item.mainAnswer ===
                                      (optionIndex === 0 ? true : false)
                                        ? BaseColors.secondary
                                        : 'transparent',
                                  },
                                  styles.yesbutton,
                                ]}
                              >
                                <Text
                                  style={{
                                    color:
                                      item.mainAnswer ===
                                      (optionIndex === 0 ? true : false)
                                        ? BaseColors.white
                                        : BaseColors.textColor,
                                  }}
                                >
                                  {option}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      )}
                      {/* Render error message if any */}
                      {item.error ? (
                        <Text
                          style={{ color: BaseColors.red, marginBottom: 5 }}
                        >
                          This question is mandatory
                        </Text>
                      ) : null}
                      {/* Render related questions */}
                      {!isUndefined(item.mainAnswer) &&
                      (item?.mainAnswer === 1 || item.mainAnswer === true)
                        ? item.related_questions?.map(
                            (relatedItem, relatedIndex) => (
                              <View key={relatedIndex}>
                                {/* Render related question */}
                                {item?.meta_name === 'Other_Med_Hx' ? (
                                  <View style={{ flexDirection: 'row' }}>
                                    {['Yes', 'No'].map(
                                      (option, optionIndex) => (
                                        <View
                                          style={styles.buttoncontainer}
                                          key={optionIndex}
                                        >
                                          <TouchableOpacity
                                            onPress={() =>
                                              getAnswer(
                                                optionIndex === 0
                                                  ? true
                                                  : false,
                                                index,
                                              )
                                            }
                                            style={[
                                              {
                                                backgroundColor:
                                                  item.mainAnswer ===
                                                  (optionIndex === 0
                                                    ? true
                                                    : false)
                                                    ? BaseColors.secondary
                                                    : 'transparent',
                                              },
                                              styles.yesbutton,
                                            ]}
                                          >
                                            <Text
                                              style={{
                                                color:
                                                  item.mainAnswer ===
                                                  (optionIndex === 0
                                                    ? true
                                                    : false)
                                                    ? BaseColors.white
                                                    : BaseColors.textColor,
                                              }}
                                            >
                                              {option}
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      ),
                                    )}
                                  </View>
                                ) : (
                                  <View>
                                    <LabeledInput
                                      keyboardType="numeric"
                                      onChangeText={text => {
                                        setTextnumberValue(text);
                                        getAnswer(
                                          item?.mainAnswer,
                                          item?.id,
                                          index,
                                          text,
                                        );
                                      }}
                                      value={textnumberValue}
                                      placeholder="Enter your number here..."
                                    />

                                    <View style={styles.dropdownContainer}>
                                      <Dropdown
                                        items={items}
                                        open={open}
                                        setOpen={setOpen}
                                        placeholder="Please select options"
                                        value={value}
                                        setValue={setValue}
                                        onValueChange={selectedValue => {
                                          setValue(selectedValue);
                                          getAnswer(
                                            item?.mainAnswer,
                                            item?.id,
                                            index,
                                            selectedValue,
                                          );
                                        }}
                                      />
                                    </View>
                                  </View>
                                )}
                                {/* Render related answer options or input */}
                                {/* Handle related answer selection */}
                                {/* Render error message if any */}
                              </View>
                            ),
                          )
                        : null}
                    </View>
                  ))
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80%',
                    }}
                  >
                    <Text>No Data</Text>
                  </View>
                )}
              </ScrollView>
              {/* Render the Next button */}
              <Button
                shape="round"
                title="Submit"
                onPress={validation}
                style={{
                  marginBottom: 30,
                }}
              >
                {btnLoad ? (
                  // Replace CircularProgress with an appropriate loading component
                  <Text>Loading...</Text>
                ) : (
                  <Text>Next</Text>
                )}
              </Button>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.mainDiv}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {questionList.map(item => (
              <View>
                <Text style={[styles.questionText]}>{item.question}</Text>
                <Text style={styles.subtitleText}>Yes</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
