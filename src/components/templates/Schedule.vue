<template>
  <div>
    <div class="round-container" v-for="round in teamList" :key="round.date">
      <!-- <div class="date-container">
        {{ formatSubtitle(round.date) }}
      </div> -->
      <DateHeader :title="formatSubtitle(round.date)" />
      <div id="games-container">
        <Game
          v-for="game in round.games"
          :round="round"
          :game="game"
          :key="game.homeTeam"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Game from "../molecule/Game.vue";
import { filterListByTeam } from "../../logic/util.js";
import { convertToEnglishDate } from "../../logic/date";
import DateHeader from "../atom/DateHeader.vue";

export default {
  name: "Schedule",
  props: {
    schedule: Array,
  },
  components: {
    Game,
    DateHeader,
  },
  data() {
    return {
      selectedTeam: null,
    };
  },
  computed: {
    teamList() {
      if (this.selectedTeam != null && this.selectedTeam.includes("Alle teams"))
        return this.schedule;
      if (this.selectedTeam) {
        return filterListByTeam(this.schedule, this.selectedTeam);
      }
      return this.schedule;
    },
  },
  methods: {
    formatSubtitle(text) {
      return convertToEnglishDate(text);
    },
    refresh(team) {
      this.selectedTeam = team;
    },
  },
};
</script>

<style scoped>
.round-container {
  margin-bottom: 0px;
}

.date-container {
  /* border: 1px solid #222; */
  /* border-radius: 5px; */
  /* border: 1px solid grey;
    border-radius: 5px;
    background-color: grey; */
  padding: 10px;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
}

/* Smarthphones, 899 and lower */
@media (max-width: 899px) {
  .date-container {
    margin-bottom: 5px;
    font-size: 14px;
    color: white;
    color: black;
    /* font-weight: 800; */
  }
}
/* Small devices (tablets, 768px and up) */
@media (min-width: 900px) {
  .date-container {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
