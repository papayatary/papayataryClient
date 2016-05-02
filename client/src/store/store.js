
import { 
  applyMiddleware, 
  compose, 
  createStore } from 'redux'
import reducer from './reducer'
import logger from 'redux-logger'

//this is function that lets us add a "logger" middleware to the original createStore 
let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)

//good to separate out store.js because you can add middleware (above)
export default function configureStore(initialState = { todos: [] }) {
  // initialState = initialState || {todos: []} //this is ES5 syntax for the above. If initialState is not provided to configureStore, then create an object with todos array
  return finalCreateStore(reducer, initialState)
}
