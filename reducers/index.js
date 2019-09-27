import { combineReducers } from 'redux';
import { profileReducer } from './ProfileReducer';
import { listsReducer } from './ListsReducer';
import { userAccountReducer } from './UserAccountReducer';
import { taskReducer } from './TaskReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  lists: listsReducer,
  userAccount: userAccountReducer,
  tasks: taskReducer
})

export default rootReducer;