import BaseSetting from '@config/setting';
import { getApiDataProgress } from '@utils/apiHelper';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function ProfileHistory() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    QuestionListAPI();
  }, []);

  const QuestionListAPI = async () => {
    const endPoint = BaseSetting.endpoints.question;
    try {
      const res = await getApiDataProgress(endPoint, 'GET');
      if (res?.status) {
        setQuestionList(res?.data);
      } else {
        setQuestionList([]);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.maincontainer}>
        <View style={styles.titleTextcontainer}>
          <Text style={styles.titleText}>Medical History</Text>
        </View>
        <ScrollView
          style={styles.scrollcontainer}
          showsVerticalScrollIndicator={false}
        >
          {questionList?.map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.subtitleText}>Yes</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
