<script setup>
const { getAllAvailableArticles } = useArticles();

const articles = ref([]);

async function fetchArticles() {
    articles.value = await getAllAvailableArticles();
}

onMounted(() => {
    fetchArticles();
});

</script>

<template>
    <main class="container px-2 py-8 mx-auto">
        <h1>Derniers articles</h1>

        <div id="games-list">
            <ul class="flex gap-4 flex-wrap">
                <li v-for="article in articles" :key="article.id">
                    <HomeArticlesCard :article="article" />
                </li>
            </ul>
            <div v-if="articles.length === 0">
                <p class="p-4 text-center text-red-500 bg-red-100 rounded-md">Can't fetch articles</p>
            </div>
        </div>

    </main>
</template>