import { defineStore } from "pinia";

export const useStore = defineStore("Store", () => {
    const token = ref(null);

    function setToken(newToken) {
        token.value = newToken;
    }

    function removeToken() {
        token.value = null;
    }



    const user = ref(null);

    function setUser(newUser) {
        user.value = newUser;
    }

    function removeUser() {
        user.value = null;
    }

    return {
        token,
        user,
        setToken,
        removeToken,
        setUser,
        removeUser,
    };
});
