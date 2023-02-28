<template>
  <div>
    <Header :title="title" />
    <div v-if="!isFullScheduleShown">
      <DateContainer @toggle="toggleSchedule" />
      <Round v-if="selectedRound" :round="selectedRound" />
    </div>
    <div v-if="isFullScheduleShown">
      <div class="select-container">
        <Select
          selectName="teams"
          selectId="teams"
          selectLabel="Filter op een team"
          :teams="leagueTeamsList"
          @selectNewTeam="filterSchedule"
        />
        <div style="flex: 1">
          <IconWithHover
            @iconClick="toggleSchedule"
            icon="bx:x"
            style="float: right"
            color="black"
            width="30"
            height="30"
          />
        </div>
      </div>
      <Schedule :schedule="rounds" ref="schedule" />
    </div>
    <Ranking />
    <OrientationInfo />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import LeagueController from "../api/calls/league";
import Schedule from "../components/templates/Schedule.vue";
import Header from "../components/atom/Header.vue";
import Select from "../components/atom/Select.vue";
import Round from "../components/templates/Round.vue";
import DateContainer from "../components/organism/DateContainer.vue";
import { mapState, mapActions } from "pinia";
import { useScoresStore } from "../store/scores";
import { findClosestDateIndex } from "../logic/date";
import Ranking from "../components/templates/Ranking.vue";
import { getLastVisitedFromCache, getDatesFromCache } from "../logic/cache.js";
import OrientationInfo from "../components/molecule/OrientationInfo.vue";
import IconWithHover from "../components/atom/IconWithHover.vue";
import { convertToDateList } from "../logic/date";

export default {
  name: "League",
  components: {
    Schedule,
    Header,
    Select,
    Icon,
    DateContainer,
    Round,
    Ranking,
    OrientationInfo,
    IconWithHover,
  },
  data() {
    return {
      rounds: [],
      ranking: [],
      title: "",
      league: null,
      isFullScheduleShown: false,
      teams: null,
    };
  },
  computed: {
    ...mapState(useScoresStore, {
      scheduleIndex: "scheduleIndex",
      dates: "dates",
    }),
    selectedRound() {
      if (this.rounds.length === 0) return null;
      return this.rounds[this.scheduleIndex];
    },
    leagueTeamsList() {
      if (this.teams) {
        return this.teams;
      }
      return [];
    },
  },
  created() {
    this.title = getLastVisitedFromCache(this.$route.params.obj);
  },
  mounted() {
    LeagueController.get(this, { league: this.title }, (res) => {
      const temp = res[0].data;
      temp.sort((a, b) => new Date(a.date) - new Date(b.date));
      const tempDates = convertToDateList(temp.map((e) => e.date));
      this.setDates(tempDates);
      const index = findClosestDateIndex(tempDates);
      this.setScheduleIndex(index);
      this.rounds = temp;
      this.ranking = res[1].data.ranking;
      this.teams = this.ranking.map((e) => e.team.replace("\n", "").trim());
      this.setRanking(res[1].data.ranking);
    });
  },
  methods: {
    ...mapActions(useScoresStore, [
      "setScheduleIndex",
      "setRanking",
      "setDates",
    ]),
    filterSchedule(selectedTeam) {
      this.$refs.schedule.refresh(selectedTeam);
    },
    toggleSchedule() {
      this.isFullScheduleShown = !this.isFullScheduleShown;
    },
  },
};
</script>

<style scoped>
.select-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 0.1px solid #dff9fb;
  border-bottom: 0.1px solid #dff9fb;
}
</style>
