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

    const colors = [BaseColors.primary, BaseColors.primary];
    const circleRadius = 5;

    return [
      {
        values: datasets,
        config: {
          color: processColor(colors[0]),
          drawValues: false,
          circleColor: processColor(colors[1]),
          filled: true,
          drawCircles: true,
          circleHoleColor: processColor(colors[1]),
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
            {` ${eventNames[activeIndex]}`}
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
