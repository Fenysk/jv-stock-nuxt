<script setup>
import { ref, onMounted } from 'vue';

import { useStore } from "~/store/store";
const store = useStore();

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
    <header class="z-50 w-full h-24 flex bg-white text-black border-b-4 border-orange-500 px-2">
        <nav class="container flex items-center justify-between gap-6 mx-auto lg:gap-16">
            <div id="branding">
                <NuxtLink :to="'/'" class="flex items-center gap-4">
                    <IconsLogo class="w-14 h-fit aspect-square rounded-lg hover:-rotate-12 transition" />
                    <span class="text-4xl font-extrabold tracking-widest">Play&Swap</span>
                </NuxtLink>
            </div>
            <div id="burger" class="relative z-10 flex items-center justify-center w-8 h-8 lg:hidden">
                <button @click="toggleMenu" class="w-full h-full focus:outline-none">
                    <IconsBurger class="text-4xl" />
                </button>
            </div>
            <ul class="absolute left-0 z-50 flex flex-col items-start justify-center w-full gap-8 overflow-hidden font-semibold text-center bg-orange-400 top-24 lg:static lg:flex-row lg:top-0 lg:left-auto lg:w-auto lg:px-0 lg:py-0 lg:text-base lg:bg-transparent lg:font-normal lg:justify-end lg:gap-16 lg:h-auto"
                :class="(isMenuOpen) ? 'h-[50vh] p-24' : 'h-0'">
                <li class="flex gap-2 items-center text-2xl rounded-lg hover:text-orange-500">
                    <IconsController/>
                    <NuxtLink @click="toggleMenu" :to="'/games'">Games</NuxtLink>
                </li>
                <li class="flex gap-2 items-center text-2xl rounded-lg hover:text-orange-500" v-if="!store.user">
                    <IconsConnexion/>
                    <NuxtLink @click="toggleMenu" :to="'/connexion'" >Connexion
                    </NuxtLink>
                </li>
                <li v-else class="flex gap-2 items-center text-2xl rounded-lg hover:text-orange-500">
                    <IconsDashboard/>
                    <NuxtLink @click="toggleMenu" :to="'/dashboard'" >Dashboard
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>