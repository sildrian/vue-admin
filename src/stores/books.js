export default {
    namespaced: true,
    state: {
        bookAll : [],
    },
    mutations: {
        set: (state, payload) => {
            state.bookAll = payload
        },
    },
    actions: {
        set: ({commit}, payload) => {
        commit('set', payload)
        },
    },
    getters: {
        bookAll : state => state.bookAll
    }

}