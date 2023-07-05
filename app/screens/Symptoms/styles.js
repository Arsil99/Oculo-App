import { Dimensions, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  main: {
    backgroundColor: BaseColors.lightBg,
  },
  scrollcontainer: {
    height: '86%',
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: BaseColors.white,
    paddingBottom: 20,
    width: '90%',
    paddingHorizontal: 20,
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
  yesText: {
    marginTop: 20,
    fontWeight: '300',
    lineHeight: 22,
    fontFamily: FontFamily.light,
  },
  lighttext: {
    fontWeight: '300',
    lineHeight: 22,
    fontFamily: FontFamily.light,
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
    height: windowHeight / 3.1,
    justifyContent: 'flex-end',
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
  thumbstyle: { elevation: 5, height: 28, width: 28, borderRadius: 14 },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sliderLabel: {
    fontSize: 12,
  },
  previousassesment: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BaseColors.secondary,
    marginRight: 10,
  },
  currentassesment: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BaseColors.primary,
    marginRight: 10,
  },
  assesmentcontainer: { flexDirection: 'row', alignItems: 'center' },
  assesmentmaincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
