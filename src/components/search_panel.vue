<template lang="html">
    <v-container>
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            offset-y
            bottom>
            <template v-slot:activator="{ on }">
                <v-text-field
                    background-color="white"
                    v-model="query"
                    v-on="on"
                    label="Search"
                    placeholder="keywords"
                    append-icon="mdi-magnify"
                    outlined
                    rounded
                    clearable
                    hide-details="auto">
                </v-text-field>
                <v-spacer class="d-flex justify-end">
                    <v-switch inset dese hide-details
                        label="ENG - 中"
                        class="pa-0 ma-0"
                        color="white"
                        v-model="use_zh">
                    </v-switch>
                </v-spacer>
            </template>
            <v-card :width="($vuetify.breakpoint.mdAndUp)?'33vw':'100vw'">
                <v-card-text>
                    <v-row>
                        <v-col cols='12' sm='4' md='12' lg='12' xl='12'>
                            <v-autocomplete dense multiple small-chips deletable-chips outlined clearable
                                v-model="selected_type" 
                                :items="unique_type"
                                item-text="value"
                                item-value="key"
                                label="Type"
                                hide-details="auto"
                                auto-select-first
                                :filter="lower_case_compare">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols='12' sm='4' md='12' lg='12' xl='12'>
                            <v-autocomplete dense multiple small-chips deletable-chips outlined clearable
                                v-model="selected_district"
                                :items="unique_district"
                                item-text="value"
                                item-value="key"
                                label="District"
                                hide-details="auto"
                                auto-select-first
                                :filter="lower_case_compare">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols='12' sm='4' md='12' lg='12' xl='12'>
                            <v-autocomplete dense multiple small-chips deletable-chips outlined clearable
                                v-model="selected_venue"
                                :items="unique_venue"
                                label="Venue"
                                item-text="value"
                                item-value="key"
                                hide-details="auto"
                                auto-select-first
                                :filter="lower_case_compare">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols='6' sm='4' md='6' lg='6' xl='6'>
                            <v-select dense multiple small-chips deletable-chips outlined clearable
                                v-model="selected_enroll"
                                :items="unique_enroll"
                                item-text="value"
                                item-value="key"
                                label="Enroll"
                                hide-details="auto">
                            </v-select>
                        </v-col>
                        <v-col cols='6' sm='4' md='6' lg='6' xl='6'>
                            <v-select dense multiple small-chips deletable-chips outlined clearable
                                v-model="selected_target"
                                :items="unique_target"
                                item-text="value"
                                item-value="key"
                                label="Target"
                                hide-details="auto">
                            </v-select>
                        </v-col>
                        <v-col cols='6' sm='4' md='6' lg='6' xl='6'>
                            <v-text-field v-model="selected_age" label="Age" dense outlined hide-details="auto" type="number" clearable></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-chip-group
                        active-class="primary--text"
                        v-model="selected_weekday"
                        column
                        multiple>
                        <v-chip
                            v-for="tag in ['SUN','MON','TUE','WED','THU','FRI','SAT']"
                            :key="tag"
                            :filter="$vuetify.breakpoint.mdAndUp"
                            dark
                            small>
                            {{ tag }}
                        </v-chip>
                    </v-chip-group>
                    <v-row class="px-3">
                        <v-chip>
                            {{ formated_time_range[0] }}
                        </v-chip>
                        <v-range-slider min=0 max=1440 step=30 
                            ticks v-model="selected_time_range">
                        </v-range-slider>
                        <v-chip>
                            {{ formated_time_range[1] }}
                        </v-chip>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-menu>
    </v-container>
</template>

<script>
import target_dict from '../target_dict.json';
import enroll_dict from '../enroll_dict.json';

export default {
    name: "search_panel",
    props: ['raw_list'],
    data: () => ({
        use_zh: true,
        expanded: false,
        selected_type: [],
        selected_district: [],
        selected_venue: [],
        selected_enroll: [],
        selected_target: [],
        selected_weekday: [0, 1, 2, 3, 4, 5, 6],
        selected_time_range: [0, 1440],
        selected_age: null,
        query: "",
    }),
    mounted(){
    },
    computed: {
        raw_program_list: function(){
            return this.$store.state.raw_program_list;
        },
        keywords: function(){
            var list = (this.query !== null)? this.query.split(","):[];
            return list.map( (keyword) => { return keyword.trim() } );
        },
        unique_type: function(){
            var T=this;
            var mapping=this.raw_program_list.map( function (program) { 
                return { key: program.EN_ACT_TYPE_NAME, value: (T.use_zh)? program.TC_ACT_TYPE_NAME:program.EN_ACT_TYPE_NAME} ; 
            } )
            return  mapping.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_district: function(){
            var T=this;
            var mapping=this.raw_program_list.map( function (program) { 
                return { key: program.EN_DISTRICT, value: (T.use_zh)? program.TC_DISTRICT:program.EN_DISTRICT} ; 
            } )
            return  mapping.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_venue: function(){
            var T=this;
            var mapping=this.raw_program_list.map( function (program) { 
                return { key: program.EN_VENUE, value: (T.use_zh)? program.TC_VENUE:program.EN_VENUE} ; 
            } )
            return  mapping.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        unique_enroll: function(){
            var T=this;
            var code=this.raw_program_list.map( function (program) { return program.ENROL_METHOD; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            return code.map( function(c){
                return (T.use_zh)? enroll_dict[c]['zh']:enroll_dict[c]['en'];
            } );
        },
        unique_target: function(){
            var T=this;
            var code = this.raw_program_list.map( function (program) { return program.MIS_TARGET_GRP_Code; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            return code.map( function(c){
                return (T.use_zh)? target_dict[c]['zh']:target_dict[c]['en'];
            } );
        },
        formated_time_range: function(){
            var min = String(Math.floor(this.selected_time_range[0]/60)).padStart(2, '0') + ':' + String(Math.floor(this.selected_time_range[0]%60)).padStart(2, '0');
            var max = String(Math.floor(this.selected_time_range[1]/60)).padStart(2, '0') + ':' + String(Math.floor(this.selected_time_range[1]%60)).padStart(2, '0');
            console.log([min,max]);
            return [min,max];
        }
    },
    watch: {
        use_zh: function(val){
            this.$store.commit('switch_lang', val);
        },
        selected_type: async function(){this.select_program()},
        selected_district: async function(){this.select_program()},
        selected_venue: async function(){this.select_program()},
        selected_enroll: async function(){this.select_program()},
        selected_target: async function(){this.select_program()},
        keywords: async function(){this.select_program()},
        selected_age: async function(){this.select_program()},
    },
    methods: {
        select_program: async function(){
            var self = this;
            var selected_list=this.raw_program_list;
            var c;
            //select by type
            if(this.selected_type.length!=0){
                selected_list = selected_list.filter( (program) => {
                    for (c of this.selected_type) {
                        if(c.localeCompare(program.EN_ACT_TYPE_NAME)==0) return true;
                    }
                    return false;
                } );
            }
            //select by district or venue
            if(this.selected_venue.length!=0 || this.selected_district.length!=0){
                selected_list = selected_list.filter( (program) => {
                    for (c of this.selected_district) {
                        if(c.localeCompare(program.EN_DISTRICT)==0) return true;
                    }
                    for (c of this.selected_venue) {
                        if(c.localeCompare(program.EN_VENUE)==0) return true;
                    }
                    return false;
                } );
            }
            //select by enroll method
            if(this.selected_enroll.length!=0){
                selected_list = selected_list.filter( (program) => {
                    for (c of this.selected_enroll) {
                        if(c.localeCompare(program.ENROL_METHOD)==0) return true;
                    }
                    return false;
                } );
            }
            //select by target
            if(this.selected_target.length!=0){
                selected_list = selected_list.filter( (program) => {
                    for (c of this.selected_target) {
                        if(c.localeCompare(program.MIS_TARGET_GRP_Code)==0) return true;
                    }
                    return false;
                } );
            }
            //select by keyword
            if(this.keywords.length!=0){
                selected_list = selected_list.filter( (program) => {
                    for (c of this.keywords) {
                        for (const property in program){
                            if( (typeof program[property]) === 'string' && (program[property].includes(c)) ) return true;
                        }
                    }
                    return false;
                } );
            }
            //select Age
            if(this.selected_age!=null && this.selected_age >=0){
                selected_list = selected_list.filter( (program) => {
                    return Number(program.MIN_AGE)<=this.selected_age && this.selected_age<=Number(program.MAX_AGE);
                } );
            }
            //console.log(selected_list);
            self.$store.dispatch("set_filtered_program_list", selected_list);
        },
        lower_case_compare: function(item, queryText, itemText){
            return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
        },
    },
}
</script>

<style lang="css" scoped>
</style>
