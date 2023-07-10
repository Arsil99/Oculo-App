import { Dimensions, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  main: {
    backgroundColor: BaseColors.white,
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.black,
  },
  titlesubText: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.2,
  },
  Assessment: { width: '80%' },
});