
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
    case 'DELETE_ONE_MATCH':
      var newState = Object.assign({}, state);
      for (var i = 0; i < newState.matches.length; i++) {
        if (newState.matches[i].id === action.match.toUserId) {
          newState.matches.splice(i, 1);
          newState.matchesJSX.splice(i, 1);
          break;
        }
      }
      return newState;
    default:
      return state;
  }
};
