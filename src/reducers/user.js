
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
      return newState;
    case 'INCREMENT_USERS':
      var newState = Object.assign({}, state);
      if(state.users.length -1 === state.usersIndex){
        newState.usersIndex = 0;
      } else {
        newState.usersIndex = state.usersIndex + 1;
      }
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
