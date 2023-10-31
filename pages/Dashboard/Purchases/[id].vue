<script setup lang="ts">
const { getPurchaseById } = usePurchases();
const { formattedDateHours } = useDate();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth"],
});

const route = useRoute();
const purchase_id = route.params.id;

const purchase = await getPurchaseById(purchase_id);
</script>

<template>
    <main class="pb-8 container mx-auto">
        <div
            id="Game"
            class="overflow-hidden bg-white shadow-md flex flex-col lg:flex-row rounded-b-xl w-full"
        >
            <div
                id="Banner"
                class="relative flex items-end lg:w-3/5 h-72 lg:h-auto"
                :style="`background-image: url('${purchase.Game.image_url}'); background-size: cover; background-position: center;`"
            >
                <div
                    class="absolute h-full w-full bg-gradient-to-t from-black/95 from-10% to-70%"
                ></div>
                <img
                    :src="
                        '/images/logo/consoles/' +
                        purchase.Game.console +
                        '.png'
                    "
                    alt="Console logo"
                    class="absolute z-10 object-contain h-24 -bottom-8 lg:bottom-0 right-4"
                />
                <h1 class="z-10 w-4/6 p-4 my-0 text-5xl text-white">
                    {{ purchase.Game.name }}
                </h1>
            </div>

            <div class="p-4 lg:w-2/5">
                <h2>Details</h2>

                <div class="mt-4">
                    <h3>Prix</h3>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h4>Achat</h4>
                            <div
                                class="flex items-center gap-1 text-lg text-red-700"
                            >
                                <IconsArrowDown />
                                <p>{{ purchase.purchased_price }} €</p>
                            </div>
                        </div>

                        <div>
                            <h4>Estimation</h4>
                            <div
                                class="flex items-center gap-1 text-lg text-green-700"
                            >
                                <IconsArrowUp />
                                <p>{{ purchase.estimated_price }} €</p>
                            </div>
                        </div>

                        <div v-if="purchase.Article">
                            <h4>
                                {{
                                    purchase.Article.Sale
                                        ? "Prix vendu"
                                        : "Prix de vente"
                                }}
                            </h4>
                            <div
                                class="flex items-center gap-1 text-lg text-blue-700"
                            >
                                <IconsFile />
                                <p>
                                    {{
                                        purchase.Article.Sale
                                            ? purchase.Article.Sale.solded_price
                                            : purchase.Article.price
                                    }}
                                    €
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4>Bénéfices</h4>
                            <div
                                class="flex items-center gap-1 text-lg text-yellow-700"
                            >
                                <IconsPiggyBank />
                                <p v-if="!purchase.Article">
                                    {{
                                        purchase.estimated_price -
                                        purchase.purchased_price
                                    }}
                                    €
                                </p>
                                <p v-else>
                                    {{
                                        purchase.Article.price -
                                        purchase.purchased_price
                                    }}
                                    €
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <h3>Contenu</h3>
                    <ul class="flex flex-wrap gap-2">
                        <li
                            v-for="content in purchase.content"
                            :key="content"
                            class="px-3 py-1 text-sm font-semibold text-orange-900 bg-orange-200 rounded-lg w-fit"
                        >
                            {{ content }}
                        </li>
                    </ul>
                </div>

                <div class="grid grid-cols-3 gap-4 mt-4">
                    <div>
                        <h3 class="mb-0">Origine</h3>
                        <p>{{ purchase.origin }}</p>
                    </div>

                    <div>
                        <h3 class="mb-0">Edition</h3>
                        <p>{{ purchase.Game.edition }}</p>
                    </div>

                    <div>
                        <h3 class="mb-0">Etat</h3>
                        <p>{{ purchase.state }}</p>
                    </div>
                </div>

                <p class="mt-8 text-gray-700">
                    Ajouté le {{ formattedDateHours(purchase.created_at) }}
                </p>

                <div class="flex justify-between gap-2 mt-8">
                    <NuxtLink
                        :to="'/dashboard/purchases/'"
                        class="button--primary"
                    >
                        Retour
                    </NuxtLink>
                    <NuxtLink
                        :to="'/dashboard/purchases/edit/' + purchase.id"
                        class="button--primary"
                    >
                        Modifier
                    </NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>
