<script setup lang="ts">
const { getGameById } = useGames();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const route = useRoute();
const game_id = route.params.id;

const game = await getGameById(game_id);
</script>

<template>
    <main class="container mx-auto">
        <img
            :src="game.image_url"
            alt="Game image"
            class="w-full h-64 object-cover"
        />

        <h1>{{ game.name }}</h1>

        <div class="flex justify-between w-1/3">
            <NuxtLink :to="'/dashboard/games/'" class="button--primary">
                Retour
            </NuxtLink>
            <NuxtLink
                :to="'/dashboard/games/edit/' + game.id"
                class="button--primary"
            >
                Modifier
            </NuxtLink>
        </div>
    </main>
</template>
