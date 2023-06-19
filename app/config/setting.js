import {Dimensions} from 'react-native';
const devMode = __DEV__;
const baseUrl = devMode
  ? 'http://192.168.0.124:8000/api/'
  : 'https://jointroops.com/api/';

const BaseSetting = {
  name: 'jointroops',
  displayName: 'jointroops',
  appVersionCode: '1',
  stripeKey:
    'pk_test_51LUNEAJ3MbCXRvepo5YEabpEZATKZv1ci3u3SEW7FW4N4moKnu0gxrOgqK5DQCX5N1xNYvRJfSiuWoyJYy7K74gw00kcTXSt8T',
  // bugsnagApiKey: "",
  baseUrl,
  zohoUrl: devMode
    ? 'http://192.168.0.124:8000/zoho/'
    : 'https://jointroops.com/zoho/',
  socketURL: devMode
    ? 'http://192.168.0.124:33969/'
    : 'http://165.22.59.159:30000/', // LOCAL URL
  api: baseUrl,
  shareEndPoint: baseUrl,
  nWidth: Dimensions.get('window').width,
  nHeight: Dimensions.get('window').height,
  imgUrl: devMode ? 'http://192.168.0.124:8000' : 'https://jointroops.com',
  timeOut: 30000,
  MAPS_API_CALL_KEY: '',
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  endpoints: {
    login: 'login',
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
