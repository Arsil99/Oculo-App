import HeaderBar from '@components/HeaderBar';
import BaseSetting from '@config/setting';
import { BaseColors } from '@config/theme';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StatusBar, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function ChangeInfo({ navigation }) {
  const [buttonColor, setButtonColor] = useState(BaseColors.secondary);
  const [textColor, setTextColor] = useState(BaseColors.white);
  const [editHistory, setEditHistory] = useState(false);
  const [rightHistoryText, setRightHistoryText] = useState('Edit');

  const handlePress = () => {
    if (buttonColor === BaseColors.white) {
      setButtonColor(BaseColors.secondary);
      setTextColor(BaseColors.white);
    } else {
      setButtonColor(BaseColors.white);
      setTextColor(BaseColors.textColor);
    }
  };
  const HandleHistoryUpdateBtn = () => {
    setEditHistory(!editHistory);
    setRightHistoryText(rightHistoryText === 'Edit' ? 'Save' : 'Edit');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BaseColors.white} />

      <HeaderBar
        HeaderText={'Changed Info'}
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
        <View>
          <Text style={styles.titleText}>
            Please select any info that has changed:
          </Text>
          <Text style={styles.subtitleText}>
            Have you undergone previous treatment for your current or any
            previous concussion/head injury(s)?
          </Text>
        </View>
        {editHistory ? (
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={[styles.yesbutton, { backgroundColor: buttonColor }]}
              onPress={handlePress}
              activeOpacity={BaseSetting.buttonOpacity}
            >
              <Text style={[styles.buttonText, { color: textColor }]}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nobutton,
                {
                  backgroundColor:
                    buttonColor === BaseColors.white
                      ? BaseColors.secondary
                      : BaseColors.white,
                },
              ]}
              onPress={handlePress}
              activeOpacity={BaseSetting.buttonOpacity}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      buttonColor === BaseColors.white
                        ? BaseColors.white
                        : BaseColors.textColor,
                  },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.subtitleText}>Yes</Text>
        )}
      </View>
    </View>
  );
}
