import { useStore } from "~/store/store";
import axios from "axios";

export const useUpload = () => {
    const store = useStore();
    const API_URL = useRuntimeConfig().public.API_URL;

    const uploadImage = async (image: any) => {
        try {
            const formData = new FormData();
            formData.append("file", image);

            const response = await axios.post(
                `${API_URL}/files/upload/image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                }
            );

            const image_url = API_URL + '/' + response.data.path;
            return image_url;
        } catch (error) {
            throw error;
        }
    };

    return {
        uploadImage,
    };
};
