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

        <ul>
            <li v-for="game in games" :key="game.id">
                <NuxtLink :to="`/dashboard/games/${game.id}`">{{ game.name }}</NuxtLink>
            </li>
        </ul>
    </main>
</template>
