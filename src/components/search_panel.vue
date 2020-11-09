<template lang="html">
    <v-container>
        <v-form>
            <v-text-field
                label="Solo"
                placeholder="Search"
                prepend-inner-icon="mdi-text-search"
                append-icon="mdi-menu-down"
                solo
                clearable
                hide-details="auto"
                @click:append="expanded =! expanded">
            </v-text-field>
            <v-expand-transition>
                <v-card v-if="(expanded || this.$vuetify.breakpoint.mdAndUp)">
                    <v-card-text>
                        <v-row>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select label="Type" dense multiple chips outlined hide-details="auto"></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select label="District" dense multiple chips outlined hide-details="auto"></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select label="Venue" dense multiple chips outlined hide-details="auto"></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select label="Enroll" dense multiple chips outlined hide-details="auto"></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-select label="Target" dense multiple chips outlined hide-details="auto"></v-select>
                            </v-col>
                            <v-col cols='6' sm='4' md='12' lg='12' xl='12'>
                                <v-text-field label="Age" dense outlined hide-details="auto" type="integer"></v-text-field>
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
    data: () => ({
        expanded: false,
    }),
    mounted(){
    },
}
</script>

<style lang="css" scoped>
</style>
