import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

const fullWidth = '100%';
export default StyleSheet.create({
  genderBox: {
    padding: 10,
    borderRadius: 10,
    borderColor: BaseColors.black20,
    borderWidth: 1.2,
    marginTop: 10,
    backgroundColor: BaseColors.white,
  },
  genderTitle: {
    marginLeft: 10,
    fontFamily: FontFamily.regular,
  },
});
