import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 35,
    marginTop: 10,
  },
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
  counterTag: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  optionList: {
    color: BaseColors.textColor,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  wordcontainer: {
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  attemptBtn: {
    height: BaseSetting.nWidth / 2,
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  nextBtn: {
    marginTop: 15,
    width: '80%',
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 0.8,
    marginTop: 30,
  },
  stop: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: FontFamily.regular,
    color: BaseColors.red,
    textAlign: 'center',
  },
  stopimg: { height: 100, width: 100, marginBottom: 20, alignSelf: 'center' },

  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },

  textWithSpaceStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
    marginRight: 16,
  },
  imageButton: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  buttonStyle: {
    backgroundColor: BaseColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
  },
  borderVoice: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  text: {
    marginVertical: 25,
    color: BaseColors.black,
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 35,
    fontWeight: '800',
  },
  mainVoice: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerVoice: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  textInputVoice: {
    marginTop: 25,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: BaseColors.primary,
  },
  voiceInput1: {
    backgroundColor: 'white',
    width: '80%',
    height: 35,
    paddingHorizontal: 10,
    fontSize: 14,
    color: BaseColors.black,
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: BaseColors.primary,
    borderLeftWidth: 1,
    borderLeftColor: BaseColors.primary,
    borderRightWidth: 1,
    borderRightColor: BaseColors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  voiceInput2: {
    backgroundColor: 'white',
    width: '80%',
    height: 35,
    padding: 0,
    color: BaseColors.black,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 14,
    borderLeftWidth: 1,
    borderLeftColor: BaseColors.primary,
    borderRightWidth: 1,
    borderRightColor: BaseColors.primary,
  },
  voiceInput3: {
    backgroundColor: 'white',
    width: '80%',
    height: 35,
    padding: 0,
    color: BaseColors.black,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 14,
    borderLeftWidth: 1,
    borderLeftColor: BaseColors.primary,
    borderRightWidth: 1,
    borderRightColor: BaseColors.primary,
  },
  voiceInput4: {
    backgroundColor: 'white',
    width: '80%',
    height: 35,
    padding: 0,
    color: BaseColors.black,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 14,
    borderLeftWidth: 1,
    borderLeftColor: BaseColors.primary,
    borderRightWidth: 1,
    borderRightColor: BaseColors.primary,
  },
  voiceInput5: {
    backgroundColor: 'white',
    width: '80%',
    height: 35,
    padding: 0,
    color: BaseColors.black,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: BaseColors.primary,
    borderLeftWidth: 1,
    borderLeftColor: BaseColors.primary,
    borderRightWidth: 1,
    borderRightColor: BaseColors.primary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
