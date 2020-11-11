<template lang="html">
    <v-card elevation="5">
        <v-card-title><strong>{{ program_name }}</strong></v-card-title>
        <v-card-subtitle>{{ program_district }} - {{ program_venue }}</v-card-subtitle>
        <v-card-text>
            <ul>
                <li>Code: {{ program.PGM_CODE }} Type: {{ program_type }}</li>
                <li>Age: {{ program.MIN_AGE }} - {{ program.MAX_AGE }}
                <li>Enroll: {{ program_enroll_start_date }} - {{ program_enroll_end_date }}</li>
                <li>Date: {{ program_start_date }} - {{ program_end_date }}</li>
                <li>Time: {{ program.PGM_START_TIME}} - {{ program.PGM_END_TIME }} {{ program.EN_DAY }}</li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "program_card",
    props: ["program"],
    computed: {
        lang_zh: function(){
            return this.$store.state.lang_zh;
        },
        program_name: function (){
            return (this.lang_zh)?this.program.TC_PGM_NAME:this.program.EN_PGM_NAME;
        },
        program_district: function (){
            return (this.lang_zh)?this.program.TC_DISTRICT:this.program.EN_DISTRICT;
        },
        program_venue: function (){
            return (this.lang_zh)?this.program.TC_VENUE:this.program.EN_VENUE;
        },
        program_type: function (){
            return (this.lang_zh)?this.program.TC_ACT_TYPE_NAME:this.program.EN_ACT_TYPE_NAME;
        },
        program_start_date: function (){
            return this.program.PGM_START_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_end_date: function (){
            return this.program.PGM_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_enroll_start_date: function (){
            return this.program.ENROL_START_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_enroll_end_date: function (){
            return this.program.ENROL_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
    },
}
</script>

<style lang="css" scoped>
</style>
