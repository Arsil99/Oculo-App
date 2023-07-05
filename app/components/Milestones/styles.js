import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  imagecontainer: { paddingVertical: 10, alignItems: 'center' },
  img: { width: 33, height: 31 },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  text: {
    fontFamily: FontFamily.roRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: BaseColors.secondary,
  },
  maincontainer: {
    backgroundColor: 'white',
    shadowColor: BaseColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
