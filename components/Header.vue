<script setup lang="ts">
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
                    <svg class="w-full h-full" viewBox="0 0 100 100">
                        <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" stroke-width="10" />
                        <line x1="20" y1="30" x2="80" y2="30" stroke="black" stroke-width="10" />
                        <line x1="20" y1="50" x2="80" y2="50" stroke="black" stroke-width="10" />
                        <line x1="20" y1="70" x2="80" y2="70" stroke="black" stroke-width="10" />
                    </svg>
                </button>
            </div>
            <ul class="absolute left-0 flex flex-col items-start justify-center w-full gap-8 overflow-hidden text-2xl font-semibold text-center bg-orange-400 top-16 sm:static sm:flex-row sm:top-0 sm:left-auto sm:w-auto sm:px-0 sm:py-0 sm:text-base sm:bg-transparent sm:font-normal sm:justify-end sm:gap-6 sm:h-auto"
                :class="(isMenuOpen) ? 'h-[50vh] p-24' : 'h-0'">
                <li>
                    <NuxtLink @click="toggleMenu" :to="'/connexion'" class="border-black hover:border-b">Connexion
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>