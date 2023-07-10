const actions = {
  SET_CALIBRATION: 'auth/SET_CALIBRATION',
  RESET_CALIBRATION: 'auth/RESET_CALIBRATION',

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
};

export default actions;
