import Vue from 'vue';
import Vuex from 'vuex';
import libraries from './modules/libraries';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        libraries
    }
});