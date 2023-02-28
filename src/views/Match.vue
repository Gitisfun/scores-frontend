<template>
  <div v-if="isLoading">
    <Header title="MATCH" />
    <MatchInfo :game="game" />
    <div v-if="isInfoLoadedSuccessfully">
      <KitContainer />
      <div class="match-lastfivegames-container">
        <LastFiveGames class="match-lastfivegames-item" />
        <LastFiveGames :isHomeTeam="false" class="match-lastfivegames-item" />
      </div>
      <Address :address="getAddress" />
      <ArtificialPitch :text="getArtificialPitch" />
      <Remark v-if="isRemarkVisible" :text="getRemark" />
    </div>
    <Ranking />
  </div>
</template>

<script>
import MatchController from "../api/calls/match";
import Header from "../components/atom/Header.vue";
import MatchInfo from "../components/molecule/MatchInfo.vue";
import Address from "../components/atom/Address.vue";
import Remark from "../components/atom/Remark.vue";
import ArtificialPitch from "../components/atom/ArtificialPitch.vue";
import Kit from "../components/atom/Kit.vue";
import KitContainer from "../components/molecule/KitContainer.vue";
import { getMatchFromCache } from "../logic/cache.js";
import { getLastFiveGames, isEmpty } from "../logic/util.js";
import Ranking from "../components/templates/Ranking.vue";
import { mapActions } from "pinia";
import { useScoresStore } from "../store/scores";
import LastFiveGames from "../components/molecule/LastFiveGames.vue";

export default {
  name: "Match",
  components: {
    Header,
    MatchInfo,
    Address,
    Remark,
    ArtificialPitch,
    Kit,
    KitContainer,
    Ranking,
    LastFiveGames,
  },
  data() {
    return {
      game: null,
      isLoading: false,
      info: null,
      isInfoLoadedSuccessfully: false,
    };
  },
  computed: {
    getAddress() {
      if (this.info) {
        return `${this.info.homeTeam.street}, ${this.info.homeTeam.county}`;
      }
      return "";
    },
    getRemark() {
      if (this.info) {
        return this.info.homeTeam.remark;
      }
      return "";
    },
    getArtificialPitch() {
      if (this.info) {
        return this.info.homeTeam.artificial;
      }
      return "";
    },
    isRemarkVisible() {
      if (this.info && this.info.homeTeam.remark.length > 0) {
        return true;
      }
      return false;
    },
  },
  created() {
    if (isEmpty(this.$route.params)) {
      this.game = getMatchFromCache(null);
    } else {
      this.game = getMatchFromCache(this.$route.params);
    }
  },
  mounted() {
    MatchController.get(
      this,
      {
        firstParam: { home: this.game.homeTeam, away: this.game.awayTeam },
        secondParam: { league: this.game.league },
      },
      (res) => {
        this.info = res[0].data;
        // this.$refs.lastFiveGamesHome.setGames(this.info.hometeamMatches);

        const lastFiveGamesForHomeTeam = getLastFiveGames(
          this.info.homeTeamMatches,
          this.game.homeTeam
        );
        const lastFiveGamesForAwayTeam = getLastFiveGames(
          this.info.awayTeamMatches,
          this.game.awayTeam
        );

        this.setLastFiveGames({
          home: lastFiveGamesForHomeTeam,
          away: lastFiveGamesForAwayTeam,
        });

        this.setRanking(res[1].data.ranking);
        this.setKit({
          home: this.info.homeTeam.kit,
          away: this.info.awayTeam.kit,
        });
        const matchTeams = {
          home: this.info.homeTeam.name,
          away: this.info.awayTeam.name,
        };
        this.setMatchTeams(matchTeams);
        this.isLoading = true;
        if (this.info.homeTeam.id && this.info.awayTeam.id) {
          this.isInfoLoadedSuccessfully = true;
        }
      }
    );
  },
  methods: {
    ...mapActions(useScoresStore, [
      "setRanking",
      "setKit",
      "setMatchTeams",
      "setLastFiveGames",
    ]),
  },
};
</script>

<style scoped>
.match-lastfivegames-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.match-lastfivegames-item {
  flex: 1;
}
</style>
