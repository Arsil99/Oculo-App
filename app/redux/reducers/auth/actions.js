const actions = {
  SET_USER_DATA: 'auth/SET_USER_DATA',
  SET_ACCESSTOKEN: 'auth/SET_ACCESSTOKEN',
  SET_INTRO: 'auth/SET_INTRO',
  SET_PROFILESETUP: 'auth/SET_PROFILESETUP',
  SET_PROFILEDATA: 'auth/SET_PROFILEDATA',
  SET_NEWMISSIONDATA: 'auth/SET_NEWMISSIONDATA',
  LOGOUT: 'auth/LOGOUT',
  SET_LOCATION_PERMISSION: 'auth/SET_LOCATION_PERMISSION',
  SET_USERTYPE: 'auth/SET_USERTYPE',
  SET_DARKMODE: 'auth/SET_DARKMODE',
  SET_BASECOLOR: 'auth/SET_BASECOLOR',
  SET_ACTIVE_SCREEN: 'SET_ACTIVE_SCREEN',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_ASK_PERMISSION: 'SET_ASK_PERMISSION',
  SET_ACTIVE_CHAT_USER: 'SET_ACTIVE_CHAT_USER',
  SET_BIO_METRIC: 'SET_BIO_METRIC',
  SET_FCM_TOKEN: 'SET_FCM_TOKEN',
  SET_REFRESH_TOKEN_EXPIRED: 'SET_REFRESH_TOKEN_EXPIRED',
  SET_EVENT_LIST_DATA: 'SET_EVENT_LIST_DATA',

  setUserData: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_USER_DATA,
        userData: data,
      });
  },

  setUserCurrentLocation: currentLocation => {
    return dispatch =>
      dispatch({
        type: actions.SET_CURRENT_LOCATION,
        currentLocation: currentLocation,
      });
  },

  setAccessToken: accessToken => dispatch =>
    dispatch({
      type: actions.SET_ACCESSTOKEN,
      accessToken,
    }),

  setFcmToken: fcmToken => dispatch =>
    dispatch({
      type: actions.SET_FCM_TOKEN,
      fcmToken,
    }),

  setBiometric: isBiometric => dispatch =>
    dispatch({
      type: actions.SET_BIO_METRIC,
      isBiometric,
    }),

  setUserType: userType => dispatch =>
    dispatch({
      type: actions.SET_USERTYPE,
      userType,
    }),

  setIntro: introScreens => dispatch =>
    dispatch({
      type: actions.SET_INTRO,
      introScreens,
    }),

  setProfileSetup: profileSetup => dispatch =>
    dispatch({
      type: actions.SET_PROFILESETUP,
      profileSetup,
    }),

  setProfileData: profileData => dispatch =>
    dispatch({
      type: actions.SET_PROFILEDATA,
      profileData,
    }),
  setNewMissionData: newMissionData => dispatch =>
    dispatch({
      type: actions.SET_NEWMISSIONDATA,
      newMissionData,
    }),
  logOut: () => (dispatch, getState) => {
    // const IOSocket = getState().socket.IOSocket;
    // if (IOSocket) {
    //   IOSocket.disconnect();
    //   dispatch(socketActions.disconnectCall());
    //   dispatch(socketActions.clearChatData());
    // }
    dispatch({
      type: actions.LOGOUT,
    });
  },

  setLocationPermission: askLocationPermission => dispatch =>
    dispatch({
      type: actions.SET_LOCATION_PERMISSION,
      askLocationPermission,
    }),
  setBaseColor: baseColor => dispatch =>
    dispatch({
      type: actions.SET_BASECOLOR,
      baseColor,
    }),

  setDarkmode: darkmode => dispatch =>
    dispatch({
      type: actions.SET_DARKMODE,
      darkmode,
    }),
  setActiveScreen: activeScreen => dispatch =>
    dispatch({
      type: actions.SET_ACTIVE_SCREEN,
      activeScreen,
    }),
  setAskPermission: askPermission => dispatch =>
    dispatch({
      type: actions.SET_ASK_PERMISSION,
      askPermission,
    }),
  setActiveChatUser: activeChatUser => dispatch =>
    dispatch({
      type: actions.SET_ACTIVE_CHAT_USER,
      activeChatUser,
    }),
  setRefreshTokenExpire: refreshTokenExpire => dispatch =>
    dispatch({
      type: actions.SET_REFRESH_TOKEN_EXPIRED,
      refreshTokenExpire,
    }),
  setEventListData: eventListData => dispatch =>
    dispatch({
      type: actions.SET_EVENT_LIST_DATA,
      eventListData,
    }),
};

export default actions;
