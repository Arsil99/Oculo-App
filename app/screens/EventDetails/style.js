import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

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
  },
  rangeLabelsContainerr: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 2,
  },
  rangeLabel: {
    fontSize: 10,
    color: BaseColors.black90,
    fontWeight: '300',
    fontFamily: FontFamily.light,
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
  markerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: -18,
    zIndex: -10,
  },
  assessmentTag: { fontSize: 18, fontWeight: '700', marginVertical: 5 },
  marker: {
    height: 10,
    width: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between', // Add space between items
  },
  eventContainer: {
    borderWidth: 1,
    width: '48%', // Two items side by side with a small gap

    marginVertical: 5,
    borderColor: BaseColors.lightGrey,
    height: 100,
    padding: 10,
    borderRadius: 12,
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Add margin below event name
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
    alignItems: 'center',
  },
  textt: {
    // color: BaseColors.textColor,
    fontFamily: FontFamily.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  dateValueContainer: {},
  dateText: {
    flex: 1,
  },
  valueText: {},
  gradientBackground: {
    height: 10,
    borderWidth: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: BaseColors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
