import { Dimensions, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  main: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: FontFamily.bold,
    color: BaseColors.black,
  },
  titlesubText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
  },
  subtitleText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
    marginBottom: 25,
  },
  titledetail: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
  },
  btnContainer: {
    height: windowHeight / 4.2,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
