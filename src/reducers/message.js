
// const initialState = {
//   userId: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   age: null
// };

export default function message (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGE_ID':
      return state;
    default:
      return state;
  }
};
