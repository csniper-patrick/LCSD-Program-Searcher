<template>
    <v-app>
        <v-app-bar color="accent" class="py-0 ma-0" dense prominent app>
            <v-row class="d-flex justify-end">
                <v-col class="pt-1 px-0 pb-0 ma-0" cols="12" sm="12" md="4" lg="4" xl="4">
                    <search_panel />
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
            <v-container class="pa-0 ma-0 d-flex flex-column flex-grow-1" fluid>
                <v-tabs-items touchless v-model="$store.state.current_tab">
                    <v-tab-item :transition="false" :reverse-transition="false">
                        <result_panel :displayed_list="this.$store.state.filtered_program_list" />
                    </v-tab-item>
                    <v-tab-item :transition="false" :reverse-transition="false">
                        <v-card align="center" justify="center" flat class="py-0 ma-0">
                            <v-card-title class="py-1 ma-0">
                                <strong>{{ $store.state.lang_zh ? "即將/現正接受報名" : "Upcoming/Now Open" }}</strong>
                            </v-card-title>
                        </v-card>
                        <result_panel :displayed_list="deadline_approaching_bookmarks" />
                        <v-card align="center" justify="center" flat class="py-0 my-0">
                            <v-card-title class="py-1 my-0">
                                <strong>{{ $store.state.lang_zh ? "已截止/候補" : "Closed/Clearing Round" }}</strong>
                            </v-card-title>
                        </v-card>
                        <result_panel :displayed_list="deadline_passed_bookmarks" />
                    </v-tab-item>
                </v-tabs-items>
            </v-container>
            <v-fab-transition>
                <v-btn
                    id="gitlab_btn"
                    fixed
                    fab
                    medium
                    color="#FC6D27"
                    href="https://gitlab.com/CSniper/lcsd-program-searcher"
                    target="_blank"
                >
                    <v-icon large color="white">mdi-gitlab</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-main>
        <v-bottom-navigation fixed app background-color="accent">
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
            <v-btn x-large @click="$store.state.current_tab = 0">
                SEARCH ({{ this.$store.state.filtered_program_list.length }})
                <v-icon :color="$store.state.current_tab == 0 ? 'white' : ''">mdi-magnify</v-icon>
            </v-btn>
            <v-btn x-large @click="$store.state.current_tab = 1">
                BOOKMARK ({{ this.$store.state.bookmarks.length }})
                <v-icon :color="$store.state.current_tab == 1 ? 'white' : ''">mdi-bookmark-check-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
        <disclaimer />
    </v-app>
</template>

<script>
import search_panel from "./components/search_panel.vue";
import result_panel from "./components/result_panel.vue";
import disclaimer from "./components/disclaimer.vue";
import axios from "axios";

export default {
    name: "App",

    components: {
        search_panel,
        result_panel,
        disclaimer,
    },

    data: () => ({
        loading: true,
        tabs: ["search", "saved"],
    }),
    computed: {
        deadline_passed_bookmarks: function() {
            return this.$store.state.bookmarks.filter(program => {
                const enroll_deadline = new Date(
                    program.ENROL_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString()
                );
                return enroll_deadline < Date.now() - (Date.now() % 86400000);
            });
        },
        deadline_approaching_bookmarks: function() {
            return this.$store.state.bookmarks
                .filter(program => {
                    const enroll_deadline = new Date(
                        program.ENROL_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString()
                    );
                    return enroll_deadline >= Date.now() - (Date.now() % 86400000);
                })
                .sort((a, b) => {
                    const deadline_a = new Date(a.ENROL_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString());
                    const deadline_b = new Date(b.ENROL_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString());
                    const enroll_a = new Date(a.ENROL_START_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString());
                    const enroll_b = new Date(b.ENROL_START_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString());
                    if (deadline_a != deadline_b) {
                        return deadline_a - deadline_b;
                    } else if (enroll_a != enroll_b) {
                        return enroll_a - enroll_b;
                    } else {
                        return Number(a.PGM_CODE) - Number(b.PGM_CODE);
                    }
                });
        },
    },
    mounted() {
        this.$nextTick(this.retrive_raw_prog_list_online);
    },
    watch: {},
    methods: {
        retrive_raw_prog_list_online: async function() {
            const prog_json =
                typeof process.env.VUE_APP_PROG_JSON_PROXY_LINK !== "undefined"
                    ? process.env.VUE_APP_PROG_JSON_PROXY_LINK
                    : "https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json";
            try {
                const response = await axios.get(prog_json, { headers: { "X-Requested-With": "XMLHttpRequest" } });

                await this.$store.dispatch("set_raw_program_list", response.data);
                this.loading = false;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>

<style lang="css">
#gitlab_btn {
    z-index: 10;
    bottom: 28px;
    left: 5px;
}
</style>
