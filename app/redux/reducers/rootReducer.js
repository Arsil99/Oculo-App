import {combineReducers} from 'redux';
import auth from './auth/reducer';
import language from './language/reducer';
import notification from './notification/reducer';

const rootReducer = combineReducers({
  auth,
  language,
  notification,
});

export default rootReducer;
