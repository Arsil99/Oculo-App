import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import { getApiDataProgress } from '@utils/apiHelper';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function ProfilehistoryButton(props) {
  const { editHistory } = props;
  const [questionList, setQuestionList] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    QuestionListAPI();
  }, []);

  const QuestionListAPI = async () => {
    setLoader(true);
    const endPoint = BaseSetting.endpoints.question;
    try {
      const res = await getApiDataProgress(endPoint, 'GET');
      if (res?.status) {
        console.log('res======>', res);
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

  const handleButtonPress = (itemId, buttonType) => {
    const updatedData = questionList.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          buttonColor: buttonType,
        };
      }
      return item;
    });
    setQuestionList(updatedData);
    const postData = {
      itemId: itemId,
      buttonType: buttonType,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleTextcontainer}>
        <Text style={styles.titleText}>Medical History</Text>
      </View>
      <View style={styles.mainDiv}>
        {loader ? (
          <ActivityIndicator
            size={'large'}
            color={BaseColors.primary}
            animating={true}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {questionList.map(item => (
              <View key={item.id}>
                <Text style={[styles.questionText]}>{item.question}</Text>
                {editHistory ? (
                  <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                      onPress={() => handleButtonPress(item.id, 'Yes')}
                      style={[
                        {
                          backgroundColor:
                            item.buttonColor === 'Yes'
                              ? BaseColors.secondary
                              : BaseColors.white,
                        },
                        styles.yesbutton,
                      ]}
                      activeOpacity={BaseSetting.buttonOpacity}
                    >
                      <Text
                        style={
                          ([styles.yesText],
                          {
                            color:
                              item.buttonColor === 'Yes'
                                ? BaseColors.white
                                : BaseColors.textColor,
                          })
                        }
                      >
                        Yes
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleButtonPress(item.id, 'No')}
                      style={[
                        {
                          backgroundColor:
                            item.buttonColor === 'No'
                              ? BaseColors.secondary
                              : BaseColors.white,
                        },
                        styles.nobutton,
                      ]}
                      activeOpacity={BaseSetting.buttonOpacity}
                    >
                      <Text
                        style={
                          ([styles.yesText],
                          {
                            color:
                              item.buttonColor === 'No'
                                ? BaseColors.white
                                : BaseColors.textColor,
                          })
                        }
                      >
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.subtitleText}>Yes</Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
