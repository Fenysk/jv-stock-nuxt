<script setup>
import { useStore } from "~/store/store";
const store = useStore();

const { data: gamesInStock } = await useFetch(
    "http://localhost:3621/api/game/get/stock"
);
</script>

<template>
    <main class="container px-2 py-8 mx-auto">
        <h1></h1>

        <section
            id="Hero"
            class="p-4 bg-white border-orange-200 border-2 rounded-xl flex justify-center items-center"
        >
            <p>Vous avez des jeux qui prennent la poussière ?</p>
            <NuxtLink
                to="/sell"
                class="ml-4 px-4 py-2 rounded-xl bg-orange-500 text-white font-bold"
                >Vendez-les !</NuxtLink
            >
        </section>

        <section id="Articles" class="mt-4">
            <h2>Jeux</h2>
            <ul class="grid items-center grid-cols-6 gap-4">
                <li
                    v-for="game in gamesInStock"
                    :key="game.id"
                    class="flex h-16 bg-orange-200 rounded"
                >
                    <NuxtLink
                        :to="'/games/' + game.purchase_id"
                        class="w-full p-2"
                    >
                        {{ game.name }}
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </main>
</template>
