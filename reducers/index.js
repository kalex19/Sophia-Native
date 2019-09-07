import { combineReducers } from 'redux';
import { profileReducer } from './ProfileReducer';
import { listsReducer } from './ListsReducer'
import { taskReducer } from './TaskReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  lists: listsReducer,
  tasks: taskReducer
})

export default rootReducer;