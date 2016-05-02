
import { combineReducers } from 'redux';
import user from './user.js';
import place from './place.js';


const rootReducer = combineReducers({
  user,
  place
});

export default rootReducer;
