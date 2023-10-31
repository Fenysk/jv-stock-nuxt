<script setup lang="ts">
const { getGameById, updateGame, deleteGame } = useGames();
const { uploadImage } = useUpload();

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const route = useRoute();
const game_id = route.params.id;

const game = await getGameById(game_id);

const image_url = ref("");

const handleUpdateGame = async (field, data) => {
    try {
        const updatedData = {
            [field]: data,
        };
        await updateGame(game.id, updatedData);
    } catch (error) {
        alert(error.response.data.message);
    }
};

const handleDelete = async () => {
    try {
        if (!confirm(`Voulez-vous vraiment supprimer ${game.name} ?`)) {
            return;
        }
        await deleteGame(game.id);
        alert(`${game.name} a bien été supprimé !`);
        navigateTo("/dashboard/games");
    } catch (error) {
        alert(error.response.data.message);
    }
};

const handleUploadImage = async (file) => {
    try {
        const url = await uploadImage(file);
        await updateGame(game.id, { image_url: url });
        image_url.value = url;
    } catch (error) {
        alert(error.message);
    }
};
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Modifications de {{ game.name }}</h1>

        <form @submit.prevent>
            <h2>Informations du jeu</h2>

            <div class="mt-4">
                <label for="name">Nom du jeu</label>
                <input
                    @blur="
                        handleUpdateGame(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    v-model="game.name"
                    type="text"
                    name="name"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Super Mario Bros."
                />
            </div>

            <div class="mt-4">
                <label for="image_url">Image</label>
                <div class="flex gap-4">
                    <img
                        :src="image_url || game.image_url"
                        class="mt-2 w-32 object-cover"
                    />
                    <input
                        @change="handleUploadImage($event.target.files[0])"
                        type="file"
                        id="image_url"
                        name="image_url"
                        class="p-2 border h-fit border-orange-200 placeholder:text-gray-600 rounded-lg w-full file:cursor-pointer"
                        accept="image/*"
                    />
                </div>
            </div>

            <div class="mt-4">
                <label for="console">Console</label>
                <select
                    @blur="
                        handleUpdateGame(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    v-model="game.console"
                    id="console"
                    name="console"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                >
                    <optgroup label="Nintendo">
                        <option value="NES">NES</option>
                        <option value="SNES">SNES</option>
                        <option value="N64">64</option>
                        <option value="GCN">GameCube</option>
                        <option value="WII">Wii</option>
                        <option value="WIIU">Wii U</option>
                        <option value="SWITCH">Switch</option>
                        <option value="GB">GameBoy</option>
                        <option value="GBC">GameBoy Color</option>
                        <option value="GBA">GameBoy Advance</option>
                        <option value="DS">DS</option>
                        <option value="3DS">3DS</option>
                    </optgroup>
                    <optgroup label="Sony">
                        <option value="PS1">PlayStation</option>
                        <option value="PS2">PlayStation 2</option>
                        <option value="PS3">PlayStation 3</option>
                        <option value="PS4">PlayStation 4</option>
                        <option value="PS5">PlayStation 5</option>
                        <option value="PSP">PlayStation Portable</option>
                        <option value="PSV">PlayStation Vita</option>
                    </optgroup>
                    <optgroup label="Microsoft">
                        <option value="XBOX">Xbox</option>
                        <option value="X360">Xbox 360</option>
                        <option value="XONE">Xbox One</option>
                        <option value="XS">Xbox Series</option>
                    </optgroup>
                </select>
            </div>

            <div class="mt-4">
                <label for="edition">Édition</label>
                <input
                    @blur="
                        handleUpdateGame(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    v-model="game.edition"
                    type="text"
                    id="edition"
                    name="edition"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Standard"
                />
            </div>

            <div class="mt-4">
                <label for="region">Région</label>
                <input
                    @blur="
                        handleUpdateGame(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    v-model="game.region"
                    type="text"
                    id="region"
                    name="region"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="EUR"
                />
            </div>

            <div class="mt-4">
                <label for="released_year">Année de sortie</label>
                <input
                    @blur="
                        handleUpdateGame(
                            $event.target.name,
                            Number($event.target.value)
                        )
                    "
                    v-model="game.released_year"
                    type="number"
                    min="1954"
                    name="released_year"
                    :max="new Date().getFullYear()"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="2005"
                />
            </div>

            <div class="mt-4">
                <label for="barcode_data">Données du code-barres</label>
                <input
                    @blur="
                        handleUpdateGame(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    v-model="game.barcode_data"
                    type="text"
                    id="barcode_data"
                    name="barcode_data"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                />
            </div>

            <div class="mt-4 flex justify-between">
                <NuxtLink
                    :to="'/dashboard/games/' + game.id"
                    class="button--primary flex items-center"
                >
                    Retour
                </NuxtLink>
                <button class="button--danger" @click.prevent="handleDelete">
                    Supprimer {{ game.name }}
                </button>
            </div>
        </form>
    </main>
</template>