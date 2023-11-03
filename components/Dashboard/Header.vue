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
                <ul class="flex gap-16 font-semibold">
                    <li v-if="store.user.roles.includes('ADMIN')">
                        <NuxtLink to="/dashboard/games">
                            <div class="flex items-center gap-2">
                                <IconsController />
                                <span> Jeux</span>
                            </div>
                        </NuxtLink>
                    </li>
                    <li v-if="store.user.roles.includes('SALLER')">
                        <NuxtLink to="/dashboard/purchases">
                            <div class="flex items-center gap-2">
                                <IconsBox />
                                <span>Collection</span>
                            </div>
                        </NuxtLink>
                    </li>
                    <li v-if="store.user.roles.includes('SALLER')">
                        <NuxtLink to="/dashboard/articles">
                            <div class="flex items-center gap-2">
                                <IconsFile />
                                <span>Annonces</span>
                            </div>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/dashboard/account">
                            <div class="flex items-center gap-2">
                                <IconsAccount />
                                <span>Mon compte</span>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
