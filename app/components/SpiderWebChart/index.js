import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadarChart } from 'react-native-charts-wrapper';

const SpiderWebChart = ({ items, bundle, initial }) => {
  const { assessment_id, date, ...newBundle } = bundle;
  const keys = Object?.keys(newBundle); // Extract keys
  const values = Object?.values(newBundle); // Extract values
  const dataPoints = values.map((value, index) => ({
    value,
    label: keys[index],
  }));

  const filteredDataPoints = dataPoints.filter(
    item => item.value !== 0 && item.value !== null,
  );

  const copyObj = initial && filteredDataPoints;
  console.log('copy ==>  ', copyObj);

  const data = {
    dataSets: [
      {
        values: filteredDataPoints,
        label: 'Initial',
        config: {
          color: '#1F77B4',
          drawFilled: true,
          fillColor: '#1F77B4',
          fillAlpha: 100,
          drawHighlightIndicators: false,
          valueTextSize: 0,
          lineWidth: 3,
        },
      },
    ],
  };

  const xAxis = {
    valueFormatter: items,
    granularityEnabled: true,
    granularity: 1,
    drawGridLines: true,
    textSize: 12,
  };

  return (
    <View style={styles.container}>
      <RadarChart
        style={styles.chart}
        data={data}
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
