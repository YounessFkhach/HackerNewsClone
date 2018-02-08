import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            user: null,
            topics: {
                top: [],
                new: [],
                favorites: []
            },
            pages: {
              top: {
                page: 1,
                totalPages: 1,
              },
              new: {
                page: 1,
                totalPages: 1,
              },
              favorites: {
                page: 1,
                totalPages: 1,
              },
            },
            activeTab: "top",
            fetching: false
        },
        actions,
        mutations,
        getters
    })
}
