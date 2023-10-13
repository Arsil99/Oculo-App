import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  processColor,
} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
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
  const data = route.params.eventData;
  const Header = route.params.eventName;
  const { darkmode } = useSelector(state => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);

  const planData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const transformDataForChart = data => {
    const datasets = Object.keys(data).map(key => {
      const values = data.map(entry => {
        return { y: entry.value || 0 };
      });
      const colors = [BaseColors.primary, BaseColors.primary];
      const circleRadius = 5;

      return {
        values,
        config: {
          color: processColor(colors[0]),
          drawValues: false,
          circleColor: processColor(colors[1]),
          filled: true,
          drawCircles: true,
          circleHoleColor: processColor(colors[1]),
          circleRadius: circleRadius,
        },
      };
    });

    return datasets;
  };

  const uniqueDates = Array.from(
    new Set(
      Object.values(data)
        .flat()
        .map(entry => entry.date),
    ),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkmode ? BaseColors.lightBlack : null,
      }}
    >
      <HeaderBar HeaderText={'Event Aug 3'} HeaderCenter leftText="Back" />
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
            {Header}
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
            <Text style={[styles.number, { color: BaseColors.secondary }]}>
              3
            </Text>
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
            <Text style={[styles.number, { color: BaseColors.Severe }]}>5</Text>
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
            <Text style={[styles.number, { color: BaseColors.Intense }]}>
              4
            </Text>
          </View>
        </View>

        <View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{
                transform: [{ rotate: '-90deg' }],
                left: -5,
                position: 'absolute',
                fontWeight: '400',
                fontFamily: FontFamily.regular,
                color: BaseColors.black,
              }}
            >
              Severity
            </Text>
            <LineChart
              style={{ width: 330, height: 275 }}
              data={{
                dataSets: transformDataForChart(data),
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
                  granularity: 1,
                  axisMinimum: 0,
                  axisMaximum: 6,
                  label: 'Severity', // Set the label for the left y-axis
                },
                right: {
                  enabled: false,
                  drawGridLines: false, // Hide grid lines on the y-axis
                },
              }}
              chartConfig={{
                drawGridBackground: false,
              }}
            />
          </View>
        </View>

        <View style={styles.dotwithbordercontainer}>
          {planData.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={BaseSetting.buttonOpacity}
                onPress={() => {
                  setActiveIndex(index);
                }}
                style={[
                  {
                    borderColor:
                      activeIndex === index
                        ? BaseColors.primary
                        : BaseColors.black20,
                  },
                  styles.row,
                ]}
              >
                <View
                  onPress={() => {
                    setActiveIndex(index);
                  }}
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
                    onPress={() => {
                      setActiveIndex(index);
                    }}
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
    </View>
  );
};

export default Dashboard;
