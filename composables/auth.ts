import { useStore } from "~/store/store";
import axios from "axios";

export const useAuth = () => {
    const store = useStore();
    const API_URL = useRuntimeConfig().public.API_URL;

    async function getUser(token) {
        const response = await axios.get(`${API_URL}/user/get/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            store.setToken(response.data.access_token);
            store.setUser(await getUser(store.token));

            navigateTo("/dashboard");
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                username,
                email,
                password,
            });

            store.setToken(response.data.access_token);
            store.setUser(await getUser(store.token));
            
            navigateTo("/dashboard");
        } catch (error) {
            if (error.response.status === 409) {
                alert("User already exists");
            } else {
                alert(error);
            }
        }
    };

    return {
        login,
        register,
    };
};
