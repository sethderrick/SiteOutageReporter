// Required dependencies
import axios, { AxiosError } from "axios";

// Constants
const BASE_URL = "https://api.krakenflex.systems/interview-tests-mock-api/v1/";
const API_KEY = process.env.API_KEY; // Pull API key from environment variables

// Function to implement retry mechanism
// NOTE: This function could be replaced with a more elegant exponential backoff algorithm
//      or a circuit breaker pattern 
async function tryRequest(requestFunc: () => Promise<any>, retries = 3): Promise<any> {
    while (retries > 0) {
        try {
            const response = await requestFunc();
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 500) {
                retries -= 1;
                if (retries === 0) throw error;
            } else {
                throw error;
            }
        }
    }
}

async function get(endpoint: string) {
    return tryRequest(() => axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
            'API-Key': API_KEY,
        },
    }));
}

async function post(endpoint: string, data: any) {
    return tryRequest(() => axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: {
            'API-Key': API_KEY,
        },
    }));
}

async function main() {
    try {
        const outages = await get("outages");
        const siteInfo = await get(`site-info/norwich-pear-tree`);

        const filteredOutages = outages
            .filter((o: any) => new Date(o.startedAt) >= new Date("2022-01-01T00:00:00.000Z") && siteInfo.devices.includes(o.deviceId))
            .map((o: any) => ({
                ...o,
                deviceName: siteInfo.devices.find((d: any) => d.id === o.deviceId).displayName,
            }));

        await post("site-outages/norwich-pear-tree", filteredOutages);
    } catch (error) {
        console.error(error);
    }
}

main();
