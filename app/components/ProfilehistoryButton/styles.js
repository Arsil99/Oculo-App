import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  maincontainer: {
    marginTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  scrollcontainer: {
    height: '86%',
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: BaseColors.white,
    paddingBottom: 20,
    width: '90%',
    paddingHorizontal: 20,
  },
  titleTextcontainer: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: FontFamily.regular,
    color: BaseColors.black,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: FontFamily.regular,
    color: BaseColors.black90,
  },
  yesText: {
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: FontFamily.regular,
    color: BaseColors.white,
  },
  noText: {
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
  },
  buttoncontainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
    marginBottom: 25,
  },
  yesbutton: {
    paddingHorizontal: 30,

    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BaseColors.black20,
  },
  nobutton: {
    paddingHorizontal: 30,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BaseColors.black20,
  },
});