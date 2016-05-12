
import { combineReducers } from 'redux';
import user from './user.js';
import place from './place.js';
import currentPage from './currentpage.js';
import message from './message.js';
import match from './match.js';

const rootReducer = combineReducers({
  user,
  place,
  currentPage,
  message,
  match,
});

export default rootReducer;
