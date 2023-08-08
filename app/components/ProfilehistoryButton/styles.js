import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
  },
  maincontainer: {
    marginTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  mainDiv: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: BaseColors.white,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
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
    marginTop: 25,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: FontFamily.regular,
    color: BaseColors.black90,
  },
  errortext: {
    color: BaseColors.red,
    fontSize: 13,
    marginTop: 7,
    fontWeight: '400',
    fontFamily: FontFamily.regular,
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
  },
  input: {
    width: '100%',
  },
  dropdownContainer: {
    marginVertical: 20,
    borderRadius: 10,
    borderColor: BaseColors.black20,
    borderWidth: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
    zIndex: 50,
    backgroundColor: BaseColors.white,
  },
  yesbutton: {
    minWidth: 100,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BaseColors.black20,
    marginRight: 10,
  },
  nobutton: {
    paddingHorizontal: 30,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BaseColors.black20,
    marginRight: 10,
  },
});
