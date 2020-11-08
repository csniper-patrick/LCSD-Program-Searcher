<template lang="html">
    <v-container>
        <v-form>
            <v-text-field
                label="Solo"
                placeholder="Search"
                prepend-inner-icon="mdi-text-search"
                append-icon="mdi-menu-down"
                solo
                clearable>
            </v-text-field>
            <v-card>
                <v-card-title>Search Panel</v-card-title>
                <v-card-text>Search options</v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "search_panel",
}
</script>

<style lang="css" scoped>
</style>
