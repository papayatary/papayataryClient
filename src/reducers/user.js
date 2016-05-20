
// const initialState = {
//   userId: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   age: null
// };
const initialState = {
  age: null,
  zipCode: null,
  missingAgeOrZip: false,
};
  import serverIpAddress from '../config/serverIpAddress';

export default function user (state = initialState, action) {
  switch (action.type) {
    case 'SAVE_FACEBOOK_CREDENTIALS':

      // refactor data to desired schema
      action.credentials.facebookId = action.credentials.id
      var names = action.credentials.name.split(' ')
      action.credentials.firstName = names[0];
      action.credentials.lastName = names[names.length - 1];
      // remove undesired data
      delete action.credentials.id
      delete action.credentials.name;

      // map credentials to state
      return {...state, ...action.credentials}
    case 'SAVE_AGE':
      var newState = Object.assign({}, state);
      newState.age = Number(action.age.text);
      return newState;
    case 'SAVE_ZIP_CODE':
      var newState = Object.assign({}, state);
      newState.zipCode = Number(action.zipCode.text);
      return newState;
    case 'TOGGLE_MISSING_AGE_OR_ZIP':
      var newState = Object.assign({}, state);
      newState.missingAgeOrZip = !newState.missingAgeOrZip;
      return newState;
    case 'SAVE_USERS':
      var newState = Object.assign({}, state);
      newState.users = Object(action.users.userQueue);
      newState.usersIndex = 0;
      newState.currentSearchUser = newState.users[0];
      return newState;
    case 'REMOVE_CURRENT_SEARCH_USER':
      var newState = Object.assign({}, state);
      newState.users.splice(0, 1);
      newState.currentSearchUser = newState.users[0];
      return newState;
    case 'INCREMENT_USERS':
      var newState = Object.assign({}, state);
      if(state.users.length -1 === state.usersIndex){
        newState.usersIndex = 0;
      } else {
        newState.usersIndex = state.usersIndex + 1;
      }
      return newState;
    case 'POP_USER':
      var newState = Object.assign({}, state);
      newState.users.splice(action.index, 1);
      if(newState.users.length === 0) {
        newState.users.push({
          id:'outofMatches',
          firstName: 'Blake',
          picturePath:`http://${serverIpAddress}:8000/public/img/blake-lively.jpg`,
          age: 25,
          steps: 63200,
          restingHeartRate: 71 });
      } else if( action.index === newState.users.length) {
        newState.usersIndex = 0;
      }
      return newState;
    case 'SET_CURRENT_SEARCH_USER':
      var newState = Object.assign({}, state);
      newState.currentSearchUser = action.user;
      return newState;
    case 'SET_AUTH':
      var newState = Object.assign({}, state);
      newState.isAuthed = Boolean(action.auth.isAuthed)
      return newState;
    case 'SET_STEPS':
      var newState = Object.assign({}, state);
      newState.steps = Number(action.steps);
      return newState;
    case 'SET_SEARCH_MODAL_VISIBLE':
      var newState = Object.assign({}, state);
      newState.isModalVisible = Boolean(action.isModalVisible);
      return newState;
    case 'SAVE_MATCH':
      return {...state, ...action.match}
    default:
      return state;
  }
};
