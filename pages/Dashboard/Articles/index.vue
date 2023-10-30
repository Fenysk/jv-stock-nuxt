<script setup lang="ts">
const { getMyArticles } = useArticles();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
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
        <h1>Articles</h1>

        <input @keyup="fetchMyArticles($event.target.value)" type="text" />
        
        <ul class="flex gap-4 flex-wrap">
            <li v-for="article in myArticles" :key="article.id">
                {{ article.title }}
            </li>
        </ul>
    </main>
</template>