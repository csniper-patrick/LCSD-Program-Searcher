<template lang="html">
    <v-container>
        <v-form>
            <v-text-field
                v-model="query"
                label="Solo"
                placeholder="Search"
                prepend-inner-icon="mdi-text-search"
                append-icon="mdi-menu-down"
                solo
                clearable
                hide-details="auto"
                @click:append="expanded =! expanded">
            </v-text-field>
            <v-expand-transition>
                <v-card v-if="(expanded || this.$vuetify.breakpoint.mdAndUp)">
                    <v-card-text>
                        <v-row>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select 
                                    v-model="selected_type" 
                                    :items="unique_type"
                                    label="Type"
                                    dense
                                    multiple
                                    chips
                                    outlined
                                    hide-details="auto"
                                    clearable></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select
                                    v-model="selected_district"
                                    :items="unique_district"
                                    label="District"
                                    dense
                                    multiple
                                    chips
                                    outlined
                                    hide-details="auto"
                                    clearable></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select
                                v-model="selected_venue"
                                :items="unique_venue"
                                label="Venue"
                                dense
                                multiple
                                chips
                                outlined
                                hide-details="auto"
                                clearable></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select
                                v-model="selected_enroll"
                                :items="unique_enroll"
                                label="Enroll"
                                dense
                                multiple
                                chips
                                outlined
                                hide-details="auto"
                                clearable></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select
                                v-model="selected_target"
                                :items="unique_target"
                                label="Target"
                                dense
                                multiple
                                chips
                                outlined
                                hide-details="auto"
                                clearable></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-text-field label="Age" dense outlined hide-details="auto" type="integer" clearable></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-expand-transition>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "search_panel",
    props: ['raw_list'],
    data: () => ({
        expanded: false,
        selected_type: [],
        selected_district: [],
        selected_venue: [],
        selected_enroll: [],
        selected_target: [],
        query: "",
    }),
    mounted(){
    },
    computed: {
        keywords: function(){
            return (this.query !== null)? this.query.split(" "):[];
        },
        unique_type: function(){
            return  this.$store.state.raw_program_list.map( function (program) { return program.TC_ACT_TYPE_NAME; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_district: function(){
            return  this.$store.state.raw_program_list.map( function (program) { return program.TC_DISTRICT; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_venue: function(){
            return  this.$store.state.raw_program_list.map( function (program) { return program.TC_VENUE; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_enroll: function(){
            return  this.$store.state.raw_program_list.map( function (program) { return program.ENROL_METHOD; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_target: function(){
            return  this.$store.state.raw_program_list.map( function (program) { return program.MIS_TARGET_GRP_Code; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
    },
    watch: {
    },
}
</script>

<style lang="css" scoped>
</style>
