<script setup>
const { formattedDate } = useDate();

const props = defineProps({
    article: Object,
});
</script>

<template>
    <article
        class="flex flex-row h-full overflow-hidden bg-orange-100 border border-orange-200 shadow-sm rounded-xl"
    >
        <div class="relative flex w-1/4 h-full rounded-md">
            <!-- Left side -->
            <img
                :src="`${props.article.Purchase.Game.image_url}`"
                alt="Game image"
                class="object-cover w-full h-full"
            />
            <img
                :src="
                    '/images/logo/consoles/' +
                    props.article.Purchase.Game.console +
                    '.png'
                "
                alt="Console logo"
                class="absolute top-0 z-20 object-contain h-8 right-1"
            />
        </div>

        <div class="flex flex-col justify-between w-3/4 gap-2 p-2">
            <!-- Right side -->
            <div id="details" class="flex flex-row justify-between">
                <div class="flex flex-col max-w-[70%]">
                    <h3
                        class="my-0 text-lg font-semibold truncate whitespace-nowrap"
                    >
                        {{ props.article.Purchase.Game.name }}
                    </h3>
                    <p class="truncate whitespace-nowrap">
                        Edition {{ props.article.Purchase.Game.edition }}
                    </p>
                    <p class="text-sm truncate whitespace-nowrap">
                        Contient
                        {{ props.article.Purchase.content.length }} éléments
                    </p>
                    <p class="text-sm truncate whitespace-nowrap">
                        {{ props.article.Purchase.state }}
                    </p>
                </div>

                <div id="prices" class="flex flex-col">
                    <div class="flex flex-col">
                        <div
                            class="flex justify-between gap-1 items-center text-red-700"
                        >
                            <IconsArrowDown />
                            <span>{{ article.Purchase.purchased_price }}</span>
                        </div>
                        <div
                            class="flex justify-between gap-1 items-center text-green-700"
                        >
                            <IconsArrowUp />
                            <span>{{ article.price }}</span>
                        </div>
                        <div
                            class="flex justify-between gap-1 items-center text-yellow-700"
                        >
                            <IconsPiggyBank />
                            <span>{{
                                article.price - article.Purchase.purchased_price
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-end justify-between gap-1">
                <div>
                    <p class="text-xs leading-4 truncate whitespace-nowrap">
                        Mis en vente le<br />
                        {{ formattedDate(props.article.created_at) }}
                    </p>
                </div>
                <div id="controls" class="flex flex-row justify-end gap-1">
                    <NuxtLink
                        :to="'/articles/' + props.article.id"
                        class="px-2 py-1 text-sm font-semibold transition-all bg-white border rounded-lg whitespace-nowrap hover:px-3"
                    >
                        Voir l'annonce</NuxtLink
                    >
                </div>
            </div>
        </div>
    </article>
</template>
