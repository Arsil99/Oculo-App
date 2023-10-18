import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  processColor,
  ScrollView,
} from 'react-native';
import React from 'react';

import styles from './styles';
import { Image } from 'react-native';
import { Images } from '@config';
import { BaseColors, FontFamily } from '@config/theme';
import { useState } from 'react';
import HeaderBar from '@components/HeaderBar';
import BaseSetting from '@config/setting';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-charts-wrapper';

const Dashboard = ({ route }) => {
  const indexnumber = route.params.dotnumber;
  const dotdata = route.params.eventDetail;
  const eventNames = Object?.keys(dotdata);
  const title = route.params.title;
  const Header = route.params.eventName;
  const { darkmode } = useSelector(state => state.auth);
  const [activeIndex, setActiveIndex] = useState(indexnumber);

  const transformDataForChart = (dotdata, activeIndex) => {
    const activeKey = Object.keys(dotdata)[activeIndex];
    const activeData = dotdata[activeKey];

    const datasets = activeData.map(entry => {
      const value = entry.value || 0;
      return {
        y: value,
      };
    });

    // Map the colors dynamically based on severity levels
    const colors = activeData.map(entry => getNumberColor(entry.value));

    const circleRadius = 5.5;

    return [
      {
        values: datasets,
        config: {
          color: processColor(BaseColors.primary), // Line color
          drawValues: false,
          circleColors: colors.map(color => processColor(color)), // Dot colors
          filled: true,
          drawCircles: true,
          circleHoleColor: colors.map(color => processColor(color)), // Set the circle hole color to match dot color
          circleHoleRadius: 1,
          circleRadius: circleRadius,
        },
      },
    ];
  };

  const uniqueDates = Array.from(
    new Set(
      Object.values(dotdata)
        .flat()
        .map(entry => entry.date),
    ),
  );
  function getNumberColor(number) {
    switch (number) {
      case 0:
        return BaseColors.primaryBlue300;
      case 1:
        return BaseColors.primaryBlue400;
      case 2:
        return BaseColors.primaryBlue500;
      case 3:
        return BaseColors.primaryBlue600;
      case 4:
        return BaseColors.primaryBlue700;
      case 5:
        return BaseColors.primaryBlue900;
      default:
        return BaseColors.black400;
    }
  }

  const handleDotPress = index => {
    setActiveIndex(index);
  };
  const currentEventName = eventNames[activeIndex];
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkmode ? BaseColors.lightBlack : null,
      }}
    >
      <HeaderBar HeaderText={`Event ${title}`} HeaderCenter leftText="Back" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollcontainer,
          {
            backgroundColor: darkmode
              ? BaseColors.lightBlack
              : BaseColors.white,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageView}>
          <Image source={Images.emoji5} resizeMode="contain" />
          <Text
            style={[
              styles.headtext,
              { color: darkmode ? BaseColors.white : BaseColors.textColor },
            ]}
          >
            {` ${eventDescriptions[currentEventName]}`}
          </Text>
        </View>
        <View style={styles.subheaderContainer}>
          <View
            style={[
              styles.subheaderContainerr,
              {
                backgroundColor: darkmode
                  ? BaseColors.black70
                  : BaseColors.lightsky,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: darkmode ? BaseColors.white : BaseColors.textColor,
                },
              ]}
            >
              Baseline
            </Text>
            <Text style={[styles.number, { color: getNumberColor(3) }]}>3</Text>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                { color: darkmode ? BaseColors.white : BaseColors.textColor },
              ]}
            >
              Highest
            </Text>
            <Text style={[styles.number, { color: getNumberColor(5) }]}>5</Text>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                { color: darkmode ? BaseColors.white : BaseColors.textColor },
              ]}
            >
              Recent
            </Text>
            <Text style={[styles.number, { color: getNumberColor(4) }]}>4</Text>
          </View>
        </View>

        <View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                transform: [{ rotate: '-90deg' }],
                left: -10,
                position: 'absolute',
                fontWeight: '400',
                fontFamily: FontFamily.regular,
                color: BaseColors.black,
              }}
            >
              Severity
            </Text>
            <LineChart
              style={{ width: BaseSetting.nWidth - 70, height: 275 }}
              data={{
                dataSets: transformDataForChart(dotdata, activeIndex),
              }}
              chartDescription={{ text: '' }}
              xAxis={{
                valueFormatter: uniqueDates,
                position: 'BOTTOM',
                granularityEnabled: true,
                granularity: 1,
                avoidFirstLastClipping: true,
                drawGridLines: false,
                contentInset: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 0,
                },
              }}
              yAxis={{
                left: {
                  drawAxisLine: false, // Hide the Y-axis line, but keep the label
                  // ...other left Y-axis configurations
                  granularity: 1,
                  axisMinimum: 0,
                  axisMaximum: 6,
                  label: 'Severity',
                },
                right: {
                  enabled: false,
                  drawGridLines: false,
                },
              }}
              chartConfig={{
                drawGridBackground: false,
              }}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={styles.dotwithbordercontainer}>
            {Object.keys(dotdata).map((key, index) => {
              return (
                <TouchableOpacity
                  key={key}
                  activeOpacity={BaseSetting.buttonOpacity}
                  onPress={() => {
                    handleDotPress(index);
                  }}
                  style={[
                    {
                      borderColor:
                        activeIndex === index
                          ? BaseColors.primary
                          : BaseColors.black20,
                      margin: 4,
                    },
                    styles.row,
                  ]}
                >
                  <View
                    style={[
                      {
                        borderWidth: activeIndex === index ? 1 : null,
                        borderColor:
                          activeIndex === index
                            ? BaseColors.primary
                            : BaseColors.black20,
                      },
                      styles.dot,
                    ]}
                  >
                    <View
                      style={[
                        styles.round,
                        {
                          backgroundColor:
                            activeIndex === index
                              ? BaseColors.primary
                              : '#B6B7B9',
                        },
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
