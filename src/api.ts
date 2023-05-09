import axios from "axios";
import { config } from "@renderer/config";

export const api = axios.create({ baseURL: config.apiURL });
