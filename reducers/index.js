import { combineReducers } from 'redux';
import { profileReducer } from './ProfileReducer';
import { listsReducer } from './ListsReducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  lists: listsReducer
})

export default rootReducer;