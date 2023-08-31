import types from './actions';

const initialState = {
  calibration: {},
  calibrationTime: 2000,
};

export default function reducer(state = initialState, action) {
  // console.log('Reducer Change AUTH ===> ', action.type, action);
  switch (action.type) {
    case types.SET_CALIBRATION:
      console.log(`${types.SET_CALIBRATION} => `);
      return {
        ...state,
        calibration: action.calibration,
      };

    case types.RESET_CALIBRATION:
      console.log(`${types.RESET_CALIBRATION} => `);
      return {
        ...state,
        calibration: {},
      };

    case types.SET_CAL_TIME:
      console.log(`${types.SET_CAL_TIME} => `);
      return {
        ...state,
        calibrationTime: action.time,
      };

    default:
      return state;
  }
}
