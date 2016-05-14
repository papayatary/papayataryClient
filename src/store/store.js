
import { 
  applyMiddleware, 
  compose, 
  createStore } from 'redux'
import rootReducer from '../reducers/root'
import logger from 'redux-logger'
import devTools from 'remote-redux-devtools';

//this is function that lets us add a "logger" middleware to the original createStore 
let finalCreateStore = compose(
  // applyMiddleware(logger()), //State logger
  devTools()
)(createStore);

//good to separate out store.js because you can add middleware (above)
export default function configureStore(initialState) {

  return finalCreateStore(rootReducer, initialState)
}
