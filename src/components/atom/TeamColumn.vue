<template>
  <div class="column-team">
    <ImageMapper :team="formattedTeam" />
    <span :style="isTeamInMatchView">
      {{ team }}
    </span>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { MATCH_ROUTE } from "../../logic/constants/routes";
import { isOnRoute } from "../../logic/util";
import { useScoresStore } from "../../store/scores";
import ImageMapper from "./ImageMapper.vue";

export default {
  name: "TeamColumn",
  components: { ImageMapper },
  props: {
    team: String,
  },
  computed: {
    formattedTeam() {
      return this.team.trim();
    },
    ...mapState(useScoresStore, {
      teams: "matchTeams",
    }),
    isTeamInMatchView() {
      if (this.team && this.teams && this.teams.home && this.teams.away) {
        if (
          isOnRoute(this, MATCH_ROUTE) &&
          (this.team.trim() === this.teams.home.trim() ||
            this.team.trim() === this.teams.away.trim())
        ) {
          return "font-weight: bold; color: lightskyblue";
        }
      }
      return "color: black";
    },
  },
};
</script>

<style scoped>
.column-team {
  display: flex;
  align-items: center;
}
</style>
