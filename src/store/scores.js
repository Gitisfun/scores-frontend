import { defineStore } from "pinia";
import { convertToDateList } from "../logic/date.js";
import { getFavoritesFromSchedule } from "../logic/util.js";

export const useScoresStore = defineStore("scores", {
  state: () => ({
    scheduleIndex: null,
    schedule: [],
    // currentRound: {},
    dates: [],
    // isFullScheduleShown: false,
    ranking: [],
    kit: null,
    matchTeams: null,
    favorites: [],
    lastFiveGames: [],
  }),
  getters: {
    getScheduleIndex: (state) => state.scheduleIndex,
    getSchedule: (state) => state.schedule,
    // getCurrentRound: (state) => state.currentRound,
    getDates: (state) => state.dates,
    // getIsFullScheduleShown: (state) => state.isFullScheduleShown,
    getRanking: (state) => state.ranking,
    getKit: (state) => state.kit,
    getMatchTeams: (state) => state.matchTeams,
    getFavorites: (state) => state.favorites,
    getLastFiveGames: (state) => state.lastFiveGames,
  },
  actions: {
    setSchedule(list) {
      this.schedule = list;
    },
    setCurrentRound(round) {
      this.currentRound = round;
    },
    setScheduleIndex(index) {
      this.scheduleIndex = index;
    },
    setDates(dates) {
      this.dates = convertToDateList(dates);
    },
    // setIsFullScheduleShown(temp) {
    //   this.isFullScheduleShown = temp;
    // },
    setRanking(ranking) {
      this.ranking = ranking;
    },

    setKit(kit) {
      this.kit = kit;
    },

    setMatchTeams(teams) {
      this.matchTeams = teams;
    },

    setFavorites(teams) {
      this.favorites = getFavoritesFromSchedule(teams);
    },

    setLastFiveGames(games) {
      this.lastFiveGames = games;
    },
  },
});
