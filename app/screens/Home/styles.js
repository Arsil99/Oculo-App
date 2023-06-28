import { Platform, StyleSheet } from 'react-native';
import { BaseColors, FontFamily } from '@config/theme';
const IOS = Platform.OS === 'ios';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: BaseColors.white,
    alignItems: 'center',
  },
  topBar: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    marginTop: IOS ? 55 : 30,
  },
  title: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 20,
    color: BaseColors.primary,
  },
  welcomeText: {
    fontSize: 16,
  },
  summaryArea: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descText: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 17,
  },
  requestBtn: {
    marginTop: 15,
    width: '80%',
  },
  detailsArea: {
    flex: 1,
    width: '100%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColors.lightBg,
  },
});
