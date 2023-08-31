const actions = {
  SET_CALIBRATION: 'auth/SET_CALIBRATION',
  RESET_CALIBRATION: 'auth/RESET_CALIBRATION',
  SET_CAL_TIME: 'auth/SET_CAL_TIME',

  setCalibration: data => {
    return dispatch =>
      dispatch({
        type: actions.SET_CALIBRATION,
        calibration: data,
      });
  },
  resetCalibration: () => {
    return dispatch =>
      dispatch({
        type: actions.RESET_CALIBRATION,
      });
  },
  setCalTime: time => {
    return dispatch =>
      dispatch({
        type: actions.SET_CAL_TIME,
        time,
      });
  },
};

export default actions;
