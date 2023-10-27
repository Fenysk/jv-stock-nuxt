<script setup lang="ts">
const { getMyPurchases } = usePurchases();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const purchases = ref([]);

const fetchPurchases = async (search?: string) => {
    purchases.value = await getMyPurchases(search);
};

onMounted(async () => {
    await fetchPurchases();
});
</script>

<template>
    <main class="px-2 py-8 container mx-auto">
        <h1>Purchases</h1>

        <input @keyup="fetchPurchases($event.target.value)" type="text" />
        <pre>{{ purchases }}</pre>
    </main>
</template>
