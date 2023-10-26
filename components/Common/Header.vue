<script setup>
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
    <header class="z-50 w-full bg-orange-400">
        <nav class="container flex items-end justify-between gap-6 p-4 mx-auto sm:gap-16">
            <div id="branding">
                <NuxtLink :to="'/'">
                    <span class="text-2xl font-bold text-center">Fenysk Video Games</span>
                </NuxtLink>
            </div>
            <div id="burger" class="relative z-10 flex items-center justify-center w-8 h-8 sm:hidden">
                <button @click="toggleMenu" class="w-full h-full focus:outline-none">
                    <IconsBurger class="text-4xl" />
                </button>
            </div>
            <ul class="absolute left-0 z-50 flex flex-col items-start justify-center w-full gap-8 overflow-hidden text-2xl font-semibold text-center bg-orange-400 top-16 sm:static sm:flex-row sm:top-0 sm:left-auto sm:w-auto sm:px-0 sm:py-0 sm:text-base sm:bg-transparent sm:font-normal sm:justify-end sm:gap-6 sm:h-auto"
                :class="(isMenuOpen) ? 'h-[50vh] p-24' : 'h-0'">
                <li class="flex gap-2 items-center hover:text-orange-100">
                    <IconsController class="text-2xl"/>
                    <NuxtLink @click="toggleMenu" :to="'/games'">Games</NuxtLink>
                </li>
                <li class="flex gap-2 items-center hover:text-orange-100">
                    <IconsConnexion class="text-2xl"/>
                    <NuxtLink @click="toggleMenu" :to="'/connexion'" >Connexion
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>