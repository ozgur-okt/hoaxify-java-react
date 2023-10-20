import axios from "axios";
import { i18nInstance } from "../../locales";

export const signUp = (user) => {
    return axios.post("/api/v1/users", user, {
        headers: {
            "Accept-Language": i18nInstance.language
        }
    });
}