import types from './actions';

const initialState = {
  calibration: {},
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

    default:
      return state;
  }
}
