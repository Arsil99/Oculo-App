import { BaseColors, FontFamily } from '@config/theme';
import { Platform, StyleSheet } from 'react-native';
const IOS = Platform.OS === 'ios';

const fullWidth = '100%';
export default StyleSheet.create({
  settigCon: {
    marginTop: 15,
    // marginHorizontal: 20,
    width: fullWidth,
  },
  mainTitleStyle: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.black,
  },
  infoshadow: {
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  settingItem: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topBorder: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  otherBorder: {
    borderTopWidth: 0.7,
    borderColor: BaseColors.borderColor,
  },
  radiusDesign: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerCard: {
    width: 20,
    marginRight: 20,
    alignItems: 'center',
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
    alignItems: 'center',
  },
});