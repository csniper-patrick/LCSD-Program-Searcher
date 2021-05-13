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
            state.raw_program_list = payload.sort((a, b) => {
                var tmp = 0
                //sort by type
                if (a.EN_ACT_TYPE_NAME && (tmp = a.EN_ACT_TYPE_NAME.localeCompare(b.EN_ACT_TYPE_NAME)) && tmp != 0)
                    return tmp

                //sort by name
                if (a.EN_PGM_NAME && (tmp = a.EN_PGM_NAME.localeCompare(b.EN_PGM_NAME)) && tmp != 0) return tmp

                //sort by district
                if (a.EN_DISTRICT && (tmp = a.EN_DISTRICT.localeCompare(b.EN_DISTRICT)) && tmp != 0) return tmp

                //sort by venue
                if (a.EN_VENUE && (tmp = a.EN_VENUE.localeCompare(b.EN_VENUE)) && tmp != 0) return tmp

                return Number(b.PGM_CODE) - Number(a.PGM_CODE)
            });
            state.bookmarks = state.bookmarks.map((bookmark_item) => {
                let updated_item;
                if ((updated_item = payload.find((program_item) => program_item.PGM_CODE == bookmark_item.PGM_CODE))) {
                    return updated_item;
                } else {
                    return bookmark_item;
                }
            })
            localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        },
        set_filtered_program_list(state, payload) {
            state.filtered_program_list = payload;
        },
        switch_lang(state, payload) {
            state.lang_zh = payload;
            localStorage.setItem('lang', JSON.stringify((payload) ? 'zh' : 'en'));
        },
        add_bookmark(state, payload) {
            if (!state.bookmarks.some(program => program.PGM_CODE == payload)) {
                state.bookmarks.push(state.raw_program_list.find(program => program.PGM_CODE == payload));
            }
            localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        },
        remove_bookmark(state, payload) {
            if (state.bookmarks.some(program => program.PGM_CODE == payload)) {
                state.bookmarks.splice(state.bookmarks.findIndex(program => program.PGM_CODE == payload), 1);
            }
            localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        },
        load_bookmarks(state, payload) {
            state.bookmarks = payload.filter((program) => {
                const program_end_data = new Date(program.PGM_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString());
                return program_end_data.valueOf() >= Date.now() - 604800000;
            });
            localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        },
        replying_disclaimer(state, payload) {
            state.disclaimer_agreed = payload;
            localStorage.setItem('disclaimer_agreed', JSON.stringify(state.disclaimer_agreed));
        }
    },
    actions: {
        set_raw_program_list(context, payload) {
            context.commit("set_raw_program_list", payload);
        },
        set_filtered_program_list(context, payload) {
            context.commit("set_filtered_program_list", payload);
        },
        retrive_local_storage(context) {
            if (localStorage.bookmarks) {
                context.commit('load_bookmarks', JSON.parse(localStorage.getItem('bookmarks')));
            }
            if (localStorage.lang) {
                context.commit('switch_lang', (JSON.parse(localStorage.getItem('lang')) == 'zh'))
            }
            if (localStorage.disclaimer_agreed) {
                context.commit('replying_disclaimer', JSON.parse(localStorage.getItem('disclaimer_agreed')));
            }
        },

    },
    modules: {
    }
})
