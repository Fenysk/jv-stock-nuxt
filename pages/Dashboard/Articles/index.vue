<script setup lang="ts">
const { getMyArticles } = useArticles();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth"],
});

const myArticles = ref([]);

const fetchArticles = async (search?: string) => {
    try {
        myArticles.value = await getMyArticles(search);
    } catch (error) {
        myArticles.value = [];
    }
};

onMounted(async () => {
    await fetchArticles();
});
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Vos annonces</h1>

        <p>
            Vous avez posté <span class="font-semibold">{{ myArticles.length }}</span> annonce{{ myArticles.length > 1 ? 's' : '' }}.
        </p>

        <div class="mt-4 flex gap-2 items-center">
            <input
                @keyup="fetchArticles($event.target.value)"
                type="text"
                class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-fit"
                placeholder="Rechercher une annonce"
            />
            <NuxtLink :to="`/dashboard/articles/new`" class="button--primary"
                >Mettre en vente un jeu</NuxtLink
            >
        </div>

        <section id="Articles" class="mt-8">
            <ul
                class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
                <li v-for="article in myArticles" :key="article.id">
                    <DashboardArticlesCard :article="article" />
                </li>
            </ul>
        </section>
    </main>
</template>
