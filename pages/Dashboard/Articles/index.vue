<script setup lang="ts">
const { getMyArticles } = useArticles();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const articles = ref([]);

const fetchArticles = async (search?: string) => {
    articles.value = await getMyArticles(search);
};

onMounted(async () => {
    await fetchArticles();
});
</script>

<template>
    <main class="px-2 py-8 container mx-auto">
        <h1>Articles</h1>

        <input @keyup="fetchArticles($event.target.value)" type="text" />
        <pre>{{ articles }}</pre>
    </main>
</template>
