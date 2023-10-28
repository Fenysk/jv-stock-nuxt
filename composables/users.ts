import { useStore } from "~/store/store";
import axios from "axios";

export const useUsers = () => {
    const store = useStore();
    const API_URL = useRuntimeConfig().public.API_URL;

    const getAllUsers = async (search?: string) => {
        try {
            const response = await axios.get(`${API_URL}/user/get/all`, {
                params: {
                    name: search,
                },
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const users = response.data;

            return users;
        } catch (error) {
            throw error;
        }
    };

    const getUserById = async (id: number) => {
        try {
            const response = await axios.get(`${API_URL}/user/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const user = response.data;

            return user;
        } catch (error) {
            throw error;
        }
    };

    const getMyAccount = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/get/me`, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                },
            });
            const user = response.data;

            return user;
        } catch (error) {
            throw error;
        }
    };

    const updateUser = async (id: number, data: any) => {
        try {
            const response = await axios.put(
                `${API_URL}/user/update/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const updatedUser = response.data;
            return updatedUser;
        } catch (error) {
            throw error;
        }
    };

    const updateMyAccount = async (data: any) => {
        try {
            const response = await axios.put(
                `${API_URL}/user/update/me`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const updatedUser = response.data;
            return updatedUser;
        } catch (error) {
            throw error;
        }
    };

    const updateMyPassword = async (data: any) => {
        try {
            const response = await axios.put(
                `${API_URL}/user/update/me/password`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const updatedUser = response.data;
            return updatedUser;
        } catch (error) {
            throw error;
        }
    };

    const deleteUser = async (id: number) => {
        try {
            const response = await axios.delete(
                `${API_URL}/user/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const deletedUser = response.data;
            return deletedUser;
        } catch (error) {
            throw error;
        }
    };

    const deleteMyAccount = async () => {
        try {
            const response = await axios.delete(
                `${API_URL}/user/delete/me`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const deletedUser = response.data;
            return deletedUser;
        } catch (error) {
            throw error;
        }
    };

    return {
        getAllUsers,
        getUserById,
        getMyAccount,
        updateUser,
        updateMyAccount,
        updateMyPassword,
        deleteUser,
        deleteMyAccount,
    };
};
