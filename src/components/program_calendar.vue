<template>
    <v-dialog v-model="dialog" :width="$vuetify.breakpoint.smAndDown ? '100vw' : '50vw'">
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab rounded small outlined color="primary" class="mx-1" v-bind="attrs" v-on="on">
                <v-icon large>mdi-calendar-month-outline</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>{{ this.cal_events_spec.name }}</v-card-title>
            <v-card-subtitle class="pb-1">
                <v-icon small>mdi-map-marker-outline</v-icon>{{ this.cal_events_spec.venue }}
            </v-card-subtitle>
            <v-date-picker
                readonly
                no-title
                full-width
                :events="program_calendar_dates"
                show-adjacent-months
                multiple
                locale="en-gb"
            ></v-date-picker>
            <v-card-actions width="100%" class="pa-1 ma-0" align="end">
                <v-spacer></v-spacer>
                <v-btn outlined @click="generate_ics">download .ics</v-btn>
                <v-btn outlined @click="dialog = !dialog">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ical from "ical-generator";
export default {
    name: "program_calendar",
    props: {
        cal_events_spec: { type: Object, require: true },
    },
    data: () => ({
        dialog: false,
    }),
    computed: {
        program_week_days: function() {
            return [
                { str: "日", ical: "SU" },
                { str: "一", ical: "MO" },
                { str: "二", ical: "TU" },
                { str: "三", ical: "WE" },
                { str: "四", ical: "TH" },
                { str: "五", ical: "FR" },
                { str: "六", ical: "SA" },
            ]
                .filter(day => this.cal_events_spec.week_days.includes(day.str))
                .map(day => day.ical);
        },
        program_excluded_dates: function() {
            let dates = [];
            const [hour, minute] = this.cal_events_spec.start_time.split(":");
            for (
                let i = new Date(`${this.cal_events_spec.start_date}T00:00:00+0800`);
                i <= new Date(`${this.cal_events_spec.end_date}T00:00:00+0800`);
                i.setDate(i.getDate() + 1)
            ) {
                if (this.cal_events_spec.excluded_dates.some(({ m, d }) => m == i.getMonth() + 1 && d == i.getDate())) {
                    let tmp = new Date(i);
                    tmp.setHours(hour, minute);
                    dates.push(tmp);
                }
            }
            console.assert(
                dates.length == this.cal_events_spec.excluded_dates.length,
                `${this.cal_events_spec.name}: excluded_dates error`
            );
            return dates;
        },
        program_calendar_dates: function() {
            let week_day_val = this.program_week_days.map(day =>
                ["SU", "MO", "TU", "WE", "TH", "FR", "SA"].indexOf(day)
            );
            let dates = [];
            const [hour, minute] = this.cal_events_spec.start_time.split(":");
            for (
                let i = new Date(`${this.cal_events_spec.start_date}T00:00:00+0800`);
                i <= new Date(`${this.cal_events_spec.end_date}T00:00:00+0800`);
                i.setDate(i.getDate() + 1)
            ) {
                if (week_day_val.includes(i.getDay())) {
                    let tmp = new Date(i);
                    tmp.setHours(hour, minute);
                    dates.push(tmp);
                }
            }
            return dates
                .filter(
                    date =>
                        !this.program_excluded_dates.some(excluded_date => excluded_date.getTime() == date.getTime())
                )
                .map(date => new Date(date - date.getTimezoneOffset() * 60000).toISOString().substr(0, 10));
        },
    },
    methods: {
        generate_ics: function() {
            const cal = ical({
                name: this.cal_events_spec.name,
                timezone: "Asia/Hong_Kong",
                prodId: {
                    company: "csniper.gitlab.io",
                    product: "LCSD Program Searcher",
                },
            });
            cal.createEvent({
                summary: this.cal_events_spec.name,
                location: this.cal_events_spec.venue,
                start: new Date(`${this.cal_events_spec.start_date}T${this.cal_events_spec.start_time}:00+08:00`),
                end: new Date(`${this.cal_events_spec.start_date}T${this.cal_events_spec.end_time}:00+08:00`),
                repeating: {
                    freq: "DAILY",
                    byDay: this.program_week_days,
                    until: new Date(`${this.cal_events_spec.end_date}T${this.cal_events_spec.end_time}:00+08:00`),
                    exclude: this.program_excluded_dates,
                },
            });
            //Create ics file and download
            var element = document.createElement("a");
            element.setAttribute("href", "data:text/calendar;charset=utf-8," + encodeURIComponent(cal.toString()));
            element.setAttribute("download", this.cal_events_spec.name + ".ics");
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
    },
};
</script>

<style scoped></style>
