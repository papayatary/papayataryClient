
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
     
      // var newState = Object.assign({}, state); // this is the object version of arr.slice() for duplicating an object
      // for(var prop in action.credentials) {
      //   newState[prop] = action.credentials[prop]
      // }
      // return newState;
      return {...state,...action.credentials}
    default:
      return state;
  }
};
