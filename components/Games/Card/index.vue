<script setup>
import { defineProps } from 'vue';

const api_url = 'https://jv-stock-backend.onrender.com/api';

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});

function formattedDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}
</script>

<template>
    <article class="flex flex-row h-full overflow-hidden bg-orange-100 border border-orange-200 shadow-sm rounded-xl">

        <div class="relative flex w-1/4 h-full rounded-md"> <!-- Left side -->
            <img :src="`${props.article.Purchase.Game.image_url}`" alt="Game image" class="object-cover w-full h-full">
            <img :src="'/images/logo/consoles/' + props.article.Purchase.Game.console + '.png'" alt="Console logo"
                class="absolute top-0 z-20 object-contain h-8 right-1">
        </div>

        <div class="flex flex-col justify-between w-3/4 gap-2 p-2"> <!-- Right side -->
            <div id="details" class="flex flex-row justify-between">
                <div class="flex flex-col max-w-[70%]">

                    <h3 class="mt-1 mb-0 text-lg font-semibold truncate whitespace-nowrap">{{
                        props.article.Purchase.Game.name }}
                    </h3>
                    <p class="truncate whitespace-nowrap">Edition {{
                        props.article.Purchase.Game.edition }} </p>
                    <p class="text-sm truncate whitespace-nowrap">Contient {{ props.article.Purchase.content.length }} éléments</p>
                    <p class="text-sm truncate whitespace-nowrap">{{ props.article.Purchase.state }}</p>
                </div>

                <div id="prices" class="flex flex-col items-end flex-none gap-1">
                    <p class="px-3 py-1 text-lg font-bold tracking-tight bg-yellow-400 rounded-lg">{{ props.article.price }}
                        €</p>
                </div>
            </div>

            <div class="flex flex-row items-end justify-between gap-1">
                <div>
                    <p class="text-sm">Par <span class="font-semibold">{{ props.article.User.username }}</span></p>
                    <p class="text-xs leading-4 truncate whitespace-nowrap">le {{
                        formattedDate(props.article.created_at) }}</p>
                </div>
                <div id="controls" class="flex flex-row justify-end gap-1">
                    <NuxtLink :to="'/games/' + props.article.id"
                        class="px-2 py-1 text-sm font-semibold transition-all bg-white border rounded-lg whitespace-nowrap hover:px-3">
                        Voir l'article</NuxtLink>
                </div>
            </div>


        </div>
    </article>
</template>