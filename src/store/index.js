require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import product from './modules/product'
import getters from './getters'

import createLog from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        app,
        user,
        product
    },
    getters,
    strict: debug,
    plugins: debug ? [createLog()] : []
})

export default store