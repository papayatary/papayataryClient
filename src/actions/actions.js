

module.exports = {
  saveFacebookCredentials: (credentials) => {
    return { type: 'SAVE_FACEBOOK_CREDENTIALS', credentials };
  },
  saveAge: (age) => {
    return { type: 'SAVE_AGE', age };
  },
  saveZipCode: (zipCode) => {
    return { type: 'SAVE_ZIP_CODE', zipCode };
  },
  setCurrentPage: (currentPage) => {
    return { type: 'SET_CURRENT_PAGE', currentPage };
  },
  setCurrentMessageId: (toUserData) => {
    return { type: 'SET_CURRENT_MESSAGE_ID', toUserData };
  },
  fetchLastMessage: (message) => {
    return { type: 'FETCH_LAST_MESSAGE', message };
  },
  saveUsers: (users) => {
    return { type: 'SAVE_USERS', users };
  },
  setAuth: (auth) => {
    return { type: 'SET_AUTH', auth };
  },
  incrementUsers: () => {
    return { type: 'INCREMENT_USERS' };
  },
  saveAllMatches: (matches, matchesJSX) => {
    return { type: 'SAVE_ALL_MATCHES', matches, matchesJSX };
  },
  deleteOneMatch: (match) => {
    return { type: 'DELETE_ONE_MATCH', match };
  },
  setSteps: (steps) => {
    return { type: 'SET_STEPS', steps };
  },
  setSearchModalVisible: (isModalVisible) => {
    return { type: 'SET_SEARCH_MODAL_VISIBLE', isModalVisible };
  },
  saveMatch: (match) => {
    return { type: 'SAVE_MATCH', match };
  },
};
