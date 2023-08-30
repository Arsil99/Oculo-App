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
import { ScrollView } from 'react-native-gesture-handler';

export default function Events({ navigation }) {
  const [eventDetails, setEventDetails] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      EventListData();
    });

    return unsubscribe;
  }, [navigation]);
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
    <View style={{ flexGrow: 1 }}>
      <HeaderBar HeaderText={'Events'} HeaderCenter />
      <ScrollView
        style={[
          styles.main,
          {
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.lightBg,
          },
        ]}
      >
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
            rightArrow
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
                rightArrow={
                  item?.symptom_info +
                    item?.immediate_recall +
                    item?.digit_recall ===
                  3
                    ? false
                    : true
                }
                onPress={() =>
                  item?.symptom_info +
                    item?.immediate_recall +
                    item?.digit_recall ===
                  3
                    ? null
                    : navigation.navigate(
                        item?.symptom_info
                          ? item?.immediate_recall
                            ? 'Recalldigits'
                            : 'Wordlist'
                          : 'Assessment',
                        { event_id: item?.id, otherData: item },
                      )
                }
                image={Images.emoji1}
                data={item?.createdAt}
                status={`${
                  item?.symptom_info +
                    item?.immediate_recall +
                    item?.digit_recall ===
                  3
                    ? 'Completed'
                    : 'Pending'
                }`}
                assessment={`Assessment ${
                  Number(item?.symptom_info) +
                  Number(item?.immediate_recall) +
                  Number(item?.digit_recall)
                }/3`}
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
            Closed Events (Static)
          </Text>

          <CardList
            rightArrow
            onPress={() => navigation.navigate('EventDetails')}
            image={Images.emoji1}
            data={'March 30, 2000'}
            status={'Completed'}
            assessment={'Assessment 4/5'}
          />
          <CardList
            rightArrow
            onPress={() => navigation.navigate('EventDetails')}
            image={Images.emoji1}
            data={'March 30, 2000'}
            status={'Completed'}
            assessment={'Assessment 4/5'}
          />
        </View>
      </ScrollView>
    </View>
  );
}
