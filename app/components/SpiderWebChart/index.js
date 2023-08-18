import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadarChart } from 'react-native-charts-wrapper';

const SpiderWebChart = () => {
  const data = {
    dataSets: [
      {
        values: [
          { value: 0.6 },
          { value: 0.8 },
          { value: 0.7 },
          { value: 0.5 },
          { value: 0.9 },
          { value: 0.6 },
          { value: 0.8 },
          { value: 0.7 },
          { value: 0.5 },
          { value: 0.9 },
        ],
        label: 'Dataset 1',
        config: {
          color: '#1F77B4',
          drawFilled: true,
          fillColor: '#1F77B4',
          fillAlpha: 100,
          drawHighlightIndicators: false,
        },
      },
    ],
  };

  const xAxis = {
    valueFormatter: [
      'Label 1',
      'Label 2',
      'Label 3',
      'Label 4',
      'Label 5',
      'Label 6',
      'Label 7',
      'Label 8',
      'Label 9',
      'Label 10',
    ],
    granularityEnabled: true,
    granularity: 1,
    drawGridLines: true,
  };

  return (
    <View style={styles.container}>
      <RadarChart
        style={styles.chart}
        data={data}
        xAxis={xAxis}
        yAxis={{ left: { axisMinimum: 0 } }}
        legend={{ enabled: true }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    width: '95%',
    height: 400,
  },
});

export default SpiderWebChart;
