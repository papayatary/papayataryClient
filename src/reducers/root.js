
import { combineReducers } from 'redux';
import user from './user.js';
import place from './place.js';
import currentPage from './currentpage.js';

const rootReducer = combineReducers({
  user,
  place,
  currentPage
});

export default rootReducer;
