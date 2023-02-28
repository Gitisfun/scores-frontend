import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import League from "../views/League.vue";
import Match from "../views/Match.vue";
import Favorites from "../views/Favorites.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/league",
    name: "League",
    component: League,
  },
  {
    path: "/match",
    name: "Match",
    component: Match,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
