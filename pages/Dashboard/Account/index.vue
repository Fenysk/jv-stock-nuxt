<script setup>
const { getMyAccount, updateMyAccount, deleteMyAccount, updateMyPassword } =
    useUsers();
const { uploadImage } = useUpload();

import { useStore } from "~/store/store";
const store = useStore();

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
});

const formAvatar_url = ref(store.user.avatar_url);
const formUsername = ref(store.user.username);
const formEmail = ref(store.user.email);
const formPassword = ref("");
const formPassword_confirmation = ref("");

const uploadAvatar = async (event) => {
    try {
        formAvatar_url.value = await uploadImage(event.target.files[0]);
    } catch (error) {
        alert(error);
    }
};

const handleUpdateMyProfile = async () => {
    try {
        const response = await updateMyAccount({
            username: formUsername.value,
            avatar_url: formAvatar_url.value,
        });

        window.location.reload();
    } catch (error) {
        alert(error.response.data.message);
    }
};

const handleUpdateMyInformations = async () => {
    try {
        const response = await updateMyAccount({
            email: formEmail.value,
        });

        window.location.reload();
    } catch (error) {
        alert(error.response.data.message);
    }
};

const handleUpdateMyPassword = async () => {
    if (formPassword.value.length < 1) {
        return;
    }

    if (formPassword.value !== formPassword_confirmation.value) {
        alert("Password and password confirmation must be the same");
        return;
    }

    try {
        const response = await updateMyPassword({
            password: formPassword.value,
        });

        window.location.reload();
    } catch (error) {
        alert(error.response.data.message);
    }
};

const disconnect = () => {
    store.removeToken();
    store.removeUser();
    navigateTo("/");
};
</script>

<template>
    <main class="container mx-auto px-2 py-8">
        <form class="w-full">
            <h1>Setting</h1>

            <div>
                <h2>Profile</h2>

                <div>
                    <label for="username">Roles</label>
                    <ul class="flex gap-4">
                        <li
                            v-for="(role, index) in store.user.roles"
                            :key="index"
                            class="bg-orange-200 text-orange-900 font-semibold px-3 py-1 rounded-full"
                        >
                            {{ role }}
                        </li>
                    </ul>
                </div>

                <div class="flex flex-col gap-1 mt-4">
                    <label for="username">Username</label>
                    <input v-model="formUsername" type="text" />
                </div>

                <div class="flex flex-col gap-1 mt-4">
                    <label for="avatar">Avatar</label>
                    <img
                        :src="formAvatar_url"
                        alt="avatar"
                        class="aspect-square w-24 object-cover rounded-full my-2"
                    />
                    <input type="file" @change="uploadAvatar($event)" />
                </div>

                <div class="mt-4">
                    <button @click.prevent="handleUpdateMyProfile" class="w-fit">
                        Save profile
                    </button>
                </div>
            </div>

            <div>
                <h2>Informations</h2>

                <div class="flex flex-col gap-1">
                    <label for="email">Email</label>
                    <input v-model="formEmail" type="email" />
                </div>

                <div class="mt-4">
                    <button
                        @click.prevent="handleUpdateMyInformations"
                        class="w-fit"
                    >
                        Save informations
                    </button>
                </div>
            </div>

            <div>
                <h2>Password</h2>

                <div class="flex flex-col gap-1">
                    <label for="password">Password</label>
                    <input v-model="formPassword" type="password" />
                </div>

                <div class="flex flex-col gap-1 mt-4">
                    <label for="password_confirmation"
                        >Password confirmation</label
                    >
                    <input
                        v-model="formPassword_confirmation"
                        type="password"
                    />
                </div>

                <div class="mt-4">
                    <button @click.prevent="handleUpdateMyPassword" class="w-fit">
                        Save password
                    </button>
                </div>
            </div>
        </form>

        <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8"
            @click.prevent="disconnect"
        >
            Logout
        </button>
    </main>
</template>
