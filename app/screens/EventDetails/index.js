import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import HeaderBar from '@components/HeaderBar';
import TabSwitch from '@components/TabSwitch';
import { BaseColors } from '@config/theme';
import Milestones from '@components/Milestones';
import { Images } from '@config';
import CardList from '@components/CardList';
import { useSelector } from 'react-redux';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import SpiderWebChart from '@components/SpiderWebChart';
import { Slider } from '@miblanchard/react-native-slider';
import { staticGraph } from '@config/staticData';
export default function EventDetails({ navigation, route }) {
  const [graph, setGraph] = useState(staticGraph);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [spiderItems, setSpiderItems] = useState([]);
  let eventId = route?.params?.id;

  let datas = route?.params;

  const { darkmode } = useSelector(state => state.auth);
  // OUTER TABS
  const switchOptions = [
    { id: 'report', name: 'Report' },
    { id: 'assessments', name: 'Assessments' },
  ];

  const [activeTab, setActiveTab] = useState({
    id: 'report',
    name: 'Report',
  });

  // INNER TABS
  const switchInOptions = [
    { id: 'summary', name: 'Summary' },
    { id: 'details', name: 'Details' },
  ];

  const [activeInTab, setActiveInTab] = useState({
    id: 'summary',
    name: 'Summary',
  });
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    getSummary();
  }, []);
  const getSummary = async () => {
    const endPoint = `${BaseSetting.endpoints.spiderReport}?want_from=app&event_id=${eventId}`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        setGraphData(res?.data);
      } else {
        setGraphData([]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const [sliderValue, setSliderValue] = useState(10);
  useEffect(() => {
    let dayArr = [];
    let monthArr = [];
    graph?.forEach((item, index) => {
      if (index > 0) {
        dayArr.push(item?.date?.split('-')[0]);
        monthArr.push(item?.date?.split('-')[1]);
      }
    });
    setDay(dayArr);
    setMonth(monthArr);
  }, []);

  const runSlider = value => {
    const date = `${day[value]} - ${month[value]}`;
    const selectedDate = date?.replace(/\s/g, '');

    const dataObj = graph?.find(item => {
      return item?.date === selectedDate;
    });

    // Key and values
    const filteredData = Object?.keys(dataObj)
      .slice(0, -2)
      .reduce((acc, key) => {
        if (dataObj[key] !== null) {
          acc[key] = dataObj[key];
        }
        return acc;
      }, {});

    // Only keys
    const keysArray = Object.keys(filteredData);
    setSpiderItems(keysArray);
  };

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: darkmode ? BaseColors.lightBlack : BaseColors.white,
        },
      ]}
    >
      <HeaderBar
        HeaderText={'Event Report (Aug 03)'}
        HeaderCenter
        leftText="Back"
      />
      {/* SWITCH TAB */}

      <TabSwitch
        tabs={switchOptions}
        activeTab={activeTab}
        onTabChange={currentTab => {
          setActiveTab(currentTab);
        }}
      />

      {activeTab?.id === 'report' ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              marginVertical: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Event Type:{' '}
              </Text>
              <Text
                style={{
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Intial Visit
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                RTA Phase:{' '}
              </Text>
              <Text
                style={{
                  color: darkmode ? BaseColors.white : BaseColors.black90,
                }}
              >
                Symptom Limited Activity
              </Text>
            </View>
          </View>
          <TabSwitch
            insideTab
            tabs={switchInOptions}
            activeTab={activeInTab}
            onTabChange={currentTab => {
              setActiveInTab(currentTab);
            }}
          />
          {activeInTab.id === 'summary' ? (
            <View style={styles.spiderView}>
              <SpiderWebChart items={spiderItems} />
              <Text style={styles.label}>Compare your assessments</Text>

              <Slider
                value={sliderValue}
                minimumValue={0}
                maximumValue={Number(graph?.length) - 2}
                step={1}
                style={styles.slider}
                trackMarks={[
                  { label: '0', value: 0 },
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                ]}
                thumbStyle={styles.thumbStyle}
                thumbTintColor={BaseColors.white}
                minimumTrackTintColor={BaseColors.primary}
                maximumTrackTintColor={BaseColors.tabinActive}
                onValueChange={value => {
                  runSlider(value);
                  setSliderValue(value);
                }}
              />
              <View style={styles.markerContainer}>
                {graph
                  ?.map((value, index) => (
                    <View
                      style={[
                        styles.marker,
                        {
                          backgroundColor: BaseColors.lightGrey,
                        },
                      ]}
                      key={index}
                    />
                  ))
                  .slice(0, -1)}
              </View>

              {/* Display the range labels */}
              <View style={styles.rangeLabelsContainer}>
                {day?.map((label, index) => (
                  <Text key={index} style={styles.rangeLabel}>
                    {label}
                  </Text>
                ))}
              </View>

              <View style={styles.rangeLabelsContainer}>
                {month?.map((label, index) => (
                  <Text key={index} style={styles.rangeLabel}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.detailsArea}>
              <Milestones navigation={navigation} />
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
            flex: 1,
          }}
        >
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginVertical: 5,
                color: darkmode ? BaseColors.white : BaseColors.black,
              }}
            >
              Assessment Due
            </Text>
            <CardList
              rightArrow={true}
              image={Images.eventlogo}
              data={'Assessment 2'}
              status={'Subsequent Visit'}
              assessment={'Event: Aug 03'}
              onPress={() => {
                navigation.navigate('Assessment', datas);
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                marginVertical: 5,
                color: darkmode ? BaseColors.white : BaseColors.black,
              }}
            >
              Completed Assessments
            </Text>
            <CardList
              image={Images.eventlogo}
              data={'Assessment 1'}
              status={'Initial Visit'}
              assessment={'Event: July 28'}
            />
          </View>
        </View>
      )}
    </View>
  );
}
