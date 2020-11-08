<template lang="html">
    <v-card>
        <v-card-title>{{ program.TC_PGM_NAME }}</v-card-title>
        <v-card-subtitle>{{ program.TC_DISTRICT }} - {{ program.TC_VENUE }}</v-card-subtitle>
        <v-card-text>
            <ul>
                <li>Code: {{ program.PGM_CODE }}</li>
                <li>Type: {{ program.TC_ACT_TYPE_NAME }}</li>
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
}
</script>

<style lang="css" scoped>
</style>
