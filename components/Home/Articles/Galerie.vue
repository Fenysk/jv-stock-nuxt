<script setup>

const props = defineProps({
    images_url: {
        type: Array,
        required: true
    }
});

function zoom(image_url) {
    console.log(image_url);
}
</script>

<template>
    <div>
        <div id="images">
            <ul class="w-full space-x-2 overflow-x-auto whitespace-nowrap">
                <li v-for="(image_url, id) in props.images_url" :key="id" class="inline-block h-48">
                    <img @click="zoom(image_url)" :src="image_url" alt="Game image" class="object-contain h-full rounded">
                </li>
            </ul>
        </div>
    </div>
</template>