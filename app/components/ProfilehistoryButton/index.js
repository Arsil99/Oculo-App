import { BaseColors } from '@config/theme';
import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';

export default function ProfilehistoryButton() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Do you have a Headache/Migraine disorder?	',
      subtitle: 'Yes',
      selectedButton: 1,
    },
    {
      id: 2,
      title: 'Do you have any learning disabilities such as ADHD/ADD, etc.?	',
      subtitle: 'Yes',
      selectedButton: 1,
    },
    {
      id: 3,
      title:
        'Have you previously been diagnosed with a concussion/head injury?	',
      subtitle: 'No',
      selectedButton: 1,
    },
    {
      id: 4,
      title: 'If yes, how many concussions have been diagnosed?',
      subtitle: '02',
      selectedButton: 1,
    },
    {
      id: 5,
      title: 'If yes, what was the length of time you went through treatment?',
      subtitle: '6 weeks',
      selectedButton: 1,
    },
    {
      id: 6,
      title: 'If yes, how long did recovery take?',
      subtitle: '32 weeks',
      selectedButton: 1,
    },
  ]);

  const handleButtonPress = (itemId, buttonIndex) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, selectedButton: buttonIndex };
        }
        return item;
      });
      return updatedItems;
    });
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
          {items?.map((item, index) => {
            return (
              <View>
                <Text style={[styles.questionText]}>{item.title}</Text>
                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    onPress={() => handleButtonPress(item.id, 1)}
                    style={[
                      {
                        backgroundColor:
                          item.selectedButton === 1
                            ? BaseColors.secondary
                            : null,
                      },
                      styles.yesbutton,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={
                        ([styles.yesText],
                        {
                          color:
                            item.selectedButton === 1
                              ? BaseColors.white
                              : BaseColors.textColor,
                        })
                      }
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleButtonPress(item.id, 2)}
                    style={[
                      {
                        backgroundColor:
                          item.selectedButton === 2
                            ? BaseColors.secondary
                            : null,
                        color:
                          item.selectedButton === 2
                            ? BaseColors.white
                            : BaseColors.textColor,
                      },
                      styles.nobutton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.noText,
                        {
                          color:
                            item.selectedButton === 2
                              ? BaseColors.white
                              : BaseColors.textColor,
                        },
                      ]}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
