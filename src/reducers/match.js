
// const initialState = {
//   userId: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   age: null
// };
const initialState = {
};

export default function match (state = initialState, action) {
  switch (action.type) {
    case 'SAVE_ALL_MATCHES':
      var newState = Object.assign({}, state);
      newState.matches = action.matches;
      newState.matchesJSX = action.matchesJSX;
      return newState;
    default:
      return state;
  }
};
