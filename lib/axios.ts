import Axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

function authRequestInterceptor(config: AxiosRequestConfig) {
    const token = getCookie("token");
    if (token && config.headers) {
        config.headers.authorization = `Bearer ${token}`;
    }
    if (config.headers) config.headers.Accept = "application/json";
    return config;
}
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api";
export const api = Axios.create({
    baseURL: BASE_API_URL,
});

api.interceptors.request.use(authRequestInterceptor as never);
