<script setup>
import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
});
</script>

<template>
    <div>
        <h1>Dashboard</h1>

        <h2>User</h2>
        <pre>{{ store.user }}</pre>
    </div>
</template>
