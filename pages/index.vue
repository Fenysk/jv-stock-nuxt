<script setup lang="ts">

const { data: gamesInStock } = await useFetch('https://jv-stock-backend.onrender.com/api/game/get/stock');

</script>

<template>
    <main class="container p-2 mx-auto">
        <h1>JV Stock</h1>

        <ul class="grid items-center grid-cols-6 gap-4">
            <li v-for="game in gamesInStock" :key="game.id" class="flex h-16 bg-orange-200 rounded">
                <NuxtLink :to="'/games/' + game.purchase_id" class="w-full p-2">
                    {{ game.name }}
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>