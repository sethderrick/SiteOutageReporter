import { tryRequest } from "../utils/utils";
import axios, { AxiosError } from "axios";
import { BASE_URL, API_KEY } from "../config/config";

export async function get(endpoint: string) {
    return tryRequest(() => axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
            'x-api-key': API_KEY,
        },
    }));
}

export async function post(endpoint: string, data: any) {
    return tryRequest(() => axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: {
            'x-api-key': API_KEY,
        },
    }));
}
