import { useStore } from "~/store/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore();

    let isAdmin = false;
    
    if (store.token && store.user.roles.includes("ADMIN")) {
        isAdmin = true;
    }

    if (!isAdmin && to.path !== "/connexion") {
        return navigateTo("/connexion");
    } else if (isAdmin && to.path === "/connexion") {
        return navigateTo("/dashboard");
    }
});