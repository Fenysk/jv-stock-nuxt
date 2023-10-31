<script setup>
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "admin"],
});

onMounted(async () => {
    await fetchGames();
});

const { getPurchaseById, updatePurchase, deletePurchase } = usePurchases();

const route = useRoute();
const purchase_id = route.params.id;

const purchase = await getPurchaseById(purchase_id);

const { getAllGames } = useGames();
const games = ref([]);

const fetchGames = async (search) => {
    games.value = await getAllGames(search);
    purchase.game_id = games.value[0].id;
};

const suggestedContent = ref([]);
const contentInput = ref("");

const addContent = (content) => {
    purchase.content.push(content);
    suggestedContent.value = suggestedContent.value.filter(
        (suggested) => suggested !== content
    );
    contentInput.value = "";
    handleUpdatePurchase("content", purchase.content)
};

const removeContent = (content) => {
    purchase.content = purchase.content.filter((c) => c !== content);
    suggestedContent.value.push(content);
    handleUpdatePurchase("content", purchase.content)
};

const handleUpdatePurchase = async (field, data) => {
    try {
        const updatedData = {
            [field]: data,
        };
        await updatePurchase(purchase.id, updatedData);
    } catch (error) {
        alert(error.response.data.message);
    }
};

const handleDelete = async () => {
    try {
        if (
            !confirm(
                `Voulez-vous vraiment retirer ${purchase.Game.name} de la collection ?`
            )
        ) {
            return;
        }
        await deletePurchase(purchase.id);
        alert(`${purchase.Game.name} a bien été retiré de la collection !`);
        navigateTo("/dashboard/purchases");
    } catch (error) {
        alert(error.response.data.message);
    }
};
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Modifications de {{ purchase.Game.name }}</h1>

        <form @submit.prevent="handleCreatePurchase">
            <h2>Informations du jeu</h2>
            <div class="mt-4">
                <label for="name">Jeu</label>
                <div class="flex gap-4">
                    <input
                        @keyup="fetchGames($event.target.value)"
                        type="text"
                        placeholder="Rechercher un jeu"
                        class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-fit"
                        :value="purchase.Game.name"
                    />
                    <select
                        @change="
                            handleUpdatePurchase(
                                $event.target.name,
                                $event.target.value
                            )
                        "
                        name="game_id"
                        v-model="purchase.game_id"
                        class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                        required
                    >
                        <option
                            v-for="game in games"
                            :key="game.id"
                            :value="game.id"
                            :selected="game.id === purchase.game_id"
                        >
                            {{ game.name }} ({{ game.console }})
                        </option>
                    </select>
                </div>
            </div>

            <div class="mt-4">
                <label for="purchased_price">Prix d'achat</label>
                <input
                    @blur="
                        handleUpdatePurchase(
                            $event.target.name,
                            Number($event.target.value)
                        )
                    "
                    name="purchased_price"
                    v-model="purchase.purchased_price"
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
                    @blur="
                        handleUpdatePurchase(
                            $event.target.name,
                            Number($event.target.value)
                        )
                    "
                    name="estimated_price"
                    v-model="purchase.estimated_price"
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
                    @blur="
                        handleUpdatePurchase(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    name="origin"
                    v-model="purchase.origin"
                    type="text"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Vide grenier"
                    required
                />
            </div>

            <div class="mt-4">
                <label for="state">État</label>
                <select
                    @change="
                        handleUpdatePurchase(
                            $event.target.name,
                            $event.target.value
                        )
                    "
                    name="state"
                    v-model="purchase.state"
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
                        v-for="(content, index) in purchase.content"
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

            <div class="flex items-center justify-between">
                <NuxtLink
                    :to="'/dashboard/purchases/' + purchase.id"
                    class="button--primary"
                >
                    Retour
                </NuxtLink>
                <button class="button--danger" @click="handleDelete">
                    Supprimer de la collection
                </button>
            </div>
        </form>
    </main>
</template>
