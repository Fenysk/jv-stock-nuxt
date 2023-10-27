<script setup>
import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
});

const disconnect = () => {
    store.removeToken();
    store.removeUser();
    navigateTo("/");
};
</script>

<template>
    <main class="container mx-auto px-2 py-8">
        <h1>{{ store.user.username }}</h1>

        <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
            @click="disconnect"
        >
            Logout
        </button>
    </main>
</template>
