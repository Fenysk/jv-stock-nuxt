import { useStore } from "~/store/store";
import axios from "axios";

export const usePurchases = () => {
    const store = useStore();
    const API_URL = useRuntimeConfig().public.API_URL;

    const getAllPurchases = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/purchase/get/all`, {
                params: {
                    name: search,
                },
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const purchases = response.data;

            return purchases;
        } catch (error) {
            throw error;
        }
    };

    const getMyPurchases = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/purchase/get/mine`, {
                params: {
                    name: search,
                },
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const purchases = response.data;

            return purchases;
        } catch (error) {
            throw error;
        }
    };

    const getMySoldedPurchases = async (search?: string) => {
        try {
            const response = await axios.get(
                `${API_URL}/purchase/get/mine/solded`,
                {
                    params: {
                        name: search,
                    },
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );
            const purchases = response.data;

            return purchases;
        } catch (error) {
            throw error;
        }
    };

    const getPurchaseById = async (id: number) => {
        try {
            const response = await axios.get(`${API_URL}/purchase/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const purchase = response.data;

            return purchase;
        } catch (error) {
            throw error;
        }
    };

    const createPurchase = async (purchase: any) => {
        try {
            const response = await axios.post(
                `${API_URL}/purchase/create`,
                purchase,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const createdPurchase = response.data;
            return createdPurchase;
        } catch (error) {
            throw error;
        }
    };

    const updatePurchase = async (id: number, data: any) => {
        try {
            const response = await axios.put(
                `${API_URL}/purchase/update/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const updatedPurchase = response.data;
            return updatedPurchase;
        } catch (error) {
            throw error;
        }
    };

    const deletePurchase = async (id: number) => {
        try {
            const response = await axios.delete(
                `${API_URL}/purchase/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const deletedPurchase = response.data;
            return deletedPurchase;
        } catch (error) {
            throw error;
        }
    };

    return {
        getAllPurchases,
        getMyPurchases,
        getMySoldedPurchases,
        getPurchaseById,
        createPurchase,
        updatePurchase,
        deletePurchase,
    };
};
