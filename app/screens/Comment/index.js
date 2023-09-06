import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import Button from '@components/Button';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const Comment = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;
  const [commentText, setCommentText] = useState('');
  async function commentPost() {
    try {
      const params = {
        event_id: eventId,
        comment: commentText,
        created_from: 'app',
      };
      const response = await getApiData(
        BaseSetting.endpoints.comment,
        'POST',
        params,
        '',
        false,
      );
      if (response?.status) {
        Toast.show({
          text1: response?.message.toString(),
          type: 'success',
        });
        navigation.navigate('Events');
      } else {
        Toast.show({
          text1: response?.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log('error while posting comment =======>>>', error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar HeaderText={'Symptoms'} HeaderCenter />
      <View style={styles.main}>
        <View style={styles.topTitle}>
          <Text style={styles.titleOne}>Assessment Completed</Text>
          <Text style={styles.titleTwo}>
            Thank you for completing your subsequent visit assessment.
          </Text>

          <View style={styles.innerView}>
            <Text style={styles.titleThree}>
              Any additional comments you would like to share with your
              provider?
            </Text>
            <TextInput
              placeholder="Share your comments..."
              style={styles.inputBar}
              value={commentText}
              onChangeText={value => setCommentText(value)}
            />
          </View>
        </View>

        <View />
        <View style={styles.doneBtn}>
          <Button shape="round" title={'Done'} onPress={commentPost} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
