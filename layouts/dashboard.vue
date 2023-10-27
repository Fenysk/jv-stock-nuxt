<script setup>
import { useStore } from "~/store/store";
const store = useStore();
</script>
<template>
    <div class="DashboardLayout">
        <CommonHeader />
        <DashboardHeader />
        <slot />
    </div>
</template>
