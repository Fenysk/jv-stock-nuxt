import { useStore } from "~/store/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore();

    let loggedIn = false;
    if (store.token && store.user) {
        loggedIn = true;
    }

    if (!loggedIn && to.path !== "/connexion") {
        return navigateTo("/connexion");
    } else if (loggedIn && to.path === "/connexion") {
        return navigateTo("/dashboard");
    }
});