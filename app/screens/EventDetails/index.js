import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  processColor,
} from 'react-native';
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
import { LineChart } from 'react-native-charts-wrapper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
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
  const [loader, setLoader] = useState(true);
  const [eventDetail, setEventDetail] = useState([]);
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
        const newObj = res?.data.filter(
          item => !item.hasOwnProperty('initial'),
        );
        setGraph(newObj);
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

    const result = Object.entries(filteredData).map(([label, value]) => ({
      label,
      value: value.curr_value,
    }));

    const filteredData1 = result.filter(
      item => item.label !== 'assessment_id' && item.label !== 'date',
    );

    // Create a new array in the desired format
    const transformedData = Object?.entries(filteredData)?.map(
      ([key, value]) => {
        if (key === 'assessment_id' || key === 'date') {
          return { [key]: value };
        } else {
          return {
            label: key,
            initial_value: value.initial_value,
            curr_value: value.curr_value,
          };
        }
      },
    );
    delete transformedData.assessment_id;
    delete transformedData.date;

    // Filter out "date" and "assessment_id"
    const newBundle = transformedData.filter(
      item => !item.date && !item.assessment_id,
    );

    setWrapData(newBundle);

    const convertedData = filteredData1.reduce((result, item) => {
      result[item.label] = item.value;
      return result;
    }, {});

    setSpiderItems(convertedData);
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
              rightArrow={
                title !== 'Completed Assessments' &&
                title !== 'Assessment Missed'
                  ? true
                  : false
              }
              assessment={`Date: ${item.details.date.split(',')[0]}`}
              onPress={() => {
                title !== 'Completed Assessments' &&
                title !== 'Assessment Missed'
                  ? ((item['details']['event_title'] = eventTitle),
                    navigation.navigate('Assessment', item))
                  : null;
              }}
            />
          ))}
      </>
    );
  };

  // DETAIL TAB RELATED CODE
  useEffect(() => {
    ChartData();
  }, []);

  const ChartData = async () => {
    setLoader(true);
    const endPoint = `${BaseSetting.endpoints.zigzagReports}?want_from=app&event_id=${eventId}&metric_name=Headache`;
    try {
      const res = await getApiData(`${endPoint}`, 'GET');

      if (res?.status) {
        setEventDetail(res?.data);
      } else {
        setEventDetail([]);
      }
      setLoader(false);
    } catch (error) {
      console.log('🚀 ~ file: index.js:156 ~ ChartData ~ error:', error);
      setLoader(false);
    }
  };
  const convertDataForChart = data => {
    const chartData = {
      dataSets: [],
    };

    for (const [eventType, eventData] of Object.entries(data)) {
      const dataSet = {
        label: eventType,
        values: eventData.map(item => item.value),

        config: {
          color: processColor(BaseColors.primary),
          drawValues: false,
          drawCircles: false,
          lineWidth: 2,
          drawCubicInterpolation: true,
          circleRadius: 5,
          circleColor: '#fff',
          circleHoleColor: '#ff0000',
          drawFilled: true,
          fillColor: '#ff000080',
          fillAlpha: 0.5,
        },
      };

      chartData.dataSets.push(dataSet);
    }

    return chartData;
  };

  const eventDetails = {
    Headache: [
      {
        date: 'Oct 8',
        value: 2,
      },
      {
        date: 'Oct 9',
        value: 0,
      },
      {
        date: 'Oct 11',
        value: 0,
      },
      {
        date: 'Oct 12',
        prev_value: 0,
        value: 1,
      },
    ],
    Neck_Pain: [
      {
        date: 'Oct 8',
        value: 4,
      },
      {
        date: 'Oct 9',
        value: 0,
      },
      {
        date: 'Oct 11',
        value: 0,
      },
      {
        date: 'Oct 12',
        prev_value: 4,
        value: 2,
      },
    ],
  };

  const chartData = convertDataForChart(eventDetail);
  chartData.dataSets.forEach(dataset => {
    dataset.config.label = ''; // or null
  });

  const CommonLineChart = ({ eventName, data }) => {
    return (
      <View
        style={{
          flex: 1,
          marginLeft: -15,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <LineChart
          data={convertDataForChart({ [eventName]: data })}
          drawValues={false}
          drawCircles={false}
          xAxis={{ drawLabels: false, drawGridLines: false, enabled: false }}
          yAxisLeft={{ drawLabels: false, drawGridLines: false }}
          chartDescription={{ text: '' }}
          legend={{ enabled: false }}
          style={{ width: 131, height: 60 }}
          drawXAxis={false}
          yAxisRight={null}
          drawYAxis={false}
          drawGridBackground={false}
          yAxis={{
            left: {
              granularity: 6,
              drawLabels: false, // Hide labels on the y-axis
              drawGridLines: false, // Hide grid lines on the y-axis
              drawYAxis: false,
              enabled: false,
            },
            right: {
              enabled: false,
              drawGridLines: false, // Hide grid lines on the y-axis
              drawYAxis: false,
            },
          }}
          chartConfig={{
            drawGridBackground: false,
          }}
        />
      </View>
    );
  };
  function getSymptomIconComponent(symptomName) {
    const symptomIcons = {
      Headache: 'eye',
      Press_Head: 'eye',
      Neck_Pain: 'eye',
      Nausea: 'eye',
      Dizziness: 'dizzy',
      Vis_Prob: 'eye',
      Balance: 'eye',
      Sens_Light: 'eye',
      Sens_Noise: 'eye',
      Slow: 'eye',
      Foggy: 'eye',
      Not_Right: 'closecircleo',
      Diff_Concen: 'eye',
      Diff_Rem: 'eye',
      Fatigue: 'eye',
      Confused: 'eye',
      Drowsy: 'eye',
      Emotional: 'eye',
      Irritable: 'eye',
      SadDep: 'sad-eye',
      Nerv_Anx: 'eye',
      Trouble_Sleep: 'eye',
    };

    const iconName = symptomIcons[symptomName];

    if (iconName) {
      if (iconName === 'dizzy') {
        return (
          <Image
            source={Images.dizzy}
            style={{ width: 14, height: 14, tintColor: BaseColors.white }}
          />
        );
      } else {
        return <Icon name={iconName} size={14} color="white" />;
      }
    } else {
      return null;
    }
  }
  const calculateArrow = (prevValue, value) => {
    const diff = value - prevValue;
    return diff >= 0 ? 'caretup' : 'caretdown';
  };
  const calculateIconColor = (prevValue, value) => {
    const diff = Math.abs(value - prevValue);

    if (diff === 0) {
      return BaseColors.black400;
    } else if (diff === 1) {
      return BaseColors.primaryBlue300;
    } else if (diff === 2) {
      return BaseColors.primaryBlue400;
    } else if (diff === 3) {
      return BaseColors.primaryBlue500;
    } else if (diff === 4) {
      return BaseColors.primaryBlue600;
    } else if (diff === 5) {
      return BaseColors.primaryBlue700;
    } else if (diff === 6) {
      return BaseColors.primaryBlue900;
    } else {
      return BaseColors.black400;
    }
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
            <ScrollView
              style={{
                height: BaseSetting.nHeight / 1.5,
              }}
            >
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
            </ScrollView>
          ) : loader === false ? (
            <ScrollView style={{ height: BaseSetting.nHeight / 1.5 }}>
              <View style={styles.container}>
                {Object.keys(eventDetail).map((eventName, index) => (
                  <TouchableOpacity
                    key={eventName}
                    style={styles.eventContainer}
                    onPress={() => {
                      navigation.navigate('Dashboard', {
                        eventName: eventName,
                        eventData: eventDetail[eventName],
                        title: datas.title,
                        eventDetail: eventDetail,
                        dotnumber: index,
                      });
                    }}
                    activeOpacity={BaseSetting.buttonOpacity}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ height: 45, width: 90 }}>
                        <Text
                          style={[
                            styles.textt,
                            {
                              color: darkmode
                                ? BaseColors.white
                                : BaseColors.black90,
                            },
                          ]}
                        >
                          {eventName}
                        </Text>
                      </View>
                      <View style={styles.iconContainer}>
                        {getSymptomIconComponent(eventName)}
                      </View>
                    </View>

                    <CommonLineChart
                      eventName={eventName}
                      data={eventDetail[eventName]}
                    />

                    {eventDetail[eventName]
                      .filter(
                        item =>
                          item.prev_value !== undefined &&
                          item.value !== undefined,
                      )
                      .map(item => (
                        <View key={item.date} style={styles.itemContainer}>
                          <Text
                            style={{
                              color: calculateIconColor(
                                item.prev_value,
                                item.value,
                              ),
                              marginRight: 3,
                            }}
                          >
                            {Math.abs(item.prev_value - item.value)}
                          </Text>
                          <View style={{ marginTop: 2 }}>
                            <Icon2
                              name={calculateArrow(item.prev_value, item.value)}
                              size={10}
                              color={calculateIconColor(
                                item.prev_value,
                                item.value,
                              )}
                            />
                          </View>
                        </View>
                      ))}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: BaseSetting.nHeight / 5,
              }}
            >
              <ActivityIndicator
                size={'large'}
                color={BaseColors.primary}
                animating={true}
              />
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
              title="Assessment Due"
              darkmode={darkmode}
              navigation={navigation}
              eventTitle={listOfAssessments?.event_details?.title}
            />

            <AssessmentList
              data={completedData}
              title="Completed Assessments"
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
