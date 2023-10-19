import { Dimensions, Platform, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

const IOS = Platform.OS === 'ios';
export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: BaseColors.white,
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
  signinbutton: { flex: 1 },
  btnContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "pink",
    marginTop: 40,
  },
  img: {
    marginTop: 30,
    height: 55,
  },

  fingIcon: {
    marginLeft: 20,
    backgroundColor: BaseColors.primary,
    padding: 8,
    borderRadius: 50,
    color: BaseColors.white,
  },
});
