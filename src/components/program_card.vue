<template lang="html">
    <v-card elevation="3" :color="card_disabled ? 'grey lighten-1' : ''">
        <v-card-title>
            <strong>{{ program_name }} - {{ program.PGM_CODE }}</strong>
        </v-card-title>
        <v-card-subtitle class="py-0">
            <b>{{ program_type }}</b>
        </v-card-subtitle>
        <v-card-text class="py-0">
            <ul>
                <li>{{ age_tag }}: {{ program.MIN_AGE }} - {{ program.MAX_AGE }}</li>
                <li><v-icon small>mdi-map-marker-outline</v-icon>:{{ program_district }} - {{ program_venue }}</li>
                <li>
                    <v-icon small>mdi-lead-pencil</v-icon>: {{ program_enroll_start_date }} -
                    {{ program_enroll_end_date }}
                </li>
                <li><v-icon small>mdi-calendar-month</v-icon>: {{ program_start_date }} - {{ program_end_date }}</li>
                <li><v-icon small>mdi-calendar-week</v-icon>: {{ program_day }}</li>
                <li>
                    <v-icon small>mdi-clock-outline</v-icon>: {{ program.PGM_START_TIME }} - {{ program.PGM_END_TIME
                    }}<v-icon small>mdi-hours-24</v-icon>
                </li>
            </ul>
        </v-card-text>
        <v-card-actions class="pa-1 ma-0">
            <v-spacer />
            <v-btn
                fab
                rounded
                small
                outlined
                :disabled="card_disabled"
                class="mx-1"
                :href="program_map_link"
                target="_blank"
                color="primary"
            >
                <v-icon large>mdi-map-marker-radius-outline</v-icon>
            </v-btn>
            <v-btn
                fab
                rounded
                small
                outlined
                :disabled="card_disabled"
                class="mx-1"
                :href="program_link"
                target="_blank"
                color="primary"
            >
                <v-icon large>mdi-information-outline</v-icon>
            </v-btn>
            <program_calendar v-bind:calendar_events="program_calendar_events" />
            <v-btn
                fab
                rounded
                small
                outlined
                v-model="bookmarked"
                @click="bookmark_switch()"
                class="mx-1"
                :color="bookmarked ? 'purple' : 'primary'"
            >
                <v-icon large>{{ bookmark_icon }}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import program_calendar from "./program_calendar.vue";
export default {
    name: "program_card",
    props: ["program"],
    data: () => ({}),
    components: {
        program_calendar,
    },
    computed: {
        lang_zh: function () {
            return this.$store.state.lang_zh;
        },
        age_tag: function () {
            return this.lang_zh ? "年齡" : "AGE";
        },
        bookmarked: function () {
            return this.$store.state.bookmarks.some((program) => program.PGM_CODE == this.program.PGM_CODE);
        },
        bookmark_icon: function () {
            return this.bookmarked ? "mdi-bookmark-check-outline" : "mdi-bookmark-outline";
        },
        program_name: function () {
            return this.lang_zh ? this.program.TC_PGM_NAME : this.program.EN_PGM_NAME;
        },
        program_district: function () {
            return this.lang_zh ? this.program.TC_DISTRICT : this.program.EN_DISTRICT;
        },
        program_venue: function () {
            return this.lang_zh ? this.program.TC_VENUE : this.program.EN_VENUE;
        },
        program_type: function () {
            return this.lang_zh ? this.program.TC_ACT_TYPE_NAME : this.program.EN_ACT_TYPE_NAME;
        },
        program_start_date: function () {
            return this.program.PGM_START_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_end_date: function () {
            return this.program.PGM_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_enroll_start_date: function () {
            return this.program.ENROL_START_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_enroll_end_date: function () {
            return this.program.ENROL_END_DATE.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g).toString();
        },
        program_day: function () {
            return this.lang_zh ? this.program.TC_DAY : this.program.EN_DAY;
        },
        program_link: function () {
            return this.lang_zh ? this.program.TC_URL : this.program.EN_URL;
        },
        program_map_link: function () {
            return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(this.program_venue);
        },
        program_excluded_dates: function () {
            var tmp = this.program.TC_DAY.match(/[0-9]+\/[0-9]+/g);
            return tmp == null
                ? []
                : tmp.map((date) => {
                      return { m: Number(date.split("/")[1]), d: Number(date.split("/")[0]) };
                  });
        },
        program_calendar_events: function () {
            return {
                date: {
                    start: new Date(`${this.program_start_date}T00:00:00+08:00`),
                    end: new Date(`${this.program_end_date}T00:00:00+08:00`),
                },
                day_of_week: this.program.day_of_week,
                time: {
                    start: {
                        h: Number(this.program.PGM_START_TIME.split(":")[0]),
                        m: Number(this.program.PGM_START_TIME.split(":")[1]),
                    },
                    end: {
                        h: Number(this.program.PGM_END_TIME.split(":")[0]),
                        m: Number(this.program.PGM_END_TIME.split(":")[1]),
                    },
                    str: this.program.PGM_START_TIME + "-" + this.program.PGM_END_TIME,
                },
                excluded_date: this.program_excluded_dates,
                venue: this.program_venue,
                code: this.program.PGM_CODE,
                name: this.program_name,
                url: this.program_link,
            };
        },
        card_disabled: function () {
            return !this.$store.state.raw_program_list.some((raw) => raw.PGM_CODE == this.program.PGM_CODE);
        },
    },
    methods: {
        bookmark_switch: function () {
            if (this.bookmarked) {
                this.$store.commit("remove_bookmark", this.program.PGM_CODE);
            } else {
                this.$store.commit("add_bookmark", this.program.PGM_CODE);
            }
        },
    },
};
</script>

<style lang="css" scoped></style>
