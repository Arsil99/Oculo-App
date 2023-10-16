import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RadarChart } from 'react-native-charts-wrapper';

const SpiderWebChart = ({ items, bundle, initial, defaultGraph }) => {
  const values_C = Object?.values(bundle);

  // initial setup
  const dataPointsI = values_C?.map((value, index) => ({
    label: value.label,
    initial_value: value.initial_value,
  }));

  const resultInit = dataPointsI?.reduce((acc, item) => {
    acc[item.label] = item.initial_value;
    return acc;
  }, {});

  // current setup
  const dataPointsC = values_C?.map((value, index) => ({
    label: value.label,
    curr_value: value.curr_value,
  }));

  const result_Curr = dataPointsC?.reduce((acc, item) => {
    acc[item.label] = item.curr_value;
    return acc;
  }, {});

  const newArrInit = [];
  newArrInit.push(resultInit);

  const newArrCurr = [];
  newArrCurr.push(result_Curr);

  const transformedDataInit = Object?.entries(newArrInit[0]).map(
    ([label, value]) => ({
      value,
      label,
    }),
  );

  const transformedDataCurr = Object?.entries(newArrCurr[0]).map(
    ([label, value]) => ({
      value,
      label,
    }),
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

  const item = Object?.keys(items).map(key => `${key} [${items[key]}]`);

  const xAxis = {
    valueFormatter: item,
    granularityEnabled: true,
    granularity: 1,
    drawGridLines: true,
    textSize: 10,
  };

  return (
    <TouchableWithoutFeedback style={styles.container}>
      <RadarChart
        style={styles.chart}
        data={
          initial
            ? {
                dataSets: [
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
            : {
                dataSets: [
                  {
                    values: transformedDataCurr,
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
                    values: transformedDataInit,
                    label: 'Initial',
                    config: {
                      drawFilled: true,
                      fillColor: 0x00ffff,
                      fillAlpha: 100,
                      drawHighlightIndicators: false,
                      valueTextSize: 0,
                      lineWidth: 1,
                    },
                  },
                ],
              }
        }
        xAxis={xAxis}
        yAxis={{ valueFormatter: [], left: { axisMinimum: 0 } }}
        legend={{ enabled: true }}
        chartDescription={{ text: '' }}
      />
    </TouchableWithoutFeedback>
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
