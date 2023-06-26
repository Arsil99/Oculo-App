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
    color: BaseColors.textColor,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: FontFamily.regular,
    color: BaseColors.black90,
  },
});
