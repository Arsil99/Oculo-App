import { StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';

export default StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: BaseColors.white,
  },
  detailsArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.lightBg,
  },
});
