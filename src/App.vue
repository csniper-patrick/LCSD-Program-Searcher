<template>
    <v-app>
        <v-app-bar color="accent" class="py-0 ma-0" dense prominent app>
            <v-row class="d-flex justify-end" >
                <v-col class="py-0 ma-0" cols='12' sm='12' md='4' lg='4' xl='4'>
                    <search_panel/>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
            <v-container class="py-0 ma-0 d-flex flex-column flex-grow-1" fluid>
                <result_panel/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import search_panel from './components/search_panel.vue';
import result_panel from './components/result_panel.vue';
import axios from 'axios';

export default {
    name: 'App',
    
    components: {
        search_panel,
        result_panel,
    },
    
    data: () => ({
        loading: true,
    }),
    
    mounted () {
        var self = this;
        //const prog_json='/lcsd/datagovhk/event/leisure_prog.json';
        const prog_json='https://cors-anywhere.herokuapp.com/https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json';
        axios.get(prog_json, { headers: { 'X-Requested-With' : "XMLHttpRequest"} })
        .then(function (res) {
            self.$store.dispatch("set_raw_program_list", res.data);
            self.$store.dispatch("set_filtered_program_list", res.data);
            self.loading=false;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    },
};
</script>

<style lang="css">
</style>
