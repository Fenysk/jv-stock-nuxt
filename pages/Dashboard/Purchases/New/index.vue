<script setup>
definePageMeta({
    layout: "dashboard",
    middleware: ["auth"],
});

const { getAllGames } = useGames();
const games = ref([]);

const fetchGames = async (search) => {
    games.value = await getAllGames(search);
    newPurchase.value.game_id = games.value[0].id;
};

onMounted(async () => {
    await fetchGames();
});

const suggestedContent = ref([
    "Boite",
    "Notice",
    "Cartouche",
    "CD",
    "Code VIP",
    "Figurine",
    "Poster",
]);

const contentInput = ref("");

const addContent = (content) => {
    newPurchase.value.content.push(content);
    suggestedContent.value = suggestedContent.value.filter(
        (suggested) => suggested !== content
    );
    contentInput.value = "";
};

const removeContent = (content) => {
    newPurchase.value.content = newPurchase.value.content.filter(
        (c) => c !== content
    );
    suggestedContent.value.push(content);
};

const newPurchase = ref({
    game_id: "",
    purchased_price: null,
    estimated_price: null,
    origin: "",
    state: "Bon état",
    content: [],
});

const { createPurchase } = usePurchases();
const handleCreatePurchase = async () => {
    try {
        await createPurchase(newPurchase.value);
        alert("Achat ajouté !");
        navigateTo("/dashboard/purchases");
    } catch (error) {
        alert(error.response.data.message);
    }
};
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Nouvel ajout en stock</h1>

        <form @submit.prevent="handleCreatePurchase">
            <div class="mt-4">
                <label for="name">Jeu</label>
                <div class="flex gap-4">
                    <input
                        @keyup="fetchGames($event.target.value)"
                        type="text"
                        placeholder="Rechercher un jeu"
                        class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-fit"
                    />
                    <select
                        v-model="newPurchase.game_id"
                        class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                        required
                    >
                        <option
                            v-for="game in games"
                            :key="game.id"
                            :value="game.id"
                            :selected="game.id === newPurchase.game_id"
                        >
                            {{ game.name }} ({{ game.console }})
                        </option>
                    </select>
                </div>
            </div>

            <div class="mt-4">
                <label for="purchased_price">Prix d'achat</label>
                <input
                    v-model="newPurchase.purchased_price"
                    type="number"
                    min="0"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="10 €"
                    required
                />
            </div>

            <div class="mt-4">
                <label for="estimated_price">Prix estimé</label>
                <input
                    v-model="newPurchase.estimated_price"
                    type="number"
                    min="0"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="25 €"
                    required
                />
            </div>

            <div class="mt-4">
                <label for="origin">Origine</label>
                <input
                    v-model="newPurchase.origin"
                    type="text"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Vide grenier"
                    required
                />
            </div>

            <div class="mt-4">
                <label for="state">État</label>
                <select
                    v-model="newPurchase.state"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    required
                >
                    <option value="Neuf">Neuf</option>
                    <option value="Très bon état">Très bon état</option>
                    <option value="Bon état">Bon état</option>
                    <option value="État Moyen">État moyen</option>
                    <option value="Mauvais état">Mauvais état</option>
                    <option value="Pour pièces">Pour pièces</option>
                </select>
            </div>

            <div class="mt-4">
                <label for="content">Contenu</label>
                <ul class="flex gap-2 mt-2">
                    <li
                        v-for="(content, index) in suggestedContent"
                        :key="index"
                    >
                        <span
                            @click="addContent(content)"
                            class="px-2 py-1 text-sm bg-orange-200 border border-orange-300 text-orange-900 rounded-lg cursor-pointer"
                        >
                            {{ content }}
                        </span>
                    </li>
                </ul>
                <div class="flex gap-2 mt-2 items-center">
                    <input v-model="contentInput" type="text" />
                    <button @click="addContent(contentInput)" type="button">
                        Ajouter
                    </button>
                </div>
                <ul class="flex gap-2 mt-2">
                    <li
                        v-for="(content, index) in newPurchase.content"
                        :key="index"
                    >
                        <span
                            @click="removeContent(content)"
                            class="px-2 py-1 text-sm border border-orange-300 bg-orange-900 text-white rounded-lg cursor-pointer"
                        >
                            {{ content }}
                        </span>
                    </li>
                </ul>
            </div>

            <div>
                <button
                    type="submit"
                    class="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg float-right"
                >
                    Ajouter à la collection
                </button>
            </div>
        </form>
    </main>
</template>
