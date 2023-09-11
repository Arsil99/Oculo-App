import React, { useState } from 'react';
import Button from '@components/Button';
import HeaderBar from '@components/HeaderBar';
import { BaseColors } from '@config/theme';
import { View, Text, Switch } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import { getApiData } from '@utils/apiHelper';
import BaseSetting from '@config/setting';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const NewEvent = () => {
  const { darkmode } = useSelector(state => state.auth);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const eyeTrackingValue = isSwitchOn ? 1 : 0;

  const getCurrentDate = () => {
    const date = new Date();
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  async function handlePostData() {
    const currentDate = getCurrentDate();

    try {
      const response = await getApiData(
        BaseSetting.endpoints.createEvent,
        'POST',
        {
          event_type: 1, // Static value
          title: currentDate,
          eye_tracking: eyeTrackingValue, // Set based on the switch
          created_from: 'app', // Static value
        },
        '',
        false,
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
    <View
      style={{
        flex: 1,
        backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
      }}
    >
      <HeaderBar HeaderText={'Create New Event '} HeaderCenter />
      <View
        style={{ borderBottomColor: BaseColors.white, borderBottomWidth: 0.5 }}
      ></View>

      <View style={{ flex: 0.9, marginHorizontal: 25 }}>
        <Text
          style={[
            styles.genderTitle,
            {
              color: darkmode ? BaseColors.white : BaseColors.black90,
              marginTop: 20,
            },
          ]}
        >
          Event Title :
        </Text>
        <View style={[styles.genderBox]}>
          <Text style={[styles.genderTitle]}>{getCurrentDate()}</Text>
        </View>

        <Text
          style={[
            styles.genderTitle,
            {
              color: darkmode ? BaseColors.white : BaseColors.black90,
              marginTop: 20,
            },
          ]}
        >
          Eye Tracking :{'\n'}
        </Text>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Switch
            value={isSwitchOn}
            onValueChange={value => setIsSwitchOn(value)}
            thumbColor={isSwitchOn ? BaseColors.primary : BaseColors.textColor}
            trackColor={{ false: 'gray', true: 'lightgray' }}
          />
        </View>

        <Text
          style={[
            styles.genderTitle,
            {
              color: darkmode ? BaseColors.white : BaseColors.black90,
              marginTop: 20,
            },
          ]}
        >
          Event Type :
        </Text>

        <View style={[styles.genderBox]}>
          <Text style={[styles.genderTitle]}>Baseline</Text>
        </View>
      </View>
      <View style={{ flex: 0.1, marginHorizontal: 25 }}>
        <Button shape="round" title="Submit" onPress={handlePostData} />
      </View>
    </View>
  );
};

export default NewEvent;
