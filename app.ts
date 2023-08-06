import axios, { AxiosError } from "axios";
require('dotenv').config();

const BASE_URL = "https://api.krakenflex.systems/interview-tests-mock-api/v1/";
const API_KEY = process.env.API_KEY; // Pull API key from environment variables

// Function to implement retry mechanism
// NOTE: If necessary to meet more explicit requirements, this function could be replaced with a more 
//  elegant exponential backoff algorithm or a circuit breaker algorithm. 
export async function tryRequest(requestFunc: () => Promise<any>, retries = 3): Promise<any> {
    while (retries > 0) {
        try {
            const response = await requestFunc();
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 500) {
                retries -= 1;
                if (retries === 0) throw error;
            } else if (axiosError.response && axiosError.response.status === 403) {
                console.log("You do not have the required permissions to make this request.");
                throw error;
            } else if (axiosError.response && axiosError.response.status === 404) {
                console.log("You have requested a resource that does not exist.");
                throw error;
            } else if (axiosError.response && axiosError.response.status === 429) {
                console.log("You've exceeded your limit for your API key.");
                throw error;
            } else {
                console.log("An unknown error has occurred.");
                throw error;
            }
        }
    }
}

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

export async function main() {
    try {
        const outages = await get("outages");
        const siteInfo = await get(`site-info/norwich-pear-tree`);

        const filteredOutages = outages
            .filter((o: any) => new Date(o.begin) >= new Date("2022-01-01T00:00:00.000Z"));

        const outagesToReport = filteredOutages.filter(outage =>
            siteInfo.devices.some(device => device.id === outage.id)
        ).map(outage => {
            const matchingDevice = siteInfo.devices.find(device => device.id === outage.id);
            return { ...outage, name: matchingDevice?.name };
        });
        const postResult = await post("site-outages/norwich-pear-tree", outagesToReport);
    } catch (error) {
        console.error(error);
    }
}

main();
