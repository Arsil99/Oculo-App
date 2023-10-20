import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import HeaderBar from '@components/HeaderBar';
import TabSwitch from '@components/TabSwitch';
import { BaseColors } from '@config/theme';
import { Images } from '@config';
import CardList from '@components/CardList';
import { useSelector } from 'react-redux';
import BaseSetting from '@config/setting';
import { getApiData } from '@utils/apiHelper';
import SpiderWebChart from '@components/SpiderWebChart';
import { Slider } from '@miblanchard/react-native-slider';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import EventDetailComponent from '@components/EventDetailComponent';
import { isArray, isEmpty, isNull } from 'lodash';
import Modal from 'react-native-modal';

export default function EventDetails({ navigation, route }) {
  const event_title = route?.params;
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
  const [isModalVisible, setModalVisible] = useState(false);
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
        const today = moment(new Date()).format('YYYY-MM-DD');

        const dateObj = res?.data?.filter(item => item.date === today);

        delete dateObj[0].assessment_id;
        delete dateObj[0].date;

        for (const item of dateObj) {
          setModalVisible(isNull(Object.values(item)[0]?.curr_value));
          break;
        }

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
              iconName="tasks"
              backgroundColoricon={BaseColors.primary}
              othericons
              tasks
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

  const eventDescriptions = {
    Headache: 'Headache',
    Press_Head: 'Pressure in Head',
    Neck_Pain: 'Neck Pain',
    Nausea: 'Nausea',
    Dizziness: 'Dizziness',
    Vis_Prob: 'Blurred Vision/Vision',
    Balance: 'Balance Problem',
    Sens_Light: 'Sensitivity to Light',
    Sens_Noise: 'Sensitivity to Noise',
    Slow: 'Feeling Slowed Down',
    Foggy: 'Feeling like a Fog',
    Not_Right: "Don't Feel Right",
    Diff_Concen: 'Difficulty Concentrating',
    Diff_Rem: 'Difficulty Remembering',
    Fatigue: 'Fatigue / Low Energy',
    Confused: 'Confusion',
    Drowsy: 'Drowsiness',
    Emotional: 'More Emotional',
    Irritable: 'Irritability',
    SadDep: 'Sadness',
    Nerv_Anx: 'Nervous / Anxiousness',
    Trouble_Sleep: 'Trouble Falling Asleep',
  };

  const handleattempt = () => {
    setModalVisible(false);
    pendingData[0]['details']['event_title'] =
      listOfAssessments?.event_details?.title;
    navigation.navigate('Assessment', pendingData[0]);
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
        HeaderText={`Event Report (${datas.title || event_title})`}
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
                <Text
                  style={[
                    styles.label,
                    {
                      color: darkmode ? BaseColors.white : BaseColors.textColor,
                    },
                  ]}
                >
                  Compare your assessments
                </Text>

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
                    <Text
                      key={index}
                      style={[
                        styles.rangeLabel,
                        {
                          color: darkmode
                            ? BaseColors.white
                            : BaseColors.black90,
                        },
                      ]}
                    >
                      {label}
                    </Text>
                  ))}
                </View>

                <View style={styles.rangeLabelsContainer}>
                  {month?.map((label, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.rangeLabel,
                        {
                          color: darkmode
                            ? BaseColors.white
                            : BaseColors.black90,
                        },
                      ]}
                    >
                      {label}
                    </Text>
                  ))}
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                }}
              >
                <Modal
                  isVisible={isModalVisible}
                  style={styles.modal}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={500}
                  animationOutTiming={500}
                  backdropTransitionInTiming={500}
                  backdropTransitionOutTiming={500}
                >
                  <View style={styles.modalContent}>
                    <Text style={{ fontSize: 80 }}>👩‍⚕️</Text>
                    <Text>Hi 👋 Your today's Assessment is incomplete. </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '80%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.button,
                          { borderWidth: 1, borderColor: BaseColors.secondary },
                        ]}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={{ color: BaseColors.secondary }}>
                          Skip now
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor: BaseColors.secondary,
                          },
                        ]}
                        onPress={() => handleattempt()}
                      >
                        <Text style={{ color: BaseColors.white }}>Attempt</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          ) : loader === false ? (
            <EventDetailComponent
              eventDetail={eventDetail}
              datas={datas}
              navigation={navigation}
              darkmode={darkmode}
              eventDescriptions={eventDescriptions}
              getSymptomIconComponent={getSymptomIconComponent}
              calculateIconColor={calculateIconColor}
            />
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
