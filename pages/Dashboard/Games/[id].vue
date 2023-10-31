<script setup lang="ts">
const { getGameById } = useGames();
const { formattedDate } = useDate();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const route = useRoute();
const game_id = route.params.id;

const game = await getGameById(game_id);
</script>

<template>
    <main class="pb-8 container mx-auto">
        <img
            :src="game.image_url"
            alt="Game image"
            class="w-full h-64 object-cover"
        />

        <div class="flex items-end gap-8">
            <img
                :src="'/images/logo/consoles/' + game.console + '.png'"
                :alt="game.console + ' logo'"
                class="w-24 h-24 object-cover"
            />
            <div>
                <h1 class="m-0 text-4xl">{{ game.name }}</h1>
                <p class="mt-2 text-xl">Sortie le {{ game.released_year }}</p>
            </div>
        </div>

        <div class="mt-4 flex gap-16">
            <div>
                <span class="text-lg font-semibold">Edition</span>
                <p>{{ game.edition }}</p>
            </div>
            <div>
                <span class="text-lg font-semibold">Région</span>
                <p>{{ game.region }}</p>
            </div>
            <div>
                <span class="text-lg font-semibold">Ajouté le</span>
                <p>{{ formattedDate(game.created_at) }}</p>
            </div>
        </div>

        <div class="flex gap-2 mt-8">
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
