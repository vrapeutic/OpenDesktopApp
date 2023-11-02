import axios from "axios";
import { config } from "@renderer/config";

console.log(config);

export const api = axios.create({ baseURL: config.apiURL });

export function setApiToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearApiToken() {
    delete api.defaults.headers.common.Authorization;
}
