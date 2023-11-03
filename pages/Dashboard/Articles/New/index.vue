<script setup>
definePageMeta({
    layout: "dashboard",
    middleware: ["auth"],
});

const { getMyPurchases } = usePurchases();
const myPurchases = ref([]);

const fetchPurchases = async (search) => {
    const purchases = await getMyPurchases(search);
    myPurchases.value = purchases.filter((purchase) => purchase.Article === null);
    newArticle.value.purchase_id = myPurchases.value[0].id;
};

onMounted(async () => {
    await fetchPurchases();
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

const newArticle = ref({
    purchase_id: null,
    title: "",
    description: "",
    price: null,
    images_url: [],
});

const { createArticle } = useArticles();
const handleCreateArticle = async () => {
    try {
        await createArticle(newArticle.value);
        alert("Achat ajouté !");
        navigateTo("/dashboard/articles");
    } catch (error) {
        alert(error.response.data.message);
    }
};
</script>

<template>
    <main class="py-8 container mx-auto">
        <h1>Nouvel article</h1>

        <form @submit.prevent="handleCreateArticle">
            <div class="mt-4">
                <label for="name">Jeu</label>
                <div class="flex gap-4">
                    <input
                        @keyup="fetchPurchases($event.target.value)"
                        type="text"
                        placeholder="Rechercher un jeu"
                        class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-fit"
                    />
                    <select
                        v-model="newArticle.purchase_id"
                        class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                        required
                    >
                        <option
                            v-for="purchase in myPurchases"
                            :key="purchase.id"
                            :value="purchase.id"
                            :selected="purchase.id === newArticle.purchase_id"
                        >
                            {{ purchase.Game.name }} ({{ purchase.Game.console }})
                        </option>
                    </select>
                </div>
            </div>

            <div class="mt-4">
                <label for="title">Titre</label>
                <input
                    v-model="newArticle.title"
                    name="title"
                    type="text"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="Super Mario Bros"
                    required
                />
            </div>
            
            <div class="mt-4">
                <label for="description">Description</label>
                <textarea
                    name="description"
                    v-model="newArticle.description"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="La cartouche est un peu abîmée mais le jeu fonctionne parfaitement."
                    required
                ></textarea>
            </div>
            
            <div class="mt-4">
                <label for="price">Prix</label>
                <input
                    name="price"
                    v-model="newArticle.price"
                    type="number"
                    class="p-2 border border-orange-200 placeholder:text-gray-600 rounded-lg w-full"
                    placeholder="20"
                    required
                />
            </div>

            <div>
                <button
                    type="submit"
                    class="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg float-right"
                >
                    Mettre en vente
                </button>
            </div>
        </form>
    </main>
</template>
