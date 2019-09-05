import { combineReducers } from 'redux';
import { profileReducer } from './ProfileReducer';
import { listsReducer } from './ListsReducer';
import { userAccountReducer } from './UserAccountReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  lists: listsReducer,
  userAccount: userAccountReducer,
})

export default rootReducer;