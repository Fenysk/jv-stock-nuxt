<script setup>
import { ref, onMounted } from "vue";

import { useStore } from "~/store/store";
const store = useStore();

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
    <header
        class="z-50 w-full h-16 flex bg-white text-black border-b-4 border-orange-500 px-2"
    >
        <nav
            class="container flex items-center justify-between gap-6 mx-auto lg:gap-16"
        >
            <div id="branding">
                <NuxtLink :to="'/'" class="flex items-center gap-4">
                    <IconsLogo
                        class="w-10 h-fit aspect-square rounded-lg hover:-rotate-12 transition"
                    />
                    <span class="text-2xl font-extrabold tracking-widest whitespace-nowrap"
                        >Play & Swap</span
                    >
                </NuxtLink>
            </div>
            <div class="w-96 relative">
                <input
                    type="text"
                    placeholder="Rechercher un jeu"
                    class="w-full h-10 px-4 py-2 text-lg border border-transparent bg-gray-100 placeholder:text-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button
                    class="absolute top-0 right-0 z-10 flex items-center justify-center w-10 h-10 text-gray-600 rounded-lg hover:text-orange-500 focus:outline-none"
                >
                    <IconsSearch class="w-6 h-6" />
                </button>
            </div>
            <div
                id="burger"
                class="relative z-10 flex items-center justify-center w-8 h-8 lg:hidden"
            >
                <button
                    @click="toggleMenu"
                    class="w-full h-full focus:outline-none"
                >
                    <IconsBurger class="text-4xl" />
                </button>
            </div>
            <ul
                class="absolute left-0 z-50 flex flex-col items-start justify-center w-full gap-8 overflow-hidden font-semibold text-center bg-white border-orange-500 top-16 lg:static lg:flex-row lg:top-0 lg:left-auto lg:w-auto lg:px-0 lg:py-0 lg:text-base lg:bg-transparent lg:font-normal lg:justify-end lg:gap-16 lg:h-auto"
                :class="
                    isMenuOpen
                        ? 'h-[30vh] px-[20%] border-b-4 lg:border-none'
                        : 'h-0'
                "
            >
                <li
                    class="flex gap-2 items-center text-lg rounded-lg hover:text-orange-500"
                >
                    <IconsController />
                    <NuxtLink @click="toggleMenu" :to="'/games'"
                        >Games</NuxtLink
                    >
                </li>
                <li
                    class="flex gap-2 items-center text-lg rounded-lg hover:text-orange-500"
                    v-if="!store.user"
                >
                    <IconsConnexion />
                    <NuxtLink @click="toggleMenu" :to="'/connexion'"
                        >Connexion
                    </NuxtLink>
                </li>
                <li
                    v-else
                    class="flex gap-2 items-center text-lg rounded-lg hover:text-orange-500"
                >
                    <IconsDashboard />
                    <NuxtLink @click="toggleMenu" :to="'/dashboard'"
                        >Dashboard
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>
