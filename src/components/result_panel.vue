<template lang="html">
    <v-container>
        <v-row>
            <v-col v-for="item in search_result" :key="item" cols='12' sm='12' md='6' lg='6' xl='4'>
                <program_card
                    :program="item"
                    cols='12' sm='12' md='6' lg='6' xl='4'/>
            </v-col>
        </v-row>
    </v-container>
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
