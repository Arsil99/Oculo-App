import { StyleSheet } from 'react-native';
import { BaseColors } from '@config/theme';

export default StyleSheet.create({
  main: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  textWithSpaceStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 8,
    marginRight: 16,
  },
  imageButton: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  buttonStyle: {
    backgroundColor: BaseColors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
  },
});
