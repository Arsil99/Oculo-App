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
    marginVertical: 20,
    paddingHorizontal: 25,
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
    textAlign: 'center',
  },
  subtitleText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    // marginTop: 15,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
  },

  numbercontainer: {
    width: '80%',
    height: 90,
    borderRadius: 12,
    borderColor: BaseColors.borderColor,
    textAlign: 'center',
    padding: 24,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
  },
  errorTxt: {
    color: '#FF0B1E',
    paddingLeft: 5,
    paddingBottom: 12,
    marginTop: 10,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});
