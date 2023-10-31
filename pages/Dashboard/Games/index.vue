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
    try {
        games.value = await getAllGames(search);
    } catch (error) {
        games.value = [];
    }
};

onMounted(async () => {
    await fetchGames();
});
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Jeux</h1>

        <p>
            C'est ici que vous pouvez gérer les jeux connus par le site et
            pouvant être ajoutés à une collection.
        </p>

        <div class="mt-4 flex gap-2 items-center">
            <input
                @keyup="fetchGames($event.target.value)"
                type="text"
                class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-fit"
                placeholder="Rechercher un jeu"
            />
            <NuxtLink :to="`/dashboard/games/new`" class="button--primary"
                >Créer un nouveau jeu</NuxtLink
            >
        </div>

        <section id="Games" class="mt-8">
            <ul class="flex gap-4 flex-wrap">
                <li v-for="game in games" :key="game.id">
                    <DashboardGamesCard :game="game" />
                </li>
            </ul>
        </section>
    </main>
</template>
