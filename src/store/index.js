import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import prod from './modules/prod'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'
import dataScreen from './modules/dataScreen'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        tagsView,
        permission,
        settings,
        prod,
        dataScreen
    },
    getters
})

export default store