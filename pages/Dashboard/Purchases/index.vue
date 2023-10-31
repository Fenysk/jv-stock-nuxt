<script setup lang="ts">
const { getMyPurchases } = usePurchases();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth"],
});

const myPurchases = ref([]);

const fetchPurchases = async (search?: string) => {
    try {
        myPurchases.value = await getMyPurchases(search);
    } catch (error) {
        myPurchases.value = [];
    }
};

onMounted(async () => {
    await fetchPurchases();
});
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Votre collection</h1>

        <p>
            Vous avez <span class="font-semibold">{{ myPurchases.length }}</span> jeux
            dans votre collection.
        </p>

        <div class="mt-4 flex gap-2 items-center">
            <input
                @keyup="fetchPurchases($event.target.value)"
                type="text"
                class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-fit"
                placeholder="Rechercher un jeu"
            />
            <NuxtLink :to="`/dashboard/purchases/new`" class="button--primary"
                >Déclarer un nouvel achat</NuxtLink
            >
        </div>

        <section id="Purchases" class="mt-8">
            <ul
                class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
                <li v-for="purchase in myPurchases" :key="purchase.id">
                    <DashboardPurchasesCard :purchase="purchase" />
                </li>
            </ul>
        </section>
    </main>
</template>
