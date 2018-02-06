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
        let topics = []
        let page = Number(route.params.page) || 1
        commit({
            type: 'TOGGLE_FETCHING',
            fetching: true
        })
        switch (activeTab) {
            case 'top':
                topics = await fetchTop(page)
                commit({
                  type: 'SET_TOP',
                  topics
                })
                break;
            case 'new':
                topics = await fetchNew(page)
                commit({
                  type: 'SET_NEW',
                  topics
                })
                break;
                // ToDo favorites
            default:
                break;
        }
        commit({
          type: 'TOGGLE_FETCHING',
          fetching: false
      })
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
