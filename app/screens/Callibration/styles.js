import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

const styles = StyleSheet.create({
  main: { flex: 1 },
  imgStyle: { height: '100%', width: '100%', position: 'absolute' },
  imgStylee: { height: '90%', width: '100%', marginHorizontal: 10 },
  statusBox: { flexDirection: 'row', marginTop: 5 },
  requestBtn: {
    width: '80%',
    marginTop: 50,
  },
  squareBorder: {
    height: 170,
    width: BaseSetting.nWidth,
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
    textAlign: 'center',
    lineHeight: 30,
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
  smallDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BaseColors?.primaryBlue,
  },
  container: {
    flex: 1,

    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    height: BaseSetting.nHeight / 2.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topIn: { alignItems: 'center', marginBottom: 25 },
  title: { fontSize: 20, fontWeight: 'bold' },
  miniTitle: { fontSize: 16 },
  swipeCover: {
    width: '100%',
    height: BaseSetting.nHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post1: { position: 'absolute', flexDirection: 'row' },
  post2: {
    position: 'absolute',
    left: BaseSetting.nHeight / 30,
    top: BaseSetting.nHeight / 8.5,
  },
  desc: { alignItems: 'center', width: '100%' },
  btnStyle: { width: '70%', borderRadius: 50, marginTop: 25 },
});

export default styles;
