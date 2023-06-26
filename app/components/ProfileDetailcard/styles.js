import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
import BaseSetting from '@config/setting';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: BaseColors.blueLight,
    paddingBottom: 20,
    width: '100%',
    marginHorizontal: 20,
  },
  imgcontainer: {
    height: BaseSetting.nHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  Pname: {
    marginTop: 10,
    fontSize: 17,
    color: BaseColors.secondary,
    fontFamily: FontFamily.bold,
  },
  settigCon: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  settingItem: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
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
  deletecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
  },
  deleteText: {
    fontSize: 15,
    color: BaseColors.red,
    fontFamily: FontFamily.medium,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
    color: BaseColors.secondary,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 40,
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnStyle: {
    flexBasis: '47%',
  },
});
