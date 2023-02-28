<template>
  <div class="game-container" @click="navToMatch">
    <div :style="`color: ${gameTimeColor}`" class="game-time">
      {{ gameTime }}
    </div>
    <div class="game-teams">
      <div class="game-hometeam team-gap">
        <ImageMapper :team="game.homeTeam" />
        <span>
          {{ game.homeTeam }}
        </span>
        <span class="score">
          {{ game.homeScore }}
        </span>
      </div>
      <div class="game-hometeam">
        <ImageMapper :team="game.awayTeam" />
        <span>
          {{ game.awayTeam }}
        </span>
        <span class="score">
          {{ game.awayScore }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageMapper from "../atom/ImageMapper.vue";
import { getGameTime } from "../../logic/date";
import { MATCH_ROUTE } from "../../logic/constants/routes";

export default {
  name: "Game",
  props: {
    game: Object,
    round: Object,
  },
  components: { ImageMapper },
  computed: {
    gameTime() {
      if (this.game.score === "UITGESTELD") {
        return "PP";
      }
      return getGameTime(this.game.date, this.game.time);
    },
    gameTimeColor() {
      if (this.game.score === "UITGESTELD") {
        return "orange";
      }
      if (this.gameTime.includes("'") || this.gameTime.includes("HT")) {
        return "#ff6b00";
      }
      return "grey";
    },
  },
  methods: {
    navToMatch() {
      this.$router.push({
        name: MATCH_ROUTE,
        params: this.game,
      });
    },
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: -apple-system, Roboto, Arial, sans-serif;
  background-color: white;
  border-radius: 7.5px;
  letter-spacing: 0.41px;
  font-weight: 700;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 0.5px solid #dff9fb; */
}
.game-container:hover {
  cursor: pointer;
  background-color: #dff9fb;
}
.game-time {
  font-family: "Poppins", sans-serif;
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.game-teams {
  flex: 5;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
}
.score {
  flex: 1;
  text-align: right;
  font-size: 14px;
  margin-right: 20px;
}
.game-hometeam {
  display: flex;
  align-items: center;
}
.team-gap {
  margin-bottom: 3px;
}
</style>
