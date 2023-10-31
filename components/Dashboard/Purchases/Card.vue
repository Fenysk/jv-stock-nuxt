<script setup>
const { formattedDate } = useDate();

const props = defineProps({
    purchase: Object,
});
</script>

<template>
    <article
        class="flex flex-row h-full overflow-hidden bg-orange-100 border border-orange-200 shadow-sm rounded-xl"
    >
        <div class="relative flex w-1/4 h-full rounded-md">
            <!-- Left side -->
            <img
                :src="`${props.purchase.Game.image_url}`"
                alt="Game image"
                class="object-cover w-full h-full"
            />
            <img
                :src="
                    '/images/logo/consoles/' +
                    props.purchase.Game.console +
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
                        class="mt-1 mb-0 text-lg font-semibold truncate whitespace-nowrap"
                    >
                        {{ props.purchase.Game.name }}
                    </h3>
                    <p class="truncate whitespace-nowrap">
                        Edition {{ props.purchase.Game.edition }}
                    </p>
                    <p class="text-sm truncate whitespace-nowrap">
                        Contient
                        {{ props.purchase.content.length }} éléments
                    </p>
                    <p class="text-sm truncate whitespace-nowrap">
                        {{ props.purchase.state }}
                    </p>
                </div>

                <div id="prices" class="flex flex-col">
                    <div class="flex flex-wrap justify-end gap-1">
                        <div class="flex items-center text-red-700">
                            <IconsArrowDown />
                            <span>{{ purchase.purchased_price }}</span>
                        </div>
                        <div class="flex items-center text-green-700">
                            <IconsArrowUp />
                            <span v-if="!purchase.Article">{{
                                purchase.estimated_price
                            }}</span>
                            <span v-else>{{ purchase.Article.price }}</span>
                        </div>
                        <div class="flex items-center text-yellow-700">
                            <IconsPiggyBank />
                            <span v-if="!purchase.Article">{{
                                purchase.estimated_price -
                                purchase.purchased_price
                            }}</span>
                            <span v-else>{{
                                purchase.Article.price -
                                purchase.purchased_price
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-end justify-between gap-1">
                <div>
                    <p class="text-xs leading-4 truncate whitespace-nowrap">
                        Ajouté le {{ formattedDate(props.purchase.created_at) }}
                    </p>
                </div>
                <div id="controls" class="flex flex-row justify-end gap-1">
                    <NuxtLink
                        :to="'/dashboard/purchases/' + props.purchase.id"
                        class="px-2 py-1 text-sm font-semibold transition-all bg-white border rounded-lg whitespace-nowrap hover:px-3"
                    >
                        Voir les détails</NuxtLink
                    >
                </div>
            </div>
        </div>
    </article>
</template>
