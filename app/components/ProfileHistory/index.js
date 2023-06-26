import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function ProfileHistory() {
  const data = [
    {
      title: 'Do you have a Headache/Migraine disorder?	',
      subtitle: 'Yes',
    },
    {
      title: 'Do you have any learning disabilities such as ADHD/ADD, etc.?	',
      subtitle: 'Yes',
    },
    {
      title:
        'Have you previously been diagnosed with a concussion/head injury?	',
      subtitle: 'No',
    },
    {
      title: 'If yes, how many concussions have been diagnosed?',
      subtitle: '02',
    },
    {
      title: 'If yes, what was the length of time you went through treatment?',
      subtitle: '6 weeks',
    },
    { title: 'If yes, how long did recovery take?', subtitle: '32 weeks' },
  ];
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
          {data?.map((item, index) => {
            return (
              <View>
                <Text style={styles.questionText}>{item.title}</Text>
                <Text style={styles.subtitleText}>{item.subtitle}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
