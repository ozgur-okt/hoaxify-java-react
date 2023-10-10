import axios from "axios";

export const signUp = (user) => {
    return axios.post("/api/v1/users", user);
}