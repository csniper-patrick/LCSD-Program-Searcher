<template>
    <v-app>
        <v-main>
            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
            <v-row>
                <v-col class="ma-0" cols='12' sm='12' md='4' lg='3' xl='2'>
                    <search_panel/>
                </v-col>
                <v-col class="ma-0" cols='12' sm='12' md='8' lg='9' xl='10'>
                    <result_panel/>
                </v-col>
            </v-row>
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
        axios.get('/lcsd/datagovhk/event/leisure_prog.json')
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
html { overflow-y: hidden;}
</style>
