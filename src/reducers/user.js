
// const initialState = {
//   userId: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   age: null
// };
const initialState = {
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case 'SAVE_FACEBOOK_CREDENTIALS':
      var newState = Object.assign({}, state); // this is the object version of arr.slice() for duplicating an object
      newState.facebookCredentials = action.credentials.credentials;
      return newState;
    default:
      return state;
  }
};
