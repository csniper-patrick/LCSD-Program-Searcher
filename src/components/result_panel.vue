<template lang="html">
    <v-sheet color="white" class="overflow-y-auto overflow-x-hidden">
        <v-container class="pa-3" fluid>
            <v-row>
                <v-col
                    class="pa-1 ma-0"
                    v-for="(item, index) in displayed_list"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="3"
                >
                    <v-lazy
                        :options="{
                            threshold: 0.1,
                        }"
                        min-height="250"
                        transition="fade-transition"
                    >
                        <program_card :program="item" />
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
        program_card: () => import("./program_card"),
    },
};
</script>

<style lang="css" scoped></style>
