<script setup lang="ts">

const articles = await $fetch('http://localhost:3621/api/article/get/available', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
});

</script>

<template>
    <main class="container px-2 py-8 mx-auto">
        <h1>Games</h1>

        <div id="games-list">
            <ul class="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2 xl:grid-cols-3 md:gap-4 xl:gap-8">
                <li v-for="article in articles" :key="article.id">
                    <GamesCard :article="article" />
                </li>
            </ul>
            <div v-if="articles.length === 0">
                <p class="p-4 text-center text-red-500 bg-red-100 rounded-md">Can't fetch articles</p>
            </div>
        </div>

    </main>
</template>