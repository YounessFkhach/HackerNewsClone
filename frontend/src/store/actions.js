import {
    fetchTop,
    fetchNew,
    fetchTopics
} from '../api'
import { login, logout, getUser } from '../api/auth'

export default {
    FETCH: async ({
        state,
        commit,
        dispatch
    }, { activeTab, route }) => {
        let topicIds = []
        let page = Number(route.params.page) || 1
        commit({
            type: 'TOGGLE_FETCHING',
            fetching: true
        })
        switch (activeTab) {
            case 'top':
                topicIds = await fetchTop(page)
                break;
            case 'new':
                topicIds = await fetchNew(page)
                break;
                // ToDo favorites
            default:
                break;
        }
        dispatch({
            type: 'FETCH_TOPICS',
            topicIds: topicIds,
            activeTab: activeTab
        })
    },

    FETCH_TOPICS: async ({
        commit
    }, payload) => {
        const topics = (await fetchTopics(payload.topicIds)).map(elem => elem.data)
        commit({
            type: 'TOGGLE_FETCHING',
            fetching: false
        })
        switch (payload.activeTab) {
            case 'top':
                commit({
                    type: 'SET_TOP',
                    topics
                })
                break;
            case 'new':
                commit({
                    type: 'SET_NEW',
                    topics
                })
                break;
                // ToDo favorites
            default:
                break;
        }
    },

    GET_USER: async ({ commit }) => {
      var user = await getUser()
      if(user){
        commit({
          type: 'SET_USER',
          user
        })
      }
    },

    LOGOUT: async ({ commit }) => {
      try {
        await logout()
        commit('LOGOUT')
      } catch (error) {
        console.log(error)
      }
    }
}
