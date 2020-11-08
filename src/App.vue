<template>
    <v-app>
        <v-main>
                <v-row class="overflow-y-auto" height="100%">
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
import prog_list_local from '../public/leisure_prog.json';
//import axios from 'axios';

export default {
    name: 'App',
    
    components: {
        search_panel,
        result_panel,
    },
    
    data: () => ({
        filtered_list: [],
        raw_list: prog_list_local,
    }),
};
</script>
