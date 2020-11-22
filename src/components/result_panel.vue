<template lang="html">
    <v-sheet color="white" class="overflow-y-auto overflow-x-hidden">
        <v-container class="py-0" fluid>
            <v-row>
                <v-col v-for="(item, index) in displayed_list" :key="index" cols='12' sm='6' md='4' lg='3' xl='3'>
                    <v-lazy
                        :options="{
                            threshold: .5
                        }"
                        min-height="270"
                        transition="fade-transition">
                        <program_card :program="item"/>
                    </v-lazy>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>

export default {
    name: "result_panel",
    props: ["displayed_list"],
    components: {
        program_card: () => import('./program_card'),
    },
}
</script>

<style lang="css" scoped>
</style>
