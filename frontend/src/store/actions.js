import {
  fetchTop,
  fetchNew,
  fetchTopics,
  fetchFavorites,
} from '../api'
import {
  login,
  logout,
  getUser
} from '../api/auth'


export default {
  FETCH: async ({
    state,
    commit,
    dispatch
  }, {
    activeTab,
    page
  }) => {
    var res = {}
    let topics = []
    let totalPages = 1
    if(!page){
      page = state.pages[activeTab].page
    }
    
    // to start the loading animation
    commit({
      type: 'TOGGLE_FETCHING',
      fetching: true
    })
    switch (activeTab) {
      case 'top':
        res = await fetchTop(page)
        break;
      case 'new':
        res = await fetchNew(page)
        break;
      case 'favorites':
        res = await fetchFavorites(page)
        break;
      default:
        break;
    }
    totalPages = res.totalPages
    topics = res.topics

    // commit data to the store
    commit({
      type: 'SET_TOPICS',
      topics,
      tab: activeTab
    })
    // set total pages
    commit({
      type: 'SET_TOTAL_PAGES',
      totalPages,
      tab: activeTab
    })
    
    // to stop the loading animation
    commit({
      type: 'TOGGLE_FETCHING',
      fetching: false
    })
  },

  GET_USER: async ({
    commit
  }) => {
    var user = await getUser()
    if (user) {
      commit({
        type: 'SET_USER',
        user
      })
    }
  },

  LOGOUT: async ({
    commit
  }) => {
    try {
      await logout()
      commit('LOGOUT')
    } catch (error) {
      console.log(error)
    }
  }
}