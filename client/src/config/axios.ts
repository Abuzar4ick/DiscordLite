import axios from "axios";
import { ENV } from "./env";

export const axiosInstance = axios.create({
    baseURL: ENV.CLIENT_URL,
    headers: { "Content-Type": "application/json" }
});
