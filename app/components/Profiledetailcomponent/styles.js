import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

const fullWidth = '100%';
export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BaseColors.lightBg,
    alignItems: 'center',
  },
  settigCon: {
    marginTop: 15,
    marginHorizontal: 20,
    width: fullWidth,
  },
  topBorder: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  otherBorder: {
    borderTopWidth: 0.7,
    borderColor: BaseColors.borderColor,
  },
  genderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: BaseColors.black20,
    borderWidth: 1,
    marginTop: 10,
  },
  genderIcon: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  settingItem: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  radiusDesign: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBox: { backgroundColor: BaseColors.white, width: fullWidth },
  innerCard: {
    width: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  mainTitleStyle: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  customGender: {
    backgroundColor: BaseColors.white,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
    borderWidth: 1,
  },
  cardOuter: {
    width: fullWidth,
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
  alignSetup: { width: '100%', alignItems: 'center' },
  righttitletext: {
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: FontFamily.regular,
    color: BaseColors.textColor,
    alignItems: 'center',
  },
  dateTitle: { color: BaseColors.black, marginBottom: 10 },
  dateBox: {
    backgroundColor: BaseColors.white,
    borderColor: BaseColors.black20,
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftImagem: { height: 20, width: 22 },
  editContainer: {
    backgroundColor: BaseColors.white,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  // screen: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F2F5FB',
  // },
  headertext: {
    fontSize: 20,
    color: BaseColors.black,
  },
  text: {
    fontSize: 16,
    color: BaseColors.black,
  },
  picker: {
    marginVertical: 30,
    borderRadius: 10,
    color: BaseColors.black,
    width: '100%',
    borderColor: BaseColors.black20,
    borderWidth: 1,
  },
  genderTitle: {
    marginTop: 8,
    color: BaseColors.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColors.black60,
  },
  modalHead: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  containers: {
    marginBottom: 20,
    width: '60%',
  },
  closeicon: { padding: 10, position: 'absolute', right: 4 },

  dropdownContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: 300,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#333',
  },
});
