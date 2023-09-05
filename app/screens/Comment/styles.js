import { BaseColors } from '@config/theme';
import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BaseColors.white,
  },
  topTitle: { paddingHorizontal: 15 },
  main: {
    paddingHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  titleOne: {
    color: BaseColors.black,
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleThree: { fontSize: 15 },
  titleTwo: { fontSize: 15, marginTop: 5 },
  inputBar: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: BaseColors.black30,
    borderRadius: 15,
    height: 150,
    padding: 15,
    textAlignVertical: 'top',
  },
  doneBtn: { width: '90%', paddingHorizontal: 25 },
  innerView: { marginVertical: Dimensions.get('screen').height / 15 },
});
export default styles;
