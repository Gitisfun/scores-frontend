<template>
  <div class="league-container">
    <span>
      {{ title }}
    </span>
    <!-- <Icon
      @click="navToLeague"
      icon="bx:right-arrow"
      color="black"
      width="15"
      height="15"
      /> -->
    <IconWithHover
      @iconClick="navToLeague"
      icon="bx:caret-right"
      color="white"
      width="20 "
      height="20"
    />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { LEAGUE_ROUTE } from "../../logic/constants/routes";
import { navigate } from "../../logic/util";
import IconWithHover from "./IconWithHover.vue";

export default {
  name: "LeagueHeader",
  props: {
    title: String,
  },
  components: {
    Icon,
    IconWithHover,
  },
  methods: {
    navToLeague() {
      navigate(this, LEAGUE_ROUTE, this.title);
    },
  },
};
</script>

<style scoped>
.league-container {
  display: flex;
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  font-size: 14px;
  border-radius: 7.5px;
  background-color: skyblue;
  /* background-color: #dff9fb; */
  color: white;
  /* border: 1px solid skyblue; */
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}
</style>
