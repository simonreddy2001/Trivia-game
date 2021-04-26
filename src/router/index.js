import VueRouter from "vue-router";
import Enter from "@/components/Enter.vue";
import Games from "@/components/Games.vue";
import Result from "@/components/Result.vue";

const routes = [
    {
        path: "/",
        name: "Enter",
        component: Enter,
    },
    {
        path: "/games",
        name: "Games",
        component: Games,
    },
    {
        path: "/result",
        name: "Result",
        component: Result,
    },
];

const router = new VueRouter({ routes });

export default router;
