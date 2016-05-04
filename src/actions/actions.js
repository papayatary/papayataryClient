

module.exports = {
  saveFacebookCredentials: function(credentials) {
    return { type: 'SAVE_FACEBOOK_CREDENTIALS', credentials };
  }
};

//---------------- EXAMPLE CODE: ---------------//
// module.exports = {
//   updatePlaces: function(places) {
//     return { type: 'UPDATE_PLACES', places };
//   },

//   savePlace: function(place) {
//     return { type: 'SAVE_PLACE', place };
//   },

//   deletePlace: function(placeId) {
//     return { type: 'DELETE_PLACE', placeId };
//   },

//   saveCoordinate: function(coord) {
//     return { type: 'SAVE_COORDINATE', coord};
//   },

//   fetchCoordinate: function() {
//     return { type: 'FETCH_COORDINATE' };
//   }
// };
