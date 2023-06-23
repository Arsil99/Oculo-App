import BaseSetting from '@config/setting';
import { BaseColors, FontFamily } from '@config/theme';
import { Platform, StyleSheet } from 'react-native';

const tabWidth = 80;
const IOS = Platform.OS === 'ios';
export const styles = StyleSheet.create({
  wrapper: {
    height: BaseSetting.nHeight * 0.06,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: BaseColors.white,
    overflow: 'hidden',
    borderColor: BaseColors.black20,
  },
  slider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: BaseColors.white,
    color: BaseColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  tab: {
    width: tabWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
});
