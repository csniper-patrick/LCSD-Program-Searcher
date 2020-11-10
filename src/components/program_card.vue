<template lang="html">
    <v-card elevation="5">
        <v-card-title>{{ program_name }}</v-card-title>
        <v-card-subtitle>{{ program_district }} - {{ program_venue }}</v-card-subtitle>
        <v-card-text>
            <ul>
                <li>Code: {{ program.PGM_CODE }} Type: {{ program_type }}</li>
                <li>Age: {{ program.MIN_AGE }} - {{ program.MAX_AGE }}
                <li>Date: <br>{{ program.PGM_START_DATE }} - {{ program.PGM_END_DATE }}</li>
                <li>Time: <br>{{ program.PGM_START_TIME}} - {{ program.PGM_END_TIME }} {{ program.EN_DAY }}</li>
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
    },
}
</script>

<style lang="css" scoped>
</style>
