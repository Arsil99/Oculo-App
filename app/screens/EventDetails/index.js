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
import moment from 'moment';
import { isArray, isEmpty } from 'lodash';
export default function EventDetails({ navigation, route }) {
  const [graph, setGraph] = useState([]);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [spiderItems, setSpiderItems] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [wrapData, setWrapData] = useState([]);
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
        setGraph(res?.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const assessmentDueItems = datas.filter(
    assessment =>
      assessment.digit_recall === 0 ||
      assessment.immediate_recall === 0 ||
      assessment.symptom_info === 0 ||
      assessment.treatment_info === 0,
  );

  const completedAssessmentItems = datas.filter(
    assessment =>
      assessment.digit_recall !== 0 &&
      assessment.immediate_recall !== 0 &&
      assessment.symptom_info !== 0 &&
      assessment.treatment_info !== 0,
  );

  const shouldShowAssessmentDue = assessmentDueItems.length > 0;
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

  const runSlider = value => {
    const date = `${day[value]} - ${month[value]}`;
    const selectedDate = date?.replace(/\s/g, '');

    const dataObj = graph?.find(item => {
      return moment(item?.date).format('DD-MMM') === selectedDate;
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

    setWrapData(filteredData);

    // Only keys
    const keysArray = Object?.keys(filteredData);
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
                xxxxxxxxxxxx
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
                xxxxxxxxxxxxxxxxxxxxxx
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
              <SpiderWebChart items={spiderItems} bundle={wrapData} />
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
              {shouldShowAssessmentDue
                ? 'Assessment Due'
                : 'Completed Assessments'}
            </Text>
            {assessmentDueItems.map((assessment, index) => (
              <CardList
                key={index}
                image={Images.eventlogo}
                data={`Assessment ${index + 1}`}
                status={assessment.assmt_type}
                assessment={`Event: ${assessment.title}`}
                onPress={() => {
                  navigation.navigate('Assessment', assessment);
                }}
              />
            ))}
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
            {completedAssessmentItems.map((assessment, index) => (
              <CardList
                key={index}
                image={Images.eventlogo}
                data={`Assessment ${index + 1}`}
                status={assessment.assmt_type}
                assessment={`Event: ${assessment.title}`}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
