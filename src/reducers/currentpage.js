
// EXAMPLE CODE:
const initialState = {
  page: 'search',
  // page: null
};

export default function currentPage (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      var newState = Object.assign({}, state); // this is the object version of arr.slice() for duplicating an object
      // console.log('This is action in the reducer', action.currentPage);
      newState.page = action.currentPage;
      return newState;
    default:
      return state;
  }
}
