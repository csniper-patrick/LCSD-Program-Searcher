<template lang="html">
    <v-dialog v-model="dialog" :width="$vuetify.breakpoint.smAndDown ? '80vw' : '30vw'">
        <template v-slot:activator="{ on }">
            <v-btn fab rounded small outlined class="mx-1" color="primary" v-on="on">
                <v-icon large>mdi-calendar-outline</v-icon>
            </v-btn>
        </template>
        <v-lazy
            :options="{
                threshold: 0.5,
            }"
            min-height="50"
            transition="fade-transition"
        >
            <v-card height="100%">
                <v-card-title>
                    <v-icon large>mdi-calendar-outline</v-icon>
                    <b>{{ calendar_events.name }}({{ calendar_events.code }})</b>
                </v-card-title>
                <v-date-picker readonly :events="this.calendar_day" width="100%" />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="generate_ics()"> Download Calendar </v-btn>
                    <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
                </v-card-actions>
            </v-card>
        </v-lazy>
    </v-dialog>
</template>

<script>
const tz_offset = -28800000;

export default {
    name: "program_calendar",
    props: ["calendar_events"],
    data: () => ({
        dialog: false,
        event_dates: [],
    }),
    computed: {
        calendar_day: function () {
            return this.event_dates.map((date) => {
                return date.str;
            });
        },
    },
    watch: {
        dialog: async function (val) {
            if (val == true) {
                this.event_dates = this.generate_event_dates();
                console.log(this.event_dates);
            }
        },
    },
    mounted: function () {},
    methods: {
        generate_ics: async function () {
            const ics = require("ics");
            const event_list = this.event_dates.map((cal_event) => {
                return {
                    start: [
                        cal_event.start.getFullYear(),
                        cal_event.start.getMonth() + 1,
                        cal_event.start.getDate(),
                        cal_event.start.getHours(),
                        cal_event.start.getSeconds(),
                    ],
                    end: [
                        cal_event.end.getFullYear(),
                        cal_event.end.getMonth() + 1,
                        cal_event.end.getDate(),
                        cal_event.end.getHours(),
                        cal_event.end.getSeconds(),
                    ],
                    title: this.calendar_events.name,
                    description:
                        "name: " +
                        this.calendar_events.name +
                        "\ncode: " +
                        this.calendar_events.code +
                        "\nlink: " +
                        this.calendar_events.url,
                    url: this.calendar_events.url,
                    location: this.calendar_events.venue,
                };
            });
            var { error, value } = ics.createEvents(event_list);
            if (error) {
                console.log(error);
                return;
            }
            //Create ics file and download
            var element = document.createElement("a");
            element.setAttribute("href", "data:ics/plain;charset=utf-8," + encodeURIComponent(value));
            element.setAttribute("download", this.calendar_events.name + "-" + this.calendar_events.code + ".ics");
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            return;
        },
        generate_event_dates: function () {
            var tmp = [];

            for (
                let i = new Date(this.calendar_events.date.start);
                i < this.calendar_events.date.end;
                i.setDate(i.getDate() + 1)
            ) {
                tmp.push(new Date(i));
            }

            return tmp
                .filter((date) => {
                    let tmp_date = new Date(date - tz_offset);
                    return (
                        this.calendar_events.day_of_week.includes(tmp_date.getUTCDay()) &&
                        !this.calendar_events.excluded_date.some((excluded) => {
                            return tmp_date.getUTCMonth() + 1 == excluded.m && tmp_date.getUTCDate() == excluded.d;
                        })
                    );
                })
                .map((date) => {
                    let tmp_date = new Date(date - tz_offset);

                    let start = new Date(tmp_date);
                    start.setUTCHours(this.calendar_events.time.start.h);
                    start.setUTCMinutes(this.calendar_events.time.start.m);
                    let end = new Date(tmp_date);
                    end.setUTCHours(this.calendar_events.time.end.h);
                    end.setUTCMinutes(this.calendar_events.time.end.m);
                    let date_str = date.toISOString().split("T")[0];
                    return { start: new Date(start - -tz_offset), end: new Date(end - -tz_offset), str: date_str };
                });
        },
    },
};
</script>

<style lang="css" scoped></style>
