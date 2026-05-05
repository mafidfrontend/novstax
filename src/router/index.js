import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/LandingView.vue"),
  },
  {
    path: "/ranks",
    redirect: { path: "/", hash: "#ranks" },
  },
  {
    path: "/tokens",
    redirect: { path: "/", hash: "#tokens" },
  },
  {
    path: "/contact",
    redirect: { path: "/", hash: "#contact" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 88 };
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
