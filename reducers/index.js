import { combineReducers } from 'redux';
import { profileReducer } from './ProfileReducer';

const rootReducer = combineReducers({
  profile: profileReducer
})

export default rootReducer;