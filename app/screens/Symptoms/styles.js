import { Dimensions, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  main: {
    backgroundColor: BaseColors.lightBg,
    flexGrow: 1,
  },
  scrollcontainer: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttoncontainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
    marginBottom: 25,
  },
  yesbutton: {
    paddingHorizontal: 30,
    width: 131,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BaseColors.black20,
  },
  btnText: {
    fontSize: 13,
  },
  yesText: {
    marginTop: 20,
    fontWeight: '300',
    lineHeight: 22,
    fontFamily: FontFamily.light,
    color: BaseColors.textColor,
  },
  boldText: {
    marginTop: 30,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
    marginBottom: 30,
  },
  slider: {
    marginHorizontal: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnContainer: {
    height: windowHeight / 3.2,
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  sliderContainer: {
    flex: 1,
    backgroundColor: 'red',
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  sliderLabel: {
    fontSize: 12,
    fontFamily: FontFamily.light,
  },
  sliderLabelMarker: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  sliderMarker: {
    // paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },

  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  markerContainer: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  markerContainerNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  marker: {
    width: 1,
    height: 10,
    backgroundColor: BaseColors.black40,
  },
  thumbStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  trackStyle: {
    height: 4,
  },
  lables: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BaseColors.secondary,
    marginRight: 5,
  },
  assessmentHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assessmentData: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BaseColors.primary,
    marginRight: 5,
  },
  btnStyle: {
    marginRight: 10,
    borderColor: BaseColors.black80,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 25,
  },
});
