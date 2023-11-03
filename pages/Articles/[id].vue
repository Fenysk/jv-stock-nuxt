<script setup>
import { useStore } from "~/store/store";
const store = useStore();

const route = useRoute();
const article_id = route.params.id;

const { getArticleById } = useArticles();
const article = await getArticleById(article_id);
</script>

<template>
    <main class="container px-2 pb-8 mx-auto">
        <article class="flex flex-col gap-8 lg:flex-row">
            <div
                id="Game"
                class="overflow-hidden bg-white shadow-md lg:w-2/5 rounded-b-xl"
            >
                <div
                    id="Banner"
                    class="relative flex items-end w-full h-72"
                    :style="`background-image: url('${article.Purchase.Game.image_url}'); background-size: cover; background-position: center;`"
                >
                    <div
                        class="absolute h-full w-full bg-gradient-to-t from-black/95 from-10% to-70%"
                    ></div>
                    <img
                        :src="
                            '/images/logo/consoles/' +
                            article.Purchase.Game.console +
                            '.png'
                        "
                        alt="Console logo"
                        class="absolute z-10 object-contain h-24 -bottom-8 right-4"
                    />
                    <h1 class="z-10 w-4/6 p-4 my-0 text-5xl text-white">
                        {{ article.Purchase.Game.name }}
                    </h1>
                </div>

                <div class="p-4">
                    <h2>Details</h2>

                    <div class="mt-4">
                        <h3>Contenu</h3>
                        <ul class="flex flex-wrap gap-2">
                            <li
                                v-for="content in article.Purchase.content"
                                :key="content"
                                class="px-3 py-1 text-sm font-semibold text-orange-900 bg-orange-200 rounded-lg w-fit"
                            >
                                {{ content }}
                            </li>
                        </ul>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mt-4">
                        <div>
                            <h3>Console</h3>
                            <p>{{ article.Purchase.Game.console }}</p>
                        </div>

                        <div>
                            <h3>Edition</h3>
                            <p>{{ article.Purchase.Game.edition }}</p>
                        </div>

                        <div>
                            <h3>Etat</h3>
                            <p>{{ article.Purchase.state }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col gap-4 p-4 bg-orange-100 rounded-lg border border-orange-200 shadow-lg lg:w-3/5 h-fit lg:mt-8"
            >
                <div id="Seller" class="flex items-center gap-4">
                    <img
                        :src="`${article.User.avatar_url}`"
                        alt="Seller avatar"
                        class="object-cover w-20 h-20 rounded-full"
                    />
                    <div>
                        <NuxtLink
                            :to="'/user/' + article.User.id"
                            class="text-xl font-semibold"
                        >
                            {{ article.User.username }}
                        </NuxtLink>
                        <p>{{ article.User.Articles.length }} annonces</p>
                    </div>

                    <p
                        class="ml-auto mr-4 text-4xl font-bold text-orange-900 whitespace-nowrap"
                    >
                        {{ article.price }} €
                    </p>
                </div>

                <div id="Details">
                    <p class="mb-4 text-2xl font-semibold">
                        {{ article.title }}
                    </p>

                    <HomeArticleGalerie :images_url="article.images_url" />

                    <p class="mt-4 text-lg">{{ article.description }}</p>

                    <div class="mt-4 flex justify-end">
                        <NuxLink
                            v-if="store.user && article.User.id === store.user.id"
                            :to="'/dashboard/articles/edit/' + article.id"
                            class="button--primary"
                        >
                            Modifier votre article
                        </NuxLink>
                    </div>
                </div>
            </div>
        </article>
    </main>
</template>
