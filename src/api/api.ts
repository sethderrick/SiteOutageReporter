import { tryRequest } from "../utils/utils";
import axios, { AxiosError } from "axios";
import { BASE_URL, API_KEY } from "../config/config";
import logger from "../utils/logger"; // Winston logger

export async function get(endpoint: string) {
    try {
        return await tryRequest(() => axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                'x-api-key': API_KEY,
            },
        }));
    } catch (error) {
        logger.error(`Error in GET request to endpoint ${endpoint}: ${error}`);
        throw error;
    }

}

export async function post(endpoint: string, data: any) {
    try {
        return await tryRequest(() => axios.post(`${BASE_URL}${endpoint}`, data, {
            headers: {
                'x-api-key': API_KEY,
            },
        }));
    } catch (error) {
        logger.error(`Error in POST request to endpoint ${endpoint}: ${error}`);
        throw error;
    }

}
