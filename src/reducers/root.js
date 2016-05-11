
import { combineReducers } from 'redux';
import user from './user.js';
import place from './place.js';
import currentPage from './currentpage.js';
import message from './message.js';

const rootReducer = combineReducers({
  user,
  place,
  currentPage,
  message
});

export default rootReducer;
