<template>
  <Header title="KAVVV VB&OV Scores" />
  <DateContainer />
  <div v-if="schedule.length > 0 && !isLoading">
    <div>
      <FavoritesHeader />
      <NoFavoritesInfo />
      <Game v-for="game in favorites" :game="game" :key="game.id" />
    </div>
    <div v-for="league in schedule" :key="league.name">
      <LeagueHeader :title="league.name" :key="league.name" />
      <Game v-for="game in league.games" :game="game" :key="game.id" />
    </div>
  </div>
</template>

<script>
import Header from "../components/atom/Header.vue";
import DateContainer from "../components/organism/DateContainer.vue";
import LeagueHeader from "../components/atom/LeagueHeader.vue";
import Game from "../components/molecule/Game.vue";
import HomeController from "../api/calls/home.js";
import { mapState, mapActions } from "pinia";
import { useScoresStore } from "../store/scores";
import { convertToDateList, findClosestDateIndex } from "../logic/date";
import { getFavoritesFromCache, storeDatesInCache } from "../logic/cache";
import FavoritesHeader from "../components/atom/FavoritesHeader.vue";
import NoFavoritesInfo from "../components/atom/NoFavoritesInfo.vue";
import Divider from "../components/atom/Divider.vue";

export default {
  name: "Home",
  components: {
    Header,
    DateContainer,
    Game,
    LeagueHeader,
    FavoritesHeader,
    NoFavoritesInfo,
    Divider,
  },
  data() {
    return {
      isLoading: true,
      isFirstPageLoadPassed: false,
      favoritesList: [],
    };
  },
  created() {
    this.favoritesList = getFavoritesFromCache();
  },
  mounted() {
    HomeController.get(this, null, (res) => {
      this.isLoading = false;
      const dateList = convertToDateList(res[0].data);
      this.setDates(dateList);

      this.leagues = res[1].data.leagues;
      this.setSchedule(this.leagues);
      this.setFavorites(this.leagues);
      const list = convertToDateList(dateList);
      storeDatesInCache(list);
      this.setDates(list);

      const index = findClosestDateIndex(list);
      this.setScheduleIndex(index);
    });
  },
  computed: {
    ...mapState(useScoresStore, {
      schedule: "schedule",
      favorites: "favorites",
    }),
  },
  methods: {
    ...mapActions(useScoresStore, [
      "setSchedule",
      "setScheduleIndex",
      "setDates",
      "setFavorites",
    ]),
  },
};
</script>

<style scoped></style>
