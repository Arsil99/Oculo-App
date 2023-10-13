import { View, Text, ScrollView } from 'react-native';
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
import moment from 'moment';
import { isArray, isEmpty } from 'lodash';
export default function EventDetails({ navigation, route }) {
  const eventType = route?.params?.event_name;
  const [graph, setGraph] = useState([]);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [spiderItems, setSpiderItems] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [defaultGraph, setDefaultGraph] = useState();
  const [wrapData, setWrapData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [missedData, setMissedData] = useState([]);
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
  useEffect(() => {
    getSummary();
  }, []);
  const getSummary = async () => {
    const endPoint = `${BaseSetting.endpoints.spiderReport}?want_from=app&event_id=${eventId}`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        // Key and values
        const keysToProcess = Object.keys(
          res?.data.find(item => item.initial === true),
        ).slice(0, -1);

        setInit(init);
        const filteredData = keysToProcess.reduce((acc, key) => {
          if (res?.data.find(item => item.initial === true)[key] !== null) {
            acc[key] = res?.data.find(item => item.initial === true)[key];
          }
          return acc;
        }, {});

        const filteredObject = {};
        for (const key in filteredData) {
          if (filteredData[key] !== 0) {
            filteredObject[key] = filteredData[key];
          }
        }
        // Remove the properties
        delete filteredObject.assessment_id;
        delete filteredObject.date;
        setDefaultGraph(filteredObject);
        setGraph(res?.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    let dayArr = [];
    let monthArr = [];
    if (!isEmpty(graph) && isArray(graph)) {
      graph?.forEach((item, index) => {
        dayArr.push(moment(item?.date).format('DD-MMM')?.split('-')[0]);
        monthArr.push(moment(item?.date).format('DD-MMM')?.split('-')[1]);
      });
    }
    setDay(dayArr);
    setMonth(monthArr);
  }, [graph]);

  const [init, setInit] = useState();

  const runSlider = value => {
    const date = `${day[value]} - ${month[value]}`;
    const selectedDate = date?.replace(/\s/g, '');

    const dataObj = graph?.find(item => {
      return moment(item?.date).format('DD-MMM') === selectedDate;
    });

    let init = dataObj['initial'];
    // Key and values
    const keysToProcess = init
      ? Object.keys(dataObj).slice(0, -1)
      : Object.keys(dataObj);
    setInit(init);
    const filteredData = keysToProcess.reduce((acc, key) => {
      if (dataObj[key] !== null) {
        acc[key] = dataObj[key];
      }
      return acc;
    }, {});

    const filteredObject = {};
    for (const key in filteredData) {
      if (filteredData[key] !== 0) {
        filteredObject[key] = filteredData[key];
      }
    }

    setWrapData(filteredObject);

    // Only keys
    const keysArray = Object?.keys(filteredData);

    //remove unwanted 2 keys
    const elementsToRemove = ['assessment_id', 'date'];
    const finalItems = keysArray?.filter(
      element => !elementsToRemove?.includes(element),
    );

    const matchingValues = finalItems?.filter(key =>
      filteredObject?.hasOwnProperty(key),
    );

    // data showing like label (0)
    const formattedLabels = matchingValues.map(
      label => `${label} [${filteredObject[label]}]`,
    );
    console.log(formattedLabels);
    setSpiderItems(formattedLabels);
  };

  // assments list
  const [listOfAssessments, setListOfAssessments] = useState([]);
  useEffect(() => {
    getAssessments();
  }, []);
  const getAssessments = async () => {
    const endPoint = `${BaseSetting.endpoints.eventDetails}?event_id=${eventId}`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');
      if (res?.status) {
        const dueArray = [];
        const completedArray = [];
        const missingArray = [];
        res?.data?.assessments?.map((item, index) => {
          if (item.details?.status === 'Completed') {
            completedArray.push(item);
          } else if (item.details?.status === 'Pending') {
            dueArray.push(item);
          } else if (item.details?.status === 'Missed') {
            missingArray.push(item);
          }
        });
        setPendingData(dueArray);
        setCompletedData(completedArray);
        setMissedData(missingArray);
        setListOfAssessments(res?.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // list optimization
  const AssessmentList = ({
    data,
    title,
    darkmode,
    navigation,
    eventTitle,
  }) => {
    return (
      <>
        {!isEmpty(data) && (
          <Text
            style={[
              styles.assessmentTag,
              { color: darkmode ? BaseColors.white : BaseColors.black },
            ]}
          >
            {title}
          </Text>
        )}
        {!isEmpty(data) &&
          data?.map((item, index) => (
            <CardList
              key={index}
              image={Images.eventlogo}
              data={item.details.assess_num}
              status={item.details.assessment_type}
              rightArrow={title !== 'Assessment Completed' ? true : false}
              assessment={`Date: ${item.details.date.split(',')[0]}`}
              onPress={() => {
                title !== 'Assessment Completed'
                  ? ((item['details']['event_title'] = eventTitle),
                    navigation.navigate('Assessment', item))
                  : null;
              }}
            />
          ))}
      </>
    );
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
        HeaderText={`Event Report (${datas.title})`}
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
                {eventType}
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
                xxxxx
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
              <SpiderWebChart
                items={spiderItems}
                bundle={wrapData}
                initial={init}
                defaultGraph={defaultGraph}
              />
              <Text style={styles.label}>Compare your assessments</Text>
              {!isEmpty(graph) && isArray(graph) ? (
                <Slider
                  value={sliderValue}
                  minimumValue={0}
                  maximumValue={graph?.length - 1}
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
              ) : null}

              <View style={styles.markerContainer}>
                {!isEmpty(graph) &&
                  isArray(graph) &&
                  graph?.map((value, index) => (
                    <View
                      style={[
                        styles.marker,
                        {
                          backgroundColor: BaseColors.lightGrey,
                        },
                      ]}
                      key={index}
                    />
                  ))}
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
              : BaseColors.lightBg,
            flex: 1,
          }}
        >
          <ScrollView style={{ paddingHorizontal: 15 }}>
            <AssessmentList
              data={pendingData}
              title="Assessment Pending"
              darkmode={darkmode}
              navigation={navigation}
              eventTitle={listOfAssessments?.event_details?.title}
            />

            <AssessmentList
              data={completedData}
              title="Assessment Completed"
              darkmode={darkmode}
              navigation={navigation}
              eventTitle={listOfAssessments?.event_details?.title}
            />

            <AssessmentList
              data={missedData}
              title="Assessment Missed"
              darkmode={darkmode}
              navigation={navigation}
              eventTitle={listOfAssessments?.event_details?.title}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
}
