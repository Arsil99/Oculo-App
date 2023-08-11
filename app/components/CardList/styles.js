import { StyleSheet, Platform } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

const IOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  insideBox: { flexDirection: 'row', alignItems: 'center' },
  imgStyle: { height: 50, width: 50, borderRadius: 50 },
  statusBox: { flexDirection: 'row', marginTop: 5 },
  chipBox: {

    marginRight: 10,
  },
});

export default styles;
