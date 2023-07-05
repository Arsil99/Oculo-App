import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
  },
  contentView: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputcontainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
  },
  forgotPasswordTextStyle: {
    color: BaseColors.primary,
  },
  signinbutton: {
    width: IOS ? '80%' : '100%',
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: "pink",
    marginTop: 40,
  },
  img: {
    marginTop: 30,
    height: 55,
  },
});
