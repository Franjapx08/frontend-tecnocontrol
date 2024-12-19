import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    drawer: true,
  },
  getters: {
    getDrawer: (state) => state.drawer
  },
  actions: {
    toggleDrawer: ({ commit }, drawer) => {
      commit("SET_DRAWER", drawer);
    },
  },
  mutations: {
    SET_DRAWER: (state, drawer) => {
      state.drawer = drawer;
    },
  }
});
