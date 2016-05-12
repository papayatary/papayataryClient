

module.exports = {
  saveFacebookCredentials: function(credentials) {
    return { type: 'SAVE_FACEBOOK_CREDENTIALS', credentials };
  },
  saveAge: function(age) {
    return { type: 'SAVE_AGE', age };
  },
  saveZipCode: function(zipCode) {
    return { type: 'SAVE_ZIP_CODE', zipCode };
  },
  setCurrentPage: function(currentPage) {
    return { type: 'SET_CURRENT_PAGE', currentPage };
  },
  setCurrentMessageId: function(toUserData) {
    return { type: 'SET_CURRENT_MESSAGE_ID', toUserData };
  },
  saveAllMatches: function(matches, matchesJSX) {
    return { type: 'SAVE_ALL_MATCHES', matches, matchesJSX };
  },
};
