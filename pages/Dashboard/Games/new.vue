<script setup>
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

const { createGame } = useGames();
const { uploadImage } = useUpload();

const newGame = ref({
    name: "",
    image_url: "",
    console: "",
    edition: "Standard",
    region: "",
    released_year: 2005,
    barcode_data: "NODATA",
});

const handleCreateGame = async (newGame) => {
    try {
        const createdGame = await createGame(newGame);
        navigateTo("/dashboard/games");
    } catch (error) {
        alert(error.response.data.message);
    }
};

const handleUploadImage = async (file) => {
    try {
        const image_url = await uploadImage(file);
        newGame.value.image_url = image_url;
    } catch (error) {
        alert(error.message);
    }
};
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Nouveau jeu</h1>

        <form @submit.prevent="handleCreateGame(newGame)">
            <h2>Informations du jeu</h2>

            <div class="mt-4">
                <label for="name">Nom du jeu</label>
                <input
                    v-model="newGame.name"
                    type="text"
                    id="name"
                    name="name"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Super Mario Bros."
                    required
                />
            </div>

            <div class="mt-4">
                <label for="image_url">Image</label>
                <div class="flex gap-4">
                    <img
                        v-if="newGame.image_url !== ''"
                        :src="newGame.image_url"
                        class="mt-2 w-32 object-cover"
                    />
                    <input
                        @change="handleUploadImage($event.target.files[0])"
                        type="file"
                        id="image_url"
                        name="image_url"
                        class="p-2 border h-fit border-orange-200 placeholder:text-gray-600 rounded-lg w-full file:cursor-pointer"
                        accept="image/*"
                        required
                    />
                </div>
            </div>

            <div class="mt-4">
                <label for="console">Console</label>
                <select
                    v-model="newGame.console"
                    id="console"
                    name="console"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    required
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
                    v-model="newGame.edition"
                    type="text"
                    id="edition"
                    name="edition"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Standard"
                />
            </div>

            <div class="mt-4">
                <label for="region">Région</label>
                <select
                    v-model="newGame.region"
                    id="region"
                    name="region"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    required
                >
                    <option value="FRA">France</option>
                    <option value="EUR">Europe</option>
                    <option value="JPN">Japon</option>
                    <option value="USA">États-Unis</option>
                    <option value="WLD">Mondial</option>
                </select>
            </div>

            <div class="mt-4">
                <label for="released_year">Année de sortie</label>
                <input
                    v-model="newGame.released_year"
                    type="number"
                    min="1954"
                    :max="new Date().getFullYear()"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="2005"
                />
            </div>

            <div class="mt-4">
                <label for="barcode_data">Données du code-barres</label>
                <input
                    v-model="newGame.barcode_data"
                    type="text"
                    id="barcode_data"
                    name="barcode_data"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    disabled
                />
            </div>

            <div class="mt-4">
                <button type="submit" class="button--primary">
                    Enregistrer {{ newGame.name }} dans la base de données
                </button>
            </div>
        </form>
    </main>
</template>
