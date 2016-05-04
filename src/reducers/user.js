
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
      console.log('Old State: ', state);
      console.log('Action: ', action);
      var newState = Object.assign({}, state);
      newState.facebookCredentials = action.credentials.credentials;
      console.log('New State: ', newState.facebookCredentials);
      return newState;
    default:
      return state;
  }
};
