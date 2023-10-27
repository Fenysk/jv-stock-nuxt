import { useStore } from "~/store/store";
import axios from "axios";

export const useGames = () => {
    const store = useStore();
    const API_URL = useRuntimeConfig().public.API_URL;

    const getAllGames = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/game/get/all`, {
                params: {
                    name: search,
                },
            });
            const games = response.data;

            return games;
        } catch (error) {
            throw error;
        }
    };

    const getGameById = async (id: number) => {
        try {
            const response = await axios.get(`${API_URL}/game/get/${id}`);
            const game = response.data;

            return game;
        } catch (error) {
            throw error;
        }
    };

    const createGame = async (game: any) => {
        try {
            const response = await axios.post(`${API_URL}/game/create`, game, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });

            const createdGame = response.data;
            return createdGame;
        } catch (error) {
            throw error;
        }
    };

    const updateGame = async (id: number, data: any) => {
        try {
            const response = await axios.put(
                `${API_URL}/game/update/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const updatedGame = response.data;
            return updatedGame;
        } catch (error) {
            throw error;
        }
    };

    const deleteGame = async (id: number) => {
        try {
            const response = await axios.delete(
                `${API_URL}/game/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const deletedGame = response.data;
            return deletedGame;
        } catch (error) {
            throw error;
        }
    };

    return {
        getAllGames,
        getGameById,
        createGame,
        updateGame,
        deleteGame,
    };
};
