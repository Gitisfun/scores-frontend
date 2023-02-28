<template>
  <div class="favorites-container">
    <Header title="FAVORIETEN" />
    <Divider />
    <div v-if="teams.length > 0">
      <FavoriteItem v-for="team in teams" :team="team" :key="team" />
    </div>
  </div>
</template>

<script>
import Header from "../components/atom/Header.vue";
import Divider from "../components/atom/Divider.vue";
import FavoritesController from "../api/calls/favorites";
import FavoriteItem from "../components/atom/FavoriteItem.vue";

export default {
  name: "Favorites",
  components: { Header, Divider, FavoriteItem },
  data() {
    return {
      teams: [],
      favorites: [],
    };
  },
  mounted() {
    FavoritesController.get(this, null, (res) => {
      const temp = res.data.map((e) => e.name);
      this.teams = temp.sort();
    });
  },
};
</script>

<style>
.favorites-container {
  padding-bottom: 25px;
}
</style>
