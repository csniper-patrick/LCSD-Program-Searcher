<template lang="html">
    <v-sheet color="white" max-height="100vh" class="overflow-y-auto overflow-x-hidden">
        <v-container>
            <v-row>
                <v-col v-for="item in search_result" :key="item.PGM_CODE" cols='12' sm='6' md='6' lg='4' xl='3'>
                    <program_card :program="item"/>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
import program_card from './program_card.vue';

export default {
    name: "result_panel",
    
    props: ['search_result'],
    components: {
        program_card,
    },
}
</script>

<style lang="css" scoped>
</style>
