import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      raw_program_list: [],
      filtered_program_list: [],
  },
  mutations: {
      set_raw_program_list(state, payload) {
          state.raw_program_list = payload;
      },
      set_filtered_program_list(state, payload) {
          state.filtered_program_list = payload;
      },
  },
  actions: {
      set_raw_program_list(context, payload) {
          context.commit("set_raw_program_list", payload);
      },
      set_filtered_program_list(context, payload) {
          context.commit("set_filtered_program_list", payload);
      },
  },
  modules: {
  }
})
