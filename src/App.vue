<template>
    <v-app>
        <v-app-bar color="accent" class="py-0 ma-0" dense prominent app>
            <v-row class="d-flex justify-end">
                <v-col class="pt-1 px-0 pb-0 ma-0" cols="12" sm="12" md="4" lg="4" xl="4">
                    <search_panel />
                </v-col>
            </v-row>

            <template v-slot:extension>
                <v-tabs v-model="current_tab" :right="$vuetify.breakpoint.mdAndUp" fixed-tabs>
                    <v-tabs-slider color="secondary"></v-tabs-slider>
                    <v-tab>
                        search
                        <v-icon>mdi-magnify</v-icon>
                    </v-tab>
                    <v-tab>
                        bookmark
                        <v-icon>mdi-bookmark-check-outline</v-icon>
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
        <v-main>
            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
            <v-container class="pa-0 ma-0 d-flex flex-column flex-grow-1" fluid>
                <v-tabs-items v-model="current_tab">
                    <v-tab-item>
                        <result_panel :displayed_list="this.$store.state.filtered_program_list" />
                    </v-tab-item>
                    <v-tab-item>
                        <result_panel :displayed_list="bookmark_list" />
                    </v-tab-item>
                </v-tabs-items>
            </v-container>
            <v-fab-transition>
                <v-btn
                    bottom
                    left
                    fixed
                    fab
                    color="#FC6D27"
                    href="https://gitlab.com/CSniper/lcsd-program-searcher"
                    target="_blank"
                >
                    <v-icon large color="white">mdi-gitlab</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-main>
        <disclaimer />
    </v-app>
</template>

<script>
import search_panel from './components/search_panel.vue'
import result_panel from './components/result_panel.vue'
import disclaimer from './components/disclaimer.vue'
import axios from 'axios'

export default {
    name: 'App',

    components: {
        search_panel,
        result_panel,
        disclaimer
    },

    data: () => ({
        loading: true,
        tabs: ['search', 'saved'],
        current_tab: 0
    }),
    computed: {
        bookmark_list: function () {
            return this.$store.state.bookmarks
        }
    },
    mounted() {
        this.retrive_raw_prog_list_online()
    },
    watch: {},
    methods: {
        retrive_raw_prog_list_online: async function () {
            const prog_json =
                typeof process.env.VUE_APP_PROG_JSON_PROXY_LINK !== 'undefined'
                    ? process.env.VUE_APP_PROG_JSON_PROXY_LINK
                    : 'https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json'
            try {
                const response = await axios.get(prog_json, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                
                await this.$store.dispatch('set_raw_program_list', response.data)
                this.loading = false
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="css">
</style>
