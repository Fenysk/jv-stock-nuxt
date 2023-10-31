<script setup>
const { formattedDate } = useDate();

const props = defineProps({
    game: Object,
});
</script>

<template>
    <article
        class="relative flex w-48 h-64 overflow-hidden bg-orange-100 border border-orange-200 shadow-sm rounded-xl transition hover:scale-105 hover:shadow-lg hover:translate-y-[-4px]"
    >
        <NuxtLink :to="`/dashboard/games/${game.id}`" class="w-full h-full">
            <img
                :src="`${game.image_url}`"
                alt="Game image"
                class="object-cover w-full h-full"
            />
            <img
                :src="'/images/logo/consoles/' + game.console + '.png'"
                :alt="`${game.console} logo`"
                class="absolute top-0 z-20 h-12 aspect-cover right-3 bg-white border-x border-b shadow-md border-gray-500/60"
            />
        </NuxtLink>
    </article>
</template>
