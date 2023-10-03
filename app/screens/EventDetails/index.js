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

export default function EventDetails({ navigation, route }) {
  let eventId = route?.params?.event_id;
  let patientId = route?.params?.otherData?.patient_id;
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
    const endPoint = `${BaseSetting.endpoints.spiderReport}?want_from=web&patient_id=${patientId}&event_id=${eventId}`;
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

  const [sliderValue, setSliderValue] = useState(7);

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
              <SpiderWebChart />
              <Text style={styles.label}>Compare your assessments</Text>

              <Slider
                value={sliderValue} // Replace with your slider value (7, 8, 9, or 10)
                minimumValue={7}
                maximumValue={10}
                step={1}
                style={styles.slider}
                trackMarks={[
                  { label: '7', value: 7 },
                  { label: '8', value: 8 },
                  { label: '9', value: 9 },
                  { label: '10', value: 10 },
                ]}
                thumbStyle={styles.thumbStyle}
                thumbTintColor={BaseColors.white}
                minimumTrackTintColor={BaseColors.primary}
                maximumTrackTintColor={BaseColors.tabinActive}
                onValueChange={value => {
                  // Handle the slider value change here
                  let selectedLabel = '';

                  switch (value) {
                    case 7:
                      selectedLabel = 'Aug 03';
                      break;
                    case 8:
                      selectedLabel = 'Aug 07';
                      break;
                    case 9:
                      selectedLabel = 'Aug 14';
                      break;
                    case 10:
                      selectedLabel = 'Aug 15';
                      break;
                    default:
                      selectedLabel = '';
                      break;
                  }
                }}
              />

              <View style={styles.rangeLabelsContainerr}>
                <Text>7</Text>
                <Text>8</Text>
                <Text>9</Text>
                <Text>10</Text>
              </View>

              <View style={styles.rangeLabelsContainer}>
                {['Aug 03', 'Aug 07', 'Aug 14', 'Aug 15'].map(label => (
                  <Text key={label} style={styles.rangeLabel}>
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
