import { combineReducers } from 'redux';
import { profileReducer } from './ProfileReducer';
import { listsReducer } from './ListsReducer';
import { accountsReducer } from './CreateAccountReducer';
import { appEntryReducer} from './AppEntryReducer';
import { userAccountReducer } from './UserAccountReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  lists: listsReducer,
  newAccount: accountsReducer,
  logIn: appEntryReducer,
  user: userAccountReducer,
})

export default rootReducer;