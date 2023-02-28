<template>
  <div class="header-container">
    <Icon
      v-if="isOnHomePage()"
      icon="bx:football"
      color="black"
      width="35"
      height="35"
    />

    <IconWithHover
      v-if="!isOnHomePage()"
      icon="bx:arrow-back"
      width="30"
      height="30"
      @iconClick="goBack"
    />
    <!-- 
      <Icon
      v-if="!isOnHomePage()"
      icon="bx:arrow-back"
      width="30"
      height="30"
      @iconClick="goBack"
      style="cursor: pointer"
      @mouseover="onHover"
      @mouseleave="onLeave"
      :color="color"
    /> -->
    <span class="header-container-text"> {{ title }} </span>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { HOME_ROUTE } from "../../logic/constants/routes";
import { isOnRoute } from "../../logic/util";
import IconWithHover from "./IconWithHover.vue";

export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {
    Icon,
    IconWithHover,
  },
  data() {
    return {
      color: "black",
    };
  },
  methods: {
    isOnHomePage() {
      return isOnRoute(this, HOME_ROUTE);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.header-container {
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 25px;
  padding-right: 10px;
  display: flex;
  align-items: center;
}
.header-container-text {
  margin-left: 25px;
  color: black;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
}
</style>
