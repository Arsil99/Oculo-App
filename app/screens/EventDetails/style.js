import { StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';

export default StyleSheet.create({
  main: {
    flex: 1,
  },
  detailsArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.lightBg,
  },
  spiderView: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  slider: {
    marginHorizontal: 20,
    width: '80%',
    alignSelf: 'center',
  },
  rangeLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  rangeLabelsContainerr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  rangeLabel: {
    fontSize: 12,
    color: BaseColors.black90,
  },
  thumbStyle: {
    elevation: 4,
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
