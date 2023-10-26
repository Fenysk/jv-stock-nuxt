<script setup>
const { login, register } = useAuth();

import { useStore } from "~/store/store";
const store = useStore();

const formData = ref({
    username: "Admin",
    email: "admin@test.test",
    password: "Admin",
});

const handleSubmit = async () => {
    const { username, email, password } = formData.value;

    if (mode.value === "register") {
        await register(username, email, password);
        return;
    }

    await login(email, password);
};

const mode = ref("login");
const switchMode = () => {
    mode.value = mode.value === "login" ? "register" : "login";
};
</script>

<template>
    <main class="container px-2 py-8 mx-auto">
        <form @submit.prevent="handleSubmit">
            <h1 class="text-center">Connexion</h1>

            <div
                id="Username"
                class="flex flex-col gap-2"
                v-if="mode === 'register'"
            >
                <label for="username" class="text-lg">Nom d'utilisateur</label>
                <input v-model="formData.username" type="text" />
            </div>

            <div id="Email" class="flex flex-col gap-2">
                <label for="email" class="text-lg">Email</label>
                <input v-model="formData.email" type="email" />
            </div>

            <div id="Password" class="flex flex-col gap-2">
                <label for="password" class="text-lg">Mot de passe</label>
                <input v-model="formData.password" type="password" />
            </div>

            <div class="flex justify-between gap-4">
                <button @click.prevent="switchMode" class="button--secondary">
                    {{
                        mode === "login"
                            ? "Je n'ai pas de compte"
                            : "J'ai déjà un compte"
                    }}
                </button>
                <button type="submit">
                    {{ mode === "login" ? "Se connecter" : "S'inscrire" }}
                </button>
            </div>
        </form>
    </main>
</template>
