import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

const fullWidth = '100%';
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BaseColors.lightBg,
    alignItems: 'center',
  },
  settigCon: {
    marginTop: 15,
    marginHorizontal: 20,
    width: fullWidth,
  },
  topBorder: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  otherBorder: {
    borderTopWidth: 0.7,
    borderColor: BaseColors.borderColor,
  },
  settingItem: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  radiusDesign: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBox: { backgroundColor: BaseColors.white, width: fullWidth },
  innerCard: {
    width: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  mainTitleStyle: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  cardOuter: { width: fullWidth, alignItems: 'center', paddingHorizontal: 20 },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.black,
  },
  settingItemText: {
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    color: BaseColors.black90,
  },
  righttitletext: {
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
  },
  leftImagem: { height: 20, width: 22 },
});
