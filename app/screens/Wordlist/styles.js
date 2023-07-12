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
  },
  wordcontainer: {
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
  },

  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    marginTop: 15,
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
  },

  buttoncontainer: {
    flex: 0.3,
    marginHorizontal: 15,
    justifyContent: 'flex-end',
  },
  textInputContainer: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: BaseColors.borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
  },
});
