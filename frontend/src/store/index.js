import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            User: {},
            topics: {
                top: [],
                new: [],
                favorites: []
            },
            activeTab: "top",
            fetching: false
        },
        actions,
        mutations,
        getters
    })
}
