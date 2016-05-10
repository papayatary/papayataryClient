
// const initialState = {
//   userId: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   age: null
// };
const initialState = {
  facebookId: '1982923402394',
  firstName: 'Blake',
  lastName: 'Lively',
  picturePath: 'http://hbz.h-cdn.co/assets/cm/14/52/54988f0f50262_-_hbz-blake-lively-style-alert-promo-xln.jpg',
};

export default function message (state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGE_ID':
      return state;
    default:
      return state;
  }
};
