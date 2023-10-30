<script setup>
const { formattedReverseDate } = useDate();

const props = defineProps({
    article: Object,
});
</script>

<template>
    <article class="relative w-48 flex flex-col gap-2">
        <NuxtLink :to="'/articles/' + article.id">
            <div
                id="Game"
                class="relative z-10 transition ease-in flex flex-row h-64 w-48 overflow-hidden bg-orange-100 border border-orange-200 shadow-md rounded-lg"
            >
                <img
                    :src="`${props.article.Purchase.Game.image_url}`"
                    alt="Game image"
                    class="object-cover w-full h-full object-top"
                />
                <span
                    class="absolute z-20 top-2 right-2 font-bold text-black/90 px-2 py-2 leading-3 tracking-tight rounded-md bg-white/80 border border-black/40 backdrop-blur-sm"
                >
                    {{ article.price }} €
                </span>
            </div>
        </NuxtLink>

        <div id="Details">
            <p class="text-xs text-gray-700">
                Mis en ligne {{ formattedReverseDate(article.created_at) }}
            </p>
            <p class="whitespace-wrap font-semibold pr-4">
                {{ article.Purchase.Game.name }}
            </p>
            <p class="text-sm">
                Contient {{ article.Purchase.content.length }} éléments
            </p>
            <p class="text-sm">{{ article.Purchase.state }}</p>
        </div>
    </article>
</template>

<style scoped>
#Game:hover {
    @apply shadow-lg scale-105 translate-y-[-4px];
}
</style>
