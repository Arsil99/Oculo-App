import { StyleSheet, Platform } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

const IOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  main: { flex: 1, borderWidth: 1 },
  imgStyle: { height: '100%', width: '100%', position: 'absolute' },
  imgStylee: { height: '90%', width: '100%', marginHorizontal: 10 },
  statusBox: { flexDirection: 'row', marginTop: 5 },
  requestBtn: {
    width: '80%',
  },
  squareBorder: {
    height: 200,
    width: 450,

    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smalltext: {
    textAlign: 'center',
    color: BaseColors?.white,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  bigtext: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
    color: BaseColors?.white,
    fontFamily: FontFamily.regular,
    fontSize: 20,
  },
  plusStyle: {
    position: 'absolute',
    color: BaseColors?.white,
    fontSize: 40,
    top: '50%',
  },
  dotContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
