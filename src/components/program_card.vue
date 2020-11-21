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
                <li>Day:  {{ program_day }}</li>
                <li>Time: {{ program.PGM_START_TIME}} - {{ program.PGM_END_TIME }}</li>
            </ul>
            <v-spacer class="d-flex justify-end">
                <v-btn fab rounded small outlined
                    class="mx-1"
                    :href="program_map_link"
                    target="_blank"
                    color="primary">
                    <v-icon large>mdi-map-marker-radius-outline</v-icon>
                </v-btn>
                <v-btn fab rounded small outlined
                    class="mx-1"
                    :href="program_link"
                    target="_blank"
                    color="primary">
                    <v-icon large>mdi-information-outline</v-icon>
                </v-btn>
                <program_calendar v-bind:calendar_events="program_calendar_events"/>
                <v-btn fab rounded small outlined
                    v-model="bookmarked"
                    @click="bookmark_switch()"
                    class="mx-1"
                    :color="(bookmarked)?'purple':'primary'">
                    <v-icon large>{{ bookmark_icon }}</v-icon>
                </v-btn>
            </v-spacer>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "program_card",
    props: ["program"],
    data: () => ({
    }),
    components: {
        program_calendar: () => import('./program_calendar.vue'),
    },
    computed: {
        lang_zh: function(){
            return this.$store.state.lang_zh;
        },
        bookmarked: function(){
            return this.$store.state.bookmarks.includes(this.program.PGM_CODE);
        },
        bookmark_icon: function(){
            return (this.bookmarked)?'mdi-bookmark-check-outline':'mdi-bookmark-outline';
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
        program_day: function(){
            return (this.lang_zh)?this.program.TC_DAY:this.program.EN_DAY;
        },
        program_link: function(){
            return (this.lang_zh)?this.program.TC_URL:this.program.EN_URL;
        },
        program_map_link: function(){
            return 'https://www.google.com/maps/search/?api=1&query='+ encodeURIComponent(this.program_venue)
        },
        program_excluded_dates: function(){
            var tmp=this.program.TC_DAY.match(/[0-9]+\/[0-9]+/g);
            return (tmp==null)? []:tmp.map( (date) => {
                return {m: Number(date.split("/")[1]), d: Number(date.split("/")[0])}
            } );
        },
        program_calendar_events: function(){
            return {
                date: {
                    start: new Date(this.program_start_date),
                    end: new Date(this.program_end_date)
                },
                day_of_week: this.program.day_of_week,
                time: {
                    start: {
                        h: Number(this.program.PGM_START_TIME.split(":")[0]),
                        m: Number(this.program.PGM_START_TIME.split(":")[1])
                    },
                    end: {
                        h: Number(this.program.PGM_END_TIME.split(":")[0]),
                        m: Number(this.program.PGM_END_TIME.split(":")[1])
                    },
                    str: this.program.PGM_START_TIME + '-' + this.program.PGM_END_TIME,
                },
                excluded_date: this.program_excluded_dates,
                venue: this.program_venue,
                code: this.program.PGM_CODE,
                name: this.program_name,
                url: this.program_link,
            }
        }
    },
    methods: {
        bookmark_switch: function() {
            if (this.bookmarked) {
                this.$store.commit('remove_bookmark', this.program.PGM_CODE);
            } else {
                this.$store.commit('add_bookmark', this.program.PGM_CODE);
            }
        }
    }
}
</script>

<style lang="css" scoped>
</style>
