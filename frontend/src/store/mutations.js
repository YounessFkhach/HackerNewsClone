export default {
  SET_IDS: (state, payload) => {
    state.topicIds = payload.topicIds
    // console.log("ids mutated")
  },
  SET_TOPICS: (state, payload) => {
    state.topics[payload.tab] = payload.topics
    // console.log(payload.tab + " topics mutated")
  },

  // ToDo SET_FAVORITES
  SET_ACTIVE_TAB: (state, payload) => {
    state.activeTab = payload.activeTab
    // console.log("active tab mutated")
  },
  TOGGLE_FETCHING: (state, payload) => {
    state.fetching = payload.fetching;
    // console.log("fetching in toggled", payload.fetching)
  },
  SET_USER: (state, payload) => {
    // console.log("setting user", payload.user.id)
    state.user = payload.user
  },
  LOGOUT: (state, payload) => {
    // console.log("clearing out the user info")
    state.user = null
    state.topics.favorite = []
    state.pages.favorites.page = 1
    state.pages.favorites.totalPages = 1
  },
  SET_TOTAL_PAGES: (state, payload) => {
    state.pages[payload.tab].totalPages = payload.totalPages
    console.log(payload.tab + " total pages mutated to: " + payload.totalPages)
  },
  CHANGE_PAGE: (state, payload) => {
    state.pages[payload.tab].page = payload.page
    console.log(payload.tab + " current page mutated to:" + payload.page)
  }
}