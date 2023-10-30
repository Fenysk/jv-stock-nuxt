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
    <main class="px-2 py-8 container mx-auto">
        <h1>{{ game.name }}</h1>
    </main>
</template>
