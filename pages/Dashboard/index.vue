<script setup>
import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
});
</script>

<template>
    <main class="container mx-auto py-8">
        <ul class="flex md:gap-12 gap-6 mx-auto flex-wrap w-fit justify-center">
            <li v-if="store.user.roles.includes('ADMIN')">
                <NuxtLink id="Link" to="/dashboard/games">
                    <span>Index des jeux</span>
                    <IconsController id="Icon" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink id="Link" to="/dashboard/purchases">
                    <span>Votre collection</span>
                    <IconsBox id="Icon" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink id="Link" to="/dashboard/articles">
                    <span>Vos annonces</span>
                    <IconsFile id="Icon" />
                </NuxtLink>
            </li>
            <li>
                <NuxtLink id="Link" to="/dashboard/account">
                    <span>Votre compte</span>
                    <IconsAccount id="Icon" />
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>

<style scoped>
#Link {
    @apply relative bg-orange-100 w-48 h-32 md:h-64 rounded-lg pb-24 shadow-md p-8 text-center flex flex-col gap-8 text-xl justify-center items-center border border-orange-200 font-semibold transition text-orange-950;
}

#Link #Icon {
    @apply text-4xl absolute md:bottom-12 bottom-6;
}

#Link:hover {
    @apply shadow-lg translate-y-[-4px] text-orange-900;
}
</style>
