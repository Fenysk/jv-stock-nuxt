<script setup>
import { useStore } from "~/store/store";
const store = useStore();

const { getMyArticles } = useArticles();
const myArticles = await getMyArticles();

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
});
</script>

<template>
    <main class="container mx-auto py-8">
        <h1>Dashboard</h1>

        <h2>Vos annonces</h2>

        <ul class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <li v-for="article in myArticles" :key="article.id">
                <DashboardArticlesCard :article="article" />
            </li>
        </ul>
        
    </main>
</template>
