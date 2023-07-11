import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: BaseColors.white,
    borderWidth: 1,
    marginVertical: 5,
    borderColor: BaseColors.black10,
    width: '96%',
    height: 90,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  img: { height: 25, width: 23 },
  img2: { width: 90 },
  text: {
    color: BaseColors.textColor,
    fontFamily: FontFamily.regular,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  numbercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  graphcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    color: BaseColors.secondary,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 36,
    marginRight: 2,
  },
});
