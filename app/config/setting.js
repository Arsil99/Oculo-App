import { Dimensions } from 'react-native';
const devMode = __DEV__;
const baseUrl = devMode
  ? 'http://192.168.0.156:5000/v1'
  : 'https://api.oculo.app/v1';

const BaseSetting = {
  name: 'oculo',
  displayName: 'oculo',
  appVersionCode: '1',
  stripeKey: '',
  // bugsnagApiKey: "",
  baseUrl,
  api: baseUrl,
  nWidth: Dimensions.get('window').width,
  nHeight: Dimensions.get('window').height,
  // imgUrl: devMode ? 'http://192.168.0.124:8000' : 'https://jointroops.com',
  timeOut: 30000,
  MAPS_API_CALL_KEY: '',
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  buttonOpacity: 0.8,

  endpoints: {
    login: '/patient/login',
    generateOtp: '/user/generate-otp',
    verifyOtp: '/user/verify-otp',
    resetPassword: '/user/reset-password',
    changePassword: '/patient/change-password',
    createPassword: '/patient/create-password',
    question: '/patient/list-history',
    savePatient: '/patient/save-history',
    updatePatient: '/patient/update-profile',
    numberarray: '/questions/list',
    questionList: '/questions/list',
    createCall: '/assessment/create-immediate-recall',
    sendnumberarray: '/assessment/create-digit-recall',
    symptom: '/assessment/create-symptom-inventory',
    eventList: '/event/list',
  },

  geolocationOptions: {
    enableHighAccuracy: false,
    timeout: 50000,
    maximumAge: 10000,
    distanceFilter: 1,
  },
  geoOptionHighAccurate: {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 10000,
    distanceFilter: 1,
  },
};

export default BaseSetting;
