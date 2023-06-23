import { StyleSheet, Platform } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

const IOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  main: { width: '100%' },
  container: {
    height: 80,
    width: '100%',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: BaseColors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 0.5,
    marginVertical: 3,
  },
  insideBox: { flexDirection: 'row', alignItems: 'center' },
  imgStyle: { height: 50, width: 50, borderRadius: 50 },
  statusBox: { flexDirection: 'row', marginTop: 5 },
  chipBox: {
    backgroundColor: BaseColors.lightBg,
    marginRight: 10,
  },
});

export default styles;
