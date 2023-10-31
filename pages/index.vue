<script setup>
import { useStore } from "~/store/store";
const store = useStore();

const { getAllAvailableArticles } = useArticles();
const articles = await getAllAvailableArticles();
</script>

<template>
    <main class="container px-2 py-8 mx-auto">
        <h1 class="text-center text-xl mb-8">
            Des dizaines de consoles et de jeux-vidéo selon vos critères !
        </h1>

        <section
            id="Hero"
            class="p-4 bg-white border-orange-200 border-2 rounded-xl flex justify-center items-center"
        >
            <p>Vous avez des jeux qui prennent la poussière ?</p>
            <NuxtLink
                to="/dashboard/sell"
                class="ml-4 button--primary"
                >Vendez-les !</NuxtLink
            >
        </section>

        <section id="Articles">
            <h2 class="text-orange-950">
                <IconsFillTimer class="inline -mt-1 mr-2" />Dernières annonces
            </h2>
            <p>
                Retrouvez ici les derniers jeux mis en vente par nos
                utilisateurs.
            </p>
            <ul class="flex gap-4 flex-wrap mt-2">
                <li v-for="article in articles" :key="article.id">
                    <HomeArticlesCard :article="article" />
                </li>
                <li>
                    <NuxtLink
                        :to="`/articles`"
                    >
                        <HomeArticlesOtherCard />
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <section id="Trends">
            <h2 class="text-orange-950">
                <IconsFillFire class="inline -mt-1 mr-2" />Tendances
            </h2>
            <p>Ces jeux convoitent en ce moment l'intérêt de nos joueurs.</p>
            <ul class="flex gap-4 flex-wrap mt-2">
                <li v-for="article in articles" :key="article.id">
                    <HomeArticlesCard :article="article" />
                </li>
            </ul>
        </section>
    </main>
</template>
