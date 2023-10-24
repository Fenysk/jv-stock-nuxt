<script setup lang="ts">

const route = useRoute();
const article_id = route.params.id;
const { data: article } = await useFetch('https://jv-stock-backend.onrender.com/api/purchase/get/' + article_id);

</script>

<template>
    <main class="container p-2 mx-auto">
        <h1>{{ article.Game.name }}</h1>
    </main>
</template>