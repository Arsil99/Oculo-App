import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadarChart } from 'react-native-charts-wrapper';

const SpiderWebChart = ({ items, bundle, initial, defaultGraph }) => {
  const { assessment_id, date, ...newBundle } = bundle;
  const keys = Object?.keys(newBundle);
  const values = Object?.values(newBundle);
  const dataPoints = values.map((value, index) => ({
    value,
    label: keys[index],
  }));

  const filteredDataPoints = dataPoints.filter(
    item => item.value !== 0 && item.value !== null,
  );

  // default data
  const keysD = Object?.keys({ ...defaultGraph });
  const valuesD = Object?.values({ ...defaultGraph });
  const dataPointsD = valuesD.map((value, index) => ({
    value,
    label: keysD[index],
  }));

  const filteredDataPointsD = dataPointsD.filter(
    item => item.value !== 0 && item.value !== null,
  );


  const xAxis = {
    valueFormatter: items,
    granularityEnabled: true,
    granularity: 1,
    drawGridLines: true,
    textSize: 9,
  };

  return (
    <View style={styles.container}>
      <RadarChart
        style={styles.chart}
        data={
          initial
            ? {
                dataSets: [
                  {
                    values: filteredDataPoints,
                    label: 'Initial',
                    config: {
                      drawFilled: true,
                      fillColor: 0x00ffff,
                      fillAlpha: 100,
                      drawHighlightIndicators: false,
                      valueTextSize: 0,
                      lineWidth: 3,
                    },
                  },
                ],
              }
            : {
                dataSets: [
                  {
                    values: filteredDataPoints,
                    config: {
                      color: 0x006400,
                      drawFilled: true,
                      fillColor: 0x006400,
                      fillAlpha: 100,
                      drawHighlightIndicators: false,
                      valueTextSize: 0,
                      lineWidth: 3,
                    },
                  },
                  {
                    values: filteredDataPointsD,
                    label: 'Initial',
                    config: {
                      drawFilled: true,
                      fillColor: 0x00ffff,
                      fillAlpha: 100,
                      drawHighlightIndicators: false,
                      valueTextSize: 0,
                      lineWidth: 3,
                    },
                  },
                ],
              }
        }
        xAxis={xAxis}
        yAxis={{ valueFormatter: [], left: { axisMinimum: 0 } }}
        legend={{ enabled: true }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    width: '95%',
    height: 400,
  },
});

export default SpiderWebChart;
