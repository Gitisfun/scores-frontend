<template>
  <div>
    <div class="round-container">
      <div id="games-container">
        <Game v-for="game in round.games" :game="game" :key="game.homeTeam" />
      </div>
    </div>
  </div>
</template>

<script>
import Game from "../molecule/Game.vue";

export default {
  name: "Schedule",
  props: {
    round: Object,
  },
  components: {
    Game,
  },
};
</script>

<style scoped>
.round-container {
  margin-bottom: 15px;
}

#games-container {
  margin-top: 10px;
}
</style>
