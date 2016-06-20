
import {combineReducers} from 'redux'

import user from './userReducer'
import task from './taskReducer'
import project from './projectReducer'
import activity from './activityReducer'

const rootReducer = combineReducers({
  user,
  task,
  project,
  activity,
});

export default rootReducer;
