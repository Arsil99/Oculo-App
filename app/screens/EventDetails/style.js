import { StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';

export default StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: BaseColors.white,
  },
  detailsArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.lightBg,
  },
  // spiderView: {
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  spiderView: {
    // Add styles for the container of SpiderWebChart and Slider
    // Example:
    marginBottom: 20, // Adjust the margin as needed
    marginHorizontal: 20,
  },
  slider: {
    // Add styles for the Slider component
    // Example:
    marginHorizontal: 20,
    width: '80%', // Set the width as desired
    alignSelf: 'center', // Center the slider horizontally
  },
  rangeLabelsContainer: {
    // Add styles for the container of range labels
    // Example:
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8, // Adjust the marginTop as needed
  },
  rangeLabelsContainerr: {
    // Add styles for the container of range labels
    // Example:
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rangeLabel: {
    // Add styles for individual range labels
    // Example:
    fontSize: 12,
    color: BaseColors.black90,
  },
  thumbStyle: {
    // Add styles for the thumb (to apply elevation)
    elevation: 4, // Adjust the elevation as needed
  },

  rangeValuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  rangeValueWrapper: {
    alignItems: 'center',
  },
  rangeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BaseColors.primary,
  },
  dateLabel: {
    fontSize: 12,
    color: BaseColors.black90,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: BaseColors.textColor,
  },
});
