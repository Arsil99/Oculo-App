import { View, Text, SafeAreaView, TextInput, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import HeaderBar from '@components/HeaderBar';
import Button from '@components/Button';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BaseColors } from '@config/theme';
import { useSelector } from 'react-redux';
const Comment = ({ navigation, route }) => {
  const { darkmode } = useSelector(state => state.auth);
  const eventId = route?.params?.event_id || route?.params?.eventId;
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
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);
  const handleBackPress = () => {
    navigation.navigate('Events');
    return true;
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
        },
      ]}
    >
      <HeaderBar HeaderText={'Symptoms'} HeaderCenter />
      <View style={styles.main}>
        <View style={styles.topTitle}>
          <Text
            style={[
              styles.titleOne,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            Assessment Completed
          </Text>
          <Text
            style={[
              styles.titleTwo,
              { color: darkmode ? BaseColors.white : BaseColors.black90 },
            ]}
          >
            Thank you for completing your subsequent visit assessment.
          </Text>

          <View style={styles.innerView}>
            <Text
              style={[
                styles.titleThree,
                { color: darkmode ? BaseColors.white : BaseColors.black90 },
              ]}
            >
              Any additional comments you would like to share with your
              provider?
            </Text>
            <TextInput
              placeholder="Share your comments..."
              style={[
                styles.inputBar,
                {
                  borderColor: darkmode ? BaseColors.white : BaseColors.black90,
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                },
              ]}
              value={commentText}
              multiline
              onChangeText={value => setCommentText(value)}
              placeholderTextColor={
                darkmode ? BaseColors.white : BaseColors.black90
              }
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
