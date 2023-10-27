<script setup lang="ts">
const { getAllGames } = useGames();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const games = ref([]);

const fetchGames = async (search?: string) => {
    games.value = await getAllGames(search);
};

onMounted(async () => {
    await fetchGames();
});
</script>

<template>
    <main class="px-2 py-8 container mx-auto">
        <h1>Games</h1>

        <input @keyup="fetchGames($event.target.value)" type="text" />
        <pre>{{ games }}</pre>
    </main>
</template>
