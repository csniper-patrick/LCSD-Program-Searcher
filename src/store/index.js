import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      raw_program_list: [],
      filtered_program_list: [],
      lang_zh: true,
      bookmarks: [],
      disclaimer_agreed: false,
  },
  mutations: {
      set_raw_program_list(state, payload) {
          state.raw_program_list = payload;
      },
      set_filtered_program_list(state, payload) {
          state.filtered_program_list = payload;
      },
      switch_lang(state, payload){
          state.lang_zh = payload;
          localStorage.setItem('lang',JSON.stringify( (payload)? 'zh':'en'));
      },
      add_bookmark(state, payload){
          if(!state.bookmarks.includes(payload)){
              state.bookmarks.push(payload);
          }
          localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
      },
      remove_bookmark(state, payload){
          if(state.bookmarks.includes(payload)){
              state.bookmarks.splice(state.bookmarks.indexOf(payload), 1);
          }
          localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
      },
      load_bookmarks(state, payload){
          state.bookmarks=payload;
      },
      replying_disclaimer(state, payload){
          state.disclaimer_agreed=payload;
          localStorage.setItem('disclaimer_agreed',JSON.stringify(state.disclaimer_agreed));
      }
  },
  actions: {
      set_raw_program_list(context, payload) {
          context.commit("set_raw_program_list", payload);
      },
      set_filtered_program_list(context, payload) {
          context.commit("set_filtered_program_list", payload);
      },
      retrive_local_storage(context){
          if(localStorage.bookmarks){
              context.commit('load_bookmarks', JSON.parse(localStorage.getItem('bookmarks')));
          }
          if (localStorage.lang) {
              context.commit('switch_lang', (JSON.parse(localStorage.getItem('lang')) == 'zh') )
          }
          if (localStorage.disclaimer_agreed) {
              context.commit('replying_disclaimer', JSON.parse(localStorage.getItem('disclaimer_agreed')) );
          }
      },
      
  },
  modules: {
  }
})
