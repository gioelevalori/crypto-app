import CryptoInfo from "@/components/CryptoInfo.vue";
import CryptoList from "@/components/CryptoList.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: CryptoList
    },
    {
        path: "/crypto/:id",
        component: CryptoInfo
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;