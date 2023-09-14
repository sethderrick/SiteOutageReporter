// API-related functions for the application

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
