import { BaseColors, FontFamily } from '@config/theme';
import { Platform, StyleSheet } from 'react-native';
const IOS = Platform.OS === 'ios';

export default StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: IOS ? 55 : 15,
    width: '100%',
  },
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCon: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextCon: {
    flex: 1,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    left: 50,
  },
  headerTextCenter: {
    left: 0,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: FontFamily.bold,
    color: BaseColors.textColor,
    textTransform: 'capitalize',
    fontSize: 18,
  },
  GreatingsText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: BaseColors.secondary,
  },

  userImgCon: {
    height: 52,
    width: 52,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BaseColors.primary,
    padding: 2,
  },
});
