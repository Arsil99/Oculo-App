import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardList from '@components/CardList';
import { Images } from '@config';
import HeaderBar from '@components/HeaderBar';
import { useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';

export default function Events({ navigation }) {
  const [eventDetails, setEventDetails] = useState([]);
  useEffect(() => {
    EventListData();
  }, []);
  // display the questions list
  const EventListData = async () => {
    const endPoint = `${BaseSetting.endpoints.eventList}?created_from=app`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        setEventDetails(res?.data?.events);
      }
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
    }
  };
  const { darkmode } = useSelector(state => state.auth);
  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode
            ? BaseColors.lightBlack
            : BaseColors.lightBg,
        },
      ]}
    >
      <HeaderBar HeaderText={'Events'} HeaderCenter />
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            color: darkmode ? BaseColors.white : BaseColors.black90,
          }}
        >
          Eye Tracking
        </Text>

        <CardList
          onPress={() => navigation.navigate('Callibration')}
          image={Images.emoji1}
          data={'Mar 30 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />

        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            color: darkmode ? BaseColors.white : BaseColors.black90,
          }}
        >
          Open Events
        </Text>
        {eventDetails?.map((item, index) => {
          return (
            <CardList
              key={index}
              onPress={() =>
                navigation.navigate('Symptoms', { event_id: item?.id })
              }
              image={Images.emoji1}
              data={item?.createdAt}
              status={'Completed'}
              assessment={'Assessment 4/5'}
            />
          );
        })}

        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            color: darkmode ? BaseColors.white : BaseColors.black90,
          }}
        >
          Closed Events
        </Text>

        <CardList
          onPress={() => navigation.navigate('EventDetails')}
          image={Images.emoji1}
          data={'March 30, 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />
        <CardList
          onPress={() => navigation.navigate('EventDetails')}
          image={Images.emoji1}
          data={'March 30, 2000'}
          status={'Completed'}
          assessment={'Assessment 4/5'}
        />
      </View>
    </View>
  );
}
