import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadarChart } from 'react-native-charts-wrapper';

const SpiderWebChart = ({ items }) => {
  const length = items?.length;
  const valuesArray = Array.from({ length }, () => ({ value: 1 }));
  const dynamicObject = { values: valuesArray };
  const data = {
    dataSets: [
      {
        values: dynamicObject?.values,
        label: 'Initial',
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
    valueFormatter: items,
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
