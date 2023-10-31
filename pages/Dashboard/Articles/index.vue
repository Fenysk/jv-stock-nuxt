<script setup lang="ts">
const { getMyArticles } = useArticles();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth"],
});

const myArticles = ref([]);

const fetchMyArticles = async (search?: string) => {
    myArticles.value = await getMyArticles(search);
};

onMounted(async () => {
    await fetchMyArticles();
});
</script>

<template>
    <main class="px-2 py-8 container mx-auto">
        <h1>Vos annonces</h1>

        <input @keyup="fetchMyArticles($event.target.value)" type="text" />

        <ul class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <li v-for="article in myArticles" :key="article.id">
                <DashboardArticlesCard :article="article" />
            </li>
        </ul>
    </main>
</template>