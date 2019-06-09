import Vue from "vue";
import Vuex from "vuex";
import auth from "./stores/auth";
import alert from "./stores/alert";
import books from "./stores/books";
import createPersistedState from 'vuex-persistedstate';
import * as Cookie from 'js-cookie';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    // cart, // <= tambahkan ini
    alert,
    // dialog,
    auth,
    // region,
    // courier
    books
  },
  plugins: [
    createPersistedState({
            // paths: ['auth.user'],
            getItem: (key) => Cookie.getJSON(key), 
            setItem: (key, state) => Cookie.set(key, state, { expires: 1, secure: false }),
            // removeItem: key => Cookie.remove(key)
    })
  ]

});
