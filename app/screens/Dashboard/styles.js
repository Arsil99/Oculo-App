import { BaseColors, FontFamily } from '@config/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headtext: {
    fontSize: 24,
    marginTop: 10,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: BaseColors.bold,
    color: BaseColors.textColor,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: BaseColors.regular,
    color: BaseColors.textColor,
    textAlign: 'center',
  },
  lighttext: {
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
    fontFamily: FontFamily.light,
    color: BaseColors.black80,
    textAlign: 'center',
  },
  number: {
    fontSize: 20,
    marginTop: 10,
    lineHeight: 30,
    fontWeight: '700',
    fontFamily: BaseColors.bold,
    textAlign: 'center',
  },
  round: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
  box: { flexDirection: 'row', alignItems: 'center' },
  btnIn: { paddingHorizontal: 15, width: 150 },
  label: {
    marginLeft: 15,
    flexGrow: 1,
    fontSize: 16,
    color: BaseColors.secondary,
    fontFamily: FontFamily.semiBold,
  },
  dot: {
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  subheaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 30,
  },
  flatlistcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  flatlistmaincontainer: {
    marginTop: 10,
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colorcontainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  dotwithbordercontainer: {
    flex: 2,
    flexDirection: 'row',
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  columnwrapperstyle: { width: '100%' },
});