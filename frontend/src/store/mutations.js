
export default {
    SET_IDS: (state, payload) => {
        state.topicIds = payload.topicIds
        console.log("ids mutated")
    },
    SET_TOP: (state, payload) => {
        state.topics.top = payload.topics
        console.log("top topics mutated")
    },
    SET_NEW: (state, payload) => {
        state.topics.new = payload.topics
        console.log("new topics mutated")
    },
    // ToDo SET_FAVORITES
    SET_ACTIVE_TAB: (state, payload) => {
        state.activeTab = payload.activeTab
        console.log("active tab mutated")
    },
    TOGGLE_FETCHING: (state, payload) => {
        state.fetching = payload.fetching;
        console.log("fetching in toggled", payload.fetching)
    },
    SET_USER: (state, payload) => {
      console.log("setting user", payload.user.id)
      state.user = payload.user
    },
    LOGOUT: (state, payload) => {
      console.log("clearing out the user info")
      state.user = null
      // todo
    }
}
