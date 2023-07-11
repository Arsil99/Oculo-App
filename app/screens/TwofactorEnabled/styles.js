import { StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: BaseColors.white,
    paddingHorizontal: 20,
  },
  logoView: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 55,
    width: '100%',
  },
  imgStyle: { height: 200, width: 200 },
  btnContainer: {
    // flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 30,
    // marginHorizontal: 20,
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseColors.black60,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: FontFamily.bold,
    color: BaseColors.black,
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
  closeicon: { padding: 10, position: 'absolute', right: 4 },
  dropdownContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: 300,
  },
  genderBox: {
    borderRadius: 10,
    borderColor: BaseColors.black20,
    borderWidth: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
  },
  genderTitle: {
    marginTop: 8,
    color: BaseColors.black,
    fontFamily: FontFamily.regular,
  },
});
