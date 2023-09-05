import { BaseColors, FontFamily } from '@config/theme';
import { Dimensions, StyleSheet } from 'react-native';
const windowHeight = Dimensions.get('window').height;

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
    justifyContent: 'center',
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
  textInput: {
    marginTop: 20,
  },
  buttoncontainer: {
    flexGrow: 1,

    padding: 16,
  },
  row: {
    marginBottom: 10,
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
  btnContainer: {
    marginTop: 20,
    justifyContent: 'flex-end',
    flex: 1,
    // height: windowHeight / 4.2,
    marginHorizontal: 20,
  },
  errorText: {
    color: BaseColors.red,
  },
});
