
// const initialState = {
//   userId: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   age: null
// };
const initialState = {
  age: null,
  zipCode: null
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
    default:
      return state;
  }
};
