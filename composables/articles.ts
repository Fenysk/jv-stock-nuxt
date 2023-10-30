import { useStore } from "~/store/store";
import axios from "axios";

export const useArticles = () => {
    const store = useStore();
    const API_URL = useRuntimeConfig().public.API_URL;

    const getAllAvailableArticles = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/article/get/available`, {
                params: {
                    name: search,
                },
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const articles = response.data;

            return articles;
        } catch (error) {
            throw error;
        }
    };

    const getMyArticles = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/article/get/mine`, {
                params: {
                    name: search,
                },
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const articles = response.data;

            return articles;
        } catch (error) {
            throw error;
        }
    };

    const getMySoldedArticles = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/article/get/mine/solded`, {
                params: {
                    name: search,
                },
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const articles = response.data;

            return articles;
        } catch (error) {
            throw error;
        }
    };

    const getArticleById = async (id: number) => {
        try {
            const response = await axios.get(`${API_URL}/article/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const article = response.data;

            return article;
        } catch (error) {
            throw error;
        }
    };

    const createArticle = async (article: any) => {
        try {
            const response = await axios.post(
                `${API_URL}/article/create`,
                article,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const createdArticle = response.data;
            return createdArticle;
        } catch (error) {
            throw error;
        }
    };

    const updateArticle = async (id: number, data: any) => {
        try {
            const response = await axios.put(
                `${API_URL}/article/update/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const updatedArticle = response.data;
            return updatedArticle;
        } catch (error) {
            throw error;
        }
    };

    const deleteArticle = async (id: number) => {
        try {
            const response = await axios.delete(
                `${API_URL}/article/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const deletedArticle = response.data;
            return deletedArticle;
        } catch (error) {
            throw error;
        }
    };

    return {
        getAllAvailableArticles,
        getMyArticles,
        getMySoldedArticles,
        getArticleById,
        createArticle,
        updateArticle,
        deleteArticle,
    };
};
