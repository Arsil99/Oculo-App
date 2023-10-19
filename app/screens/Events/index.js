import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardList from '@components/CardList';
import { Images } from '@config';
import HeaderBar from '@components/HeaderBar';
import { useDispatch, useSelector } from 'react-redux';
import { BaseColors } from '@config/theme';
import BaseSetting from '@config/setting';
import { isEmpty, isArray, isNumber, isNull } from 'lodash';
import { getApiData } from '@utils/apiHelper';
import { ScrollView } from 'react-native-gesture-handler';
import NoData from '@components/NoData';
import NetInfo from '@react-native-community/netinfo';
import Authentication from '@redux/reducers/auth/actions';
import { Alert } from 'react-native';
export default function Events({ navigation }) {
  const { setEventListData } = Authentication;
  const dispatch = useDispatch();
  const { darkmode, eventListData } = useSelector(state => state.auth);
  const [eventDetails, setEventDetails] = useState([]);
  const [loader, setLoader] = useState(true);

  // display the questions list
  const EventListData = async () => {
    const endPoint = `${BaseSetting.endpoints.eventList}?created_from=app`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        dispatch(setEventListData(res?.data?.events));
        setEventDetails(res?.data?.events);
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      console.log('📌 ⏩ file: index.js:24 ⏩ LangListAPI ⏩ error:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      EventListData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    EventListData();
    checkInternetConnection();
  }, []);

  const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert('No Internet', 'Please check your network settings');
      setEventDetails(eventListData);
    }
  };

  return (
    <View style={{ flexGrow: 1 }}>
      <HeaderBar HeaderText={'Events'} HeaderCenter />
      <View style={{ marginTop: darkmode ? 0 : 3 }} />
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
            onPress={() => navigation.navigate('CalibrationInstruction')}
            iconName="head-cog"
            backgroundColoricon={BaseColors.primary}
            showmanIcon={true}
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

          {loader ? (
            <ActivityIndicator size={'large'} />
          ) : !isEmpty(eventDetails) && isArray(eventDetails) ? (
            eventDetails?.map((item, index) => {
              let filled_count =
                Number(
                  item.symptom_info &&
                    !isNull(item.symptom_info) &&
                    item.symptom_info == 1
                    ? 1
                    : 0,
                ) +
                Number(
                  item.immediate_recall &&
                    !isNull(item.immediate_recall) &&
                    item.immediate_recall == 1
                    ? 1
                    : 0,
                ) +
                Number(
                  item.digit_recall &&
                    !isNull(item.digit_recall) &&
                    item.digit_recall == 1
                    ? 1
                    : 0,
                ) +
                Number(
                  item.treatment_info &&
                    !isNull(item.treatment_info) &&
                    item.treatment_info == 1
                    ? 1
                    : 0,
                );

              let total_count =
                Number(isNumber(item.symptom_info) ?? 1) +
                Number(isNumber(item.immediate_recall) ?? 1) +
                Number(isNumber(item.digit_recall) ?? 1) +
                Number(isNumber(item.treatment_info) ?? 1);
              return (
                <CardList
                  key={index}
                  iconName="head-cog"
                  backgroundColoricon={BaseColors.primary}
                  showmanIcon={true}
                  rightArrow={
                    (item.symptom_info ?? 1) +
                      (item.immediate_recall ?? 1) +
                      (item.digit_recall ?? 1) +
                      (item.treatment_info ?? 1) ===
                    4
                      ? true
                      : true
                  }
                  onPress={() => navigation.navigate('EventDetails', item)}
                  image={Images.manimage}
                  data={item?.title}
                  status={`${
                    filled_count === total_count ? 'Completed' : 'Pending'
                  }`}
                  assessment={`Assessment ${filled_count} / ${total_count}`}
                />
              );
            })
          ) : (
            <NoData title={'Events are not available'} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
