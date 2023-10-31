<script setup>
import { useStore } from "~/store/store";
const store = useStore();
</script>

<template>
    <div
        id="DashboardHeader"
        class="w-full py-4 bg-orange-200 border-b-4 border-orange-500"
    >
        <div class="container mx-auto flex justify-between items-center">
            <div>
                <h2 class="text-xl m-0">Bonjour {{ store.user.username }} !</h2>
            </div>
            <nav>
                <ul class="flex gap-12 font-semibold">
                    <li v-if="store.user.roles.includes('ADMIN')">
                        <NuxtLink to="/dashboard/games">Jeux</NuxtLink>
                    </li>
                    <li v-if="store.user.roles.includes('SALLER')">
                        <NuxtLink to="/dashboard/purchases">Achats</NuxtLink>
                    </li>
                    <li v-if="store.user.roles.includes('SALLER')">
                        <NuxtLink to="/dashboard/articles">Articles</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/dashboard/account">Mon compte</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
