import types from './actions';

const initialState = {
  userData: {},
  accessToken: '',
  userType: '', // user type 'Customer' || 'ServiceProvider'
  introScreens: true,
  askLocationPermission: false,
  baseColor: {},
  darkmode: false,
  activeScreen: '',
  currentLocation: {},
  profileSetup: 0,
  profileData: {},
  newMissionData: {},
  askPermission: false,
  activeChatUser: null,
};

export default function reducer(state = initialState, action) {
  // console.log('Reducer Change AUTH ===> ', action.type, action);
  switch (action.type) {
    case 'persist/REHYDRATE':
      if (
        action.payload &&
        action.payload.auth &&
        action.payload.auth.introShown
      ) {
        return {
          ...state,
          ...action.payload.auth,
          introShown: false,
        };
      }
      return state;
    case types.SET_USER_DATA:
      console.log(`${types.SET_USER_DATA} => `);
      return {
        ...state,
        userData: action.userData,
      };
    case types.SET_CURRENT_LOCATION:
      console.log(`${types.SET_CURRENT_LOCATION} => `, action.currentLocation);
      return {
        ...state,
        currentLocation: action.currentLocation,
      };
    case types.SET_ACCESSTOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case types.SET_USERTYPE:
      return {
        ...state,
        userType: action.userType,
      };
    case types.SET_INTRO:
      return {
        ...state,
        introScreens: action.introScreens,
      };
    case types.SET_PROFILESETUP:
      return {
        ...state,
        profileSetup: action.profileSetup,
      };
    case types.SET_PROFILEDATA:
      return {
        ...state,
        profileData: action.profileData,
      };
    case types.SET_NEWMISSIONDATA:
      return {
        ...state,
        newMissionData: action.newMissionData,
      };
    case types.LOGOUT:
      return {
        ...state,
        userData: {},
        accessToken: '',
        userType: '',
        coins: 0,
      };
    case types.SET_LOCATION_PERMISSION:
      return {
        ...state,
        askLocationPermission: action.askLocationPermission,
      };
    case types.SET_BASECOLOR:
      return {
        ...state,
        baseColor: action.baseColor,
      };
    case types.SET_DARKMODE:
      console.log('DARKMODE REDUX ==>> ', action.darkmode);
      return {
        ...state,
        darkmode: action.darkmode,
      };
    case types.SET_ACTIVE_SCREEN:
      return {
        ...state,
        activeScreen: action.activeScreen,
      };
    case types.SET_ASK_PERMISSION:
      return {
        ...state,
        askPermission: action.askPermission,
      };
    case types.SET_ACTIVE_CHAT_USER:
      return {
        ...state,
        activeChatUser: action.activeChatUser,
      };
    default:
      return state;
  }
}
