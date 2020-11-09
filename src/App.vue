<template>
    <v-app>
        <v-main>
            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
            <v-row>
                <v-col cols='12' sm='12' md='4' lg='3' xl='2'>
                    <search_panel/>
                </v-col>
                <v-col  cols='12' sm='12' md='8' lg='9' xl='10'>
                    <result_panel v-bind:search_result="raw_list"/>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import search_panel from './components/search_panel.vue';
import result_panel from './components/result_panel.vue';
//import prog_list_local from '../public/leisure_prog.json';
import axios from 'axios';

export default {
    name: 'App',
    
    components: {
        search_panel,
        result_panel,
    },
    
    data: () => ({
        filtered_list: [],
        raw_list: [],
        loading: true,
    }),
    
    mounted () {
        var self = this;
        axios.get('/lcsd/datagovhk/event/leisure_prog.json')
        .then(function (res) {
            console.log(res.data);
            self.raw_list=res.data;
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
html { overflow-y: hidden;}
</style>
