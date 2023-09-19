/* eslint-disable react-native/no-inline-styles */
import LabeledInput from '@components/LabeledInput';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { getApiData } from '@utils/apiHelper';
import { isArray, isEmpty, isNumber } from 'lodash';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CheckBox } from 'react-native-elements';

const ProfilehistoryButton = (props, ref) => {
  const [isNoneCheckboxSelected, setIsNoneCheckboxSelected] = useState(false);
  const { darkmode, userData } = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  const { editHistory, handleSuccess } = props;
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    new Array(questionList?.length).fill(false),
  );

  useEffect(() => {
    QuestionListAPI();
  }, [isFocused, editHistory]);

  useImperativeHandle(ref, () => ({
    HandleDetailUpdateBtn: () => {
      validation();
    },
  }));

  function setInitialData(QuestionArr) {
    const dummy_obj = {};

    isArray(QuestionArr) &&
      !isEmpty(QuestionArr) &&
      QuestionArr.map(item => {
        if (!isEmpty(item?.answer) || isNumber(item?.answer)) {
          if (item?.parent_meta_name) {
            QuestionArr.map(item1 => {
              if (
                item?.parent_meta_name === item1?.meta_name &&
                item1?.answer === 1
              ) {
                dummy_obj[item?.meta_name] = item?.answer;
              }
            });
          } else {
            dummy_obj[item?.meta_name] = item?.answer;
          }
        }
      });

    setData(dummy_obj);
  }

  const QuestionListAPI = async () => {
    setLoader(true);
    const endPoint = `${BaseSetting.endpoints.question}?patient_id=${userData?.id}&type=app`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        setQuestionList(res?.data);
        setInitialData(res?.data);
      } else {
        setQuestionList([]);
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
      setLoader(false);
    }
  };

  function getAnswer(ans, questionIndex) {
    const dummy_Arr = [...questionList];
    dummy_Arr.map((item, index) => {
      if (index === questionIndex) {
        item.answer = ans;
        item.error = false;
      }
    });

    setInitialData(dummy_Arr);
    setQuestionList(dummy_Arr);
  }

  function validation() {
    const dummy_Arr = [...questionList];
    let valid = true;

    dummy_Arr.map(question => {
      // Check if main answer is not selected
      if (question?.parent_meta_name) {
        dummy_Arr.map(item => {
          if (
            question?.parent_meta_name === item?.meta_name &&
            item?.answer === 1
          ) {
            if (!isEmpty(question?.answer) || isNumber(question?.answer)) {
              question.error = false;
            } else {
              question.error = true;
              valid = false; // Set valid to false if any main question has an error
            }
          }
        });
      } else if (!isEmpty(question?.answer) || isNumber(question?.answer)) {
        question.error = false;
      } else {
        question.error = true;
        valid = false; // Set valid to false if any main question has an error
      }
    });

    setQuestionList(dummy_Arr);

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
          created_from: 'app',
        },
        '',
        false,
      );
      if (response?.status) {
        QuestionListAPI();
        handleSuccess();
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

  const handleCheckBoxChange = index => {
    // Make a copy of the current state or data
    const updatedQuestions = [...questionList];
    // Check if the clicked checkbox is the "None" checkbox
    if (updatedQuestions[index].meta_name === 'None_Ther') {
      setIsNoneCheckboxSelected(!isNoneCheckboxSelected);
    }

    // Toggle the isChecked value for the clicked question
    updatedQuestions[index].isChecked = !updatedQuestions[index].isChecked;

    // If the clicked question is "None," deselect all other questions
    if (
      updatedQuestions[index].meta_name === 'None_Ther' &&
      updatedQuestions[index].isChecked
    ) {
      updatedQuestions.forEach((item, i) => {
        if (i !== index) {
          item.isChecked = false;
        }
      });
    } else if (
      updatedQuestions[index].meta_name !== 'None_Ther' &&
      updatedQuestions[index].isChecked
    ) {
      // If the clicked question is not "None" and is checked, deselect the "None" question
      const noneIndex = updatedQuestions.findIndex(
        item => item.meta_name === 'None_Ther',
      );
      if (noneIndex !== -1) {
        updatedQuestions[noneIndex].isChecked = false;
      }
    }

    // Update the state or data with the modified question list
    setQuestionList(updatedQuestions);

    // Update the selectedCheckboxes state based on the updated question list
    const selected = updatedQuestions
      .filter(item => item.isChecked)
      .map(item => item.question); // Store question text in selectedCheckboxes

    setSelectedCheckboxes(selected);
  };

  const renderQuestion = (item, index, type_arr) => {
    const isNoneCheckbox = item.meta_name === 'None_Ther';
    const isLastQuestion = index === questionList.length - 1;

    return (
      <View
        key={index}
        style={[
          {
            backgroundColor: darkmode ? BaseColors.black : BaseColors.white,
          },
        ]}
      >
        {/* Render question */}
        {item.type === '8' && item.meta_name !== 'Prev_Ther' ? (
          editHistory ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <CheckBox
                  title={item.question}
                  checked={item.isChecked || false} // A boolean prop indicating whether the checkbox is checked
                  onPress={() => handleCheckBoxChange(index)} // Use onPress instead of onChange
                />
              </View>
            </View>
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: darkmode ? BaseColors.white : BaseColors.textColor,
              }}
            >
              {selectedCheckboxes.includes(item.question)
                ? `Ans: ${item.question}`
                : null}
            </Text>
          )
        ) : (
          <Text
            style={[
              styles.questionText,
              {
                color: darkmode ? BaseColors.white : BaseColors.black,
              },
            ]}
          >
            {`${item.patient_question}`}
            <Text style={{ color: BaseColors.red, marginTop: -13 }}> *</Text>
          </Text>
        )}
        {/* Render answer options */}
        {item.type === '1' ? (
          // Render Yes/No buttons
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={editHistory}
            style={[{ width: '100%' }]}
          >
            {editHistory ? (
              type_arr.map((it1, ind1) => {
                return (
                  <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                      onPress={() => {
                        getAnswer(it1?.value, index);
                      }}
                      style={[
                        {
                          backgroundColor:
                            item?.answer === it1?.value
                              ? BaseColors.secondary
                              : darkmode
                              ? BaseColors.textColor
                              : BaseColors.transparent,
                          borderColor: BaseColors.borderColor,
                          marginRight: 40,
                        },
                        styles.yesbutton,
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            item?.answer === it1?.value
                              ? BaseColors.white
                              : darkmode
                              ? BaseColors.white
                              : BaseColors.textColor,
                        }}
                      >
                        {ind1 === 2 && item?.meta_name === 'Hist_HI'
                          ? 'Unknown'
                          : it1?.label}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                }}
              >{`Ans: ${
                item?.answer === 1
                  ? 'Yes'
                  : item?.answer === 0
                  ? 'No'
                  : item?.answer === 2
                  ? item?.meta_name === 'Hist_HI'
                    ? 'Unknown'
                    : 'Undiagnosed'
                  : '-'
              }`}</Text>
            )}
          </ScrollView>
        ) : item.type === '2' ? (
          // Render text input for type 2
          editHistory ? (
            <LabeledInput
              placeholder="Enter your response here"
              value={item?.answer?.toString() || ''}
              onChangeText={text => {
                // Handle text input change
                getAnswer(text, index);
              }}
              keyboardType={'number-pad'}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 8,
                marginVertical: 5,
                borderRadius: 5,
              }}
            />
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: darkmode ? BaseColors.white : BaseColors.textColor,
              }}
            >{`Ans: ${item?.answer || '-'}`}</Text>
          )
        ) : item.meta_name === 'Other_Med_Hx_Comm' ? (
          // Render text input for type 2
          editHistory ? (
            <LabeledInput
              placeholder="Enter your response here"
              value={item?.answer?.toString() || ''}
              onChangeText={text => {
                // Handle text input change
                getAnswer(text, index);
              }}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 8,
                marginVertical: 5,
                borderRadius: 5,
              }}
            />
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: darkmode ? BaseColors.white : BaseColors.textColor,
              }}
            >{`Ans: ${item?.answer || '-'}`}</Text>
          )
        ) : item.meta_name === 'Other_Ther' && item.isChecked ? (
          // Render text input for type 2
          editHistory ? (
            <LabeledInput
              placeholder="Enter your response here"
              value={item.answer?.toString() || ''}
              onChangeText={text => getAnswer(text, index)}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 8,
                marginVertical: 5,
                borderRadius: 5,
              }}
            />
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: darkmode ? BaseColors.white : BaseColors.textColor,
              }}
            >{`Ans: ${item?.answer || '-'}`}</Text>
          )
        ) : !isNoneCheckboxSelected &&
          item.type === '3' &&
          item.meta_name === 'Prev_Ther_Comm' ? (
          // Render another text input for type 3
          editHistory ? (
            <LabeledInput
              placeholder="Enter your response here"
              value={item.answer?.toString() || ''}
              onChangeText={text => getAnswer(text, index)}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 8,
                marginVertical: 5,
                borderRadius: 5,
              }}
            />
          ) : (
            <Text
              style={{
                fontWeight: 'bold',
                color: darkmode ? BaseColors.white : BaseColors.textColor,
              }}
            >{`Ans: ${item?.answer || '-'}`}</Text>
          )
        ) : item.type === '4' ? (
          // Render a scale or something for type 4
          <Text>Scale</Text>
        ) : item.type === '5' ? (
          // Render buttons for type 5
          <View style={{ flexDirection: 'row' }}>
            {editHistory ? (
              ['Yes', 'No'].map((option, optionIndex) => (
                <View style={styles.buttoncontainer} key={optionIndex}>
                  <TouchableOpacity
                    onPress={() => getAnswer(optionIndex === 0 ? 1 : 0, index)}
                    style={[
                      {
                        backgroundColor:
                          (item.answer == 1 && optionIndex === 0) ||
                          (item.answer == 0 && optionIndex === 1)
                            ? BaseColors.secondary
                            : darkmode
                            ? BaseColors.textColor
                            : 'transparent',
                      },
                      styles.yesbutton,
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          (item.answer == 1 && optionIndex === 0) ||
                          (item.answer == 0 && optionIndex === 1)
                            ? BaseColors.white
                            : darkmode
                            ? BaseColors.white
                            : BaseColors.textColor,
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                }}
              >{`Ans: ${
                item.answer == 1 ? 'Yes' : item.answer == 0 ? 'No' : '-'
              }`}</Text>
            )}
          </View>
        ) : null}
        {/* Render error message if any */}
        {/* Render error message if any */}
        {item.error ? (
          <Text style={{ color: BaseColors.red, marginBottom: 5 }}>
            This question is mandatory
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTextcontainer}>
        <Text
          style={[
            styles.titleText,
            { color: darkmode ? BaseColors.white : BaseColors.black },
          ]}
        >
          Medical History
        </Text>
      </View>
      <View
        style={[
          styles.mainDiv,
          {
            backgroundColor: darkmode ? BaseColors.black : BaseColors.white,
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
          // Render the main content

          <ScrollView
            contentContainerStyle={{
              backgroundColor: BaseColors.white,
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Your main content */}
            {questionList.length > 0 ? (
              // Check if isNoneCheckboxSelected is true
              isNoneCheckboxSelected ? (
                // Create a copy of questionList and remove the last item
                [...questionList].slice(0, -1).map((item, index) => {
                  const type_arr =
                    item?.meta_name === 'HI_Recov'
                      ? [
                          { label: '7 to 10 days', value: 1 },
                          { label: '2 weeks to 1 month', value: 2 },
                          { label: '1 to 6 months', value: 3 },
                          { label: 'greater than 6 months', value: 4 },
                          { label: 'greater than', value: 5 },
                        ]
                      : [
                          { label: 'Yes', value: 1 },
                          { label: 'No', value: 0 },
                          { label: 'Undiagnosed', value: 2 },
                        ];
                  return item?.parent_meta_name
                    ? [...questionList].slice(0, -1).map((itemM, indexM) => {
                        console.log('itemM', itemM);
                        return (
                          item?.parent_meta_name === itemM?.meta_name &&
                          (itemM?.meta_name === 'None_Ther'
                            ? itemM?.answer === 0
                            : itemM?.answer === 1) &&
                          renderQuestion(item, index, type_arr)
                        );
                      })
                    : renderQuestion(item, index, type_arr);
                })
              ) : (
                // Use the original questionList without modifications
                questionList.map((item, index) => {
                  const type_arr =
                    item?.meta_name === 'HI_Recov'
                      ? [
                          { label: '7 to 10 days', value: 1 },
                          { label: '2 weeks to 1 month', value: 2 },
                          { label: '1 to 6 months', value: 3 },
                          { label: 'greater than 6 months', value: 4 },
                          { label: 'greater than', value: 5 },
                        ]
                      : [
                          { label: 'Yes', value: 1 },
                          { label: 'No', value: 0 },
                          { label: 'Undiagnosed', value: 2 },
                        ];
                  return item?.parent_meta_name
                    ? questionList.map((itemM, indexM) => {
                        console.log('itemM', itemM);
                        return (
                          item?.parent_meta_name === itemM?.meta_name &&
                          (itemM?.meta_name === 'None_Ther'
                            ? itemM?.answer === 0
                            : itemM?.answer === 1) &&
                          renderQuestion(item, index, type_arr)
                        );
                      })
                    : renderQuestion(item, index, type_arr);
                })
              )
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
        )}
      </View>
    </View>
  );
};

export default forwardRef(ProfilehistoryButton);
