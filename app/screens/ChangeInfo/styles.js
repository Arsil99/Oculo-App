import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: BaseColors.lightBg,
  },
  mainDiv: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.black,
  },

  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 15,
    fontFamily: FontFamily.regular,
    color: BaseColors.black,
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
    marginTop: 20,
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
