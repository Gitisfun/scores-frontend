<template>
  <div class="date-container">
    <Icon
      class="date-container-icon"
      icon="bx:calendar"
      color="black"
      width="25"
      height="25"
    />
    <div v-if="scheduleIndex == 0" style="flex: 1"></div>
    <DateItem
      v-if="scheduleIndex !== 0"
      @changeRound="previousRound"
      :week="previousDate.week"
      :day="previousDate.day"
      :isCurrentWeek="false"
    />
    <DateItem
      :week="currentDate.week"
      :day="currentDate.day"
      :isCurrentWeek="true"
    />
    <DateItem
      v-if="scheduleIndex != dates.length - 1"
      @changeRound="nextRound"
      :week="nextDate.week"
      :day="nextDate.day"
      :isCurrentWeek="false"
    />
    <div v-if="scheduleIndex == dates.length - 1" style="flex: 1"></div>
    <div v-if="!isOnHomeRoute()" class="date-container-button">
      <ToggleScheduleButton @toggle="toggleSchedule" />
    </div>
    <div v-else style="flex: 1"></div>
  </div>
</template>

<script>
import DateItem from "../atom/DateItem.vue";
import ToggleScheduleButton from "../atom/ToggleScheduleButton.vue";
import { Icon } from "@iconify/vue";
import { mapState, mapActions } from "pinia";
import { useScoresStore } from "../../store/scores";
import { formatDay } from "../../logic/date";
import { isOnRoute } from "../../logic/util.js";
import HomeController from "../../api/calls/home";
import { formatDateToString } from "../../logic/date.js";
import { HOME_ROUTE } from "../../logic/constants/routes";

export default {
  name: "DateContainer",
  components: {
    DateItem,
    Icon,
    ToggleScheduleButton,
  },
  props: {
    date: String,
  },
  computed: {
    ...mapState(useScoresStore, {
      schedule: "schedule",
      scheduleIndex: "scheduleIndex",
      dates: "dates",
    }),
    previousDate() {
      return {
        week: `Week ${this.scheduleIndex}`,
        day: formatDay(this.dates[this.scheduleIndex - 1]),
      };
    },
    currentDate() {
      return {
        week: `Week ${this.scheduleIndex + 1}`,
        day: formatDay(this.dates[this.scheduleIndex]),
      };
    },
    nextDate() {
      return {
        week: `Week ${this.scheduleIndex + 2}`,
        day: formatDay(this.dates[this.scheduleIndex + 1]),
      };
    },
  },
  methods: {
    ...mapActions(useScoresStore, [
      "setScheduleIndex",
      "setSchedule",
      "setFavorites",
    ]),
    isOnHomeRoute() {
      return isOnRoute(this, HOME_ROUTE);
    },
    previousRound() {
      const index = this.scheduleIndex - 1;

      if (index >= 0) {
        this.fetchRound(index);
      }
    },
    nextRound() {
      const index = this.scheduleIndex + 1;
      const max = this.dates.length;

      if (index < max) {
        this.fetchRound(index);
      }
    },
    fetchRound(index) {
      const date = formatDateToString(this.dates[index]);
      HomeController.getRound(this, { date: date }, (res) => {
        this.setSchedule(res.data.leagues);
        this.setFavorites(res.data.leagues);
        this.setScheduleIndex(index);
      });
    },
    toggleSchedule() {
      this.$emit("toggle");
    },
  },
};
</script>

<style scoped>
.date-container {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-top: 0.1px solid #dff9fb;
  border-bottom: 0.1px solid #dff9fb;
  /* border: 1px solid #222; */
  /* border: 1px solid #dff9fb; */
  /* background: #dff9fb;
  background: #c7ecee;
  background: blue;
  background: lightskyblue; */
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  margin-bottom: 15px;
}

.date-container-button {
  /* padding-left: 10px; */
  flex: 1;
}

.date-container-icon {
  flex: 1;
}

/* Smarthphones, 899 and lower */
@media (max-width: 899px) {
  .date-container {
    font-size: 14px;
    font-weight: bold;
  }
}
/* Small devices (tablets, 768px and up) */
@media (min-width: 900px) {
  .date-container {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
