<script setup>
const { login, register } = useAuth();

import { useStore } from "~/store/store";
const store = useStore();

const formData = ref({
    username: "",
    email: "",
    password: "",
});

const showPassword = ref(false);

const loading = ref(false);
const handleSubmit = async () => {
    loading.value = true;
    const { username, email, password } = formData.value;

    try {
        if (mode.value === "register") {
            await register(username, email, password);
            return;
        }

        await login(email, password);
    } catch (error) {
        loading.value = false;
    }
};

const mode = ref("login");
const switchMode = () => {
    mode.value = mode.value === "login" ? "register" : "login";
};
</script>

<template>
    <main class="container px-2 py-8 mx-auto">
        <form @submit.prevent="handleSubmit" class="max-w-lg">
            <h1 class="mb-0">Bonjour,</h1>
            <p class="text-lg mb-4">
                Merci de renseigner les informations demandées pour vous
                connecter.
            </p>

            <div
                id="Username"
                class="flex flex-col gap-2"
                v-if="mode === 'register'"
            >
                <label for="username">Nom d'utilisateur</label>
                <input v-model="formData.username" type="text" />
            </div>

            <div id="Email" class="flex flex-col gap-2">
                <label for="email">Email</label>
                <input v-model="formData.email" type="email" />
            </div>

            <div id="Password" class="flex flex-col gap-2">
                <label for="password">Mot de passe</label>
                <input
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                />
                <div class="flex items-center gap-4 mt-2">
                    <input
                        v-model="showPassword"
                        type="checkbox"
                        id="showPassword"
                        class="block w-6 h-6"
                    />
                    <label for="showPassword">Afficher le mot de passe</label>
                </div>
            </div>

            <button type="submit" v-if="!loading" class="group">
                {{ mode === "login" ? "Se connecter" : "S'inscrire" }}
                <IconsArrowRight
                    class="inline ml-2 text-xl group-hover:translate-x-1 transition"
                />
            </button>
            <button type="submit" disabled v-else>
                {{
                    mode === "login"
                        ? "Connexion en cours..."
                        : "Inscription en cours..."
                }}
            </button>

            <p>
                {{
                    mode === "login"
                        ? "Vous n'avez pas de compte ?"
                        : "J'ai déjà un compte."
                }}

                <button @click.prevent="switchMode" class="button--secondary">
                    {{
                        mode === "login"
                            ? "Créer un compte"
                            : "Je souhaite me connecter"
                    }}
                </button>
            </p>
        </form>
    </main>
</template>
