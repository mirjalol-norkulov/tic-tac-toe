import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pick-side",
    name: "pick-side",
    component: () =>
      import(/* webpackChunkName: "pick-side" */ "@/views/PickSide"),
  },
  {
    path: "/enter-name",
    name: "enter-name",
    component: () =>
      import(/* webpackChunkName: "enter-name" */ "@/views/EnterName"),
  },
  {
    path: "/play/with-ai",
    name: "play-with-ai",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/play/WithAI.vue"),
  },
  {
    path: "/play/with-friend",
    name: "play-with-friend",
    component: () =>
      import(
        /* webpackChunkName: "play-with-friend" */ "@/views/play/WithFriend.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
