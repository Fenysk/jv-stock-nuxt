<template>
    <div
        id="OtherCard"
        class="h-64 w-48 p-4 text-orange-900 bg-orange-100 rounded-lg border border-orange-200 flex flex-col gap-4 justify-center items-center"
    >
        <p class="text-center">Plus d'annonces</p>
        <IconsArrowRight id="Arrow" class="text-xl transition" />
    </div>
</template>

<style scoped>
#OtherCard:hover #Arrow {
    @apply translate-x-1;
}
</style>