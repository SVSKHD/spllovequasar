import type { RouteRecordRaw } from "vue-router";

//routes
import Index from "../pages/IndexPage.vue";
import bDaylayout from "src/layouts/bDaylayout.vue";
//pages
import Hithesh from "../pages/hithesh.vue";
import spoorthy from "src/pages/spoorthy.vue";

const routes: RouteRecordRaw[] = [
  {
    name: "home",
    component: Index,
    path: "/",
  },
  {
    name: "Layout",
    path: "/layout",
    component: bDaylayout,
    children: [
      {
        name: "hithesh",
        path: "/hithesh",
        component: Hithesh,
      },
      {
        name: "Spoorthy",
        path: "/spoorthy",
        component: spoorthy,
      },
    ],
  },
];

export default routes;
