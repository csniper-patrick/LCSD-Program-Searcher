<template lang="html">
    <v-container>
        <v-form>
            <v-text-field
                v-model="query"
                label="Solo"
                placeholder="Search"
                prepend-inner-icon="mdi-translate"
                append-icon="mdi-menu-down"
                solo
                clearable
                hide-details="auto"
                @click:append="expanded =! expanded"
                @click:prepend-inner="use_zh =! use_zh">
            </v-text-field>
            <v-expand-transition>
                <v-card v-if="(expanded || this.$vuetify.breakpoint.mdAndUp)">
                    <v-card-text>
                        <v-row>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select 
                                    v-model="selected_type" 
                                    :items="unique_type"
                                    item-text="value"
                                    item-value="key"
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
                                    item-text="value"
                                    item-value="key"
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
                                item-text="value"
                                item-value="key"
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
                                item-text="value"
                                item-value="key"
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
                                item-text="value"
                                item-value="key"
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
        use_zh: true,
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
        raw_program_list: function(){
            return this.$store.state.raw_program_list;
        },
        keywords: function(){
            return (this.query !== null)? this.query.split(" "):[];
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
                if (c.localeCompare("D")==0) {
                    return { key: c, value: (T.use_zh)?"網上康體通(先到先得)":"Internet (first come first served)"};
                }
                if (c.localeCompare("B")==0) {
                    return { key: c, value: (T.use_zh)?"抽籤":"Ballot"};
                }
                if (c.localeCompare("S")==0) {
                    return { key: c, value: (T.use_zh)?"先到先得":"First-come-first-served"};
                }
                if (c.localeCompare("M")==0) {
                    return { key: c, value: (T.use_zh)?"本區辦事處/區內指定場地(先到先得)":"Organizing District Office/Designated Venues(First come first served)"};
                }
                if (c.localeCompare("W")==0) {
                    return { key: c, value: (T.use_zh)?"即場報名":"Walk-in"};
                }
            } );
        },
        unique_target: function(){
            var T=this;
            var code = this.raw_program_list.map( function (program) { return program.MIS_TARGET_GRP_Code; } ).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            return code.map( function(c){
                if (c.localeCompare("GENERAL 3")==0) {
                    return { key: c, value: (T.use_zh)?"任何對象":"Any Person"};
                }
                if (c.localeCompare("OLDER PERSONS 3")==0) {
                    return { key: c, value: (T.use_zh)?"長者":"Elderly"};
                }
                if (c.localeCompare("DISABILITIES 10")==0) {
                    return { key: c, value: (T.use_zh)?"殘疾人士 ":"Persons with Disabilities"};
                }
                if (c.localeCompare("DISABILITIES_all")==0) {
                    return { key: c, value: (T.use_zh)?"全部殘疾人士":"All programmes for Persons with Disabilities"};
                }
                if (c.localeCompare("DISABILITIES 2")==0) {
                    return { key: c, value: (T.use_zh)?"視障人士":"Persons with Visual Impairment"};
                }
                if (c.localeCompare("DISABILITIES 4")==0) {
                    return { key: c, value: (T.use_zh)?"聽障人士":"Persons withHearing Impairment"};
                }
                if (c.localeCompare("DISABILITIES 6")==0) {
                    return { key: c, value: (T.use_zh)?"智障人士":"Persons with Intellectual Disability"};
                }
                if (c.localeCompare("DISABILITIES 9")==0) {
                    return { key: c, value: (T.use_zh)?"自閉症人士":"Persons with Autism"};
                }
                if (c.localeCompare("DISABILITIES 3")==0) {
                    return { key: c, value: (T.use_zh)?" 器官殘障人士/長期病患者":"Persons with Visceral Disability / Chronic Illness"};
                }
                if (c.localeCompare("DISABILITIES 7")==0) {
                    return { key: c, value: (T.use_zh)?"肢體傷殘人士":"Persons with Physical Disability"};
                }
                if (c.localeCompare("DISABILITIES 5")==0) {
                    return { key: c, value: (T.use_zh)?"精神病康復者":"Ex-mentally Ill Persons"};
                }
            } );
        },
    },
    watch: {
        use_zh: function(val){
            this.$store.commit('switch_lang', val);
        },
    },
}
</script>

<style lang="css" scoped>
</style>
