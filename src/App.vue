<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols='12' sm='12' md='4' lg='4' xl='3'>
                        <search_panel/>
                    </v-col>
                    <v-col cols='12' sm='12' md='8' lg='8' xl='9'>
                        <result_panel v-bind:search_result="raw_list"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import search_panel from './components/search_panel.vue';
import result_panel from './components/result_panel.vue';
import prog_list_local from './assets/leisure_prog.json';

export default {
    name: 'App',
    
    components: {
        search_panel,
        result_panel,
    },
    
    data: () => ({
        filtered_list: [
            { code: "001", name: "tennis", district: "Tai Po" },
            { code: "002", name: "tennis", district: "North" },
            { code: "003", name: "tennis", district: "MK" },
            { code: "004", name: "tennis", district: "ShaTin" },
            { code: "005", name: "tennis", district: "south" },
        ],
        raw_list: prog_list_local,
    }),
};
</script>
