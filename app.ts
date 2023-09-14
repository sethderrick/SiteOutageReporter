require('dotenv').config();
import axios, { AxiosError } from "axios";
import { BASE_URL, API_KEY } from "./config";
import { tryRequest } from "./utils";
import { get, post } from "./api";

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


/* 

Did they solve the problem?
    - Yes, it works.
- Was the submission easy to read/understand?
    - Yes, it is easy to understand but everything is in a single file.
- Adequate unit tests?
    - No. He mostly tested his utility function and not the actual business logic.
- Integration tests?
    - No.
- Does it run as per their instructions?
    - No. I had to tweak the `tsconfig.json` file.
- Type safety where appropriate?
    - No. He used the `any` type mostly.
- Error Handling?
    - Yes, but it is in the retry function.
- Retries?
    - Yes. created his own retry function.
- Did they check the API Key into the repo?
    - No, it is using env variables.
- Did they document their thought process?
    - No. There is only setup instructions in the README.
- Have they outlined future improvements?
    - Yes. He mentioned a backoff algorithm or a circuit breaker algorithm in his retry utility function as alternatives.
- CI (Github Actions)
    - No.

- Overall notes:

- He put everything in a single file without any abstractions.
- There are no proper unit tests. He tested his own utility function, but he didn’t include any tests for the actual business logic.
- Not using TypeScript properly. He used the `any` type most of the time.
- The app didn’t run as per his instructions. He used `strict: true` flag in the `tsconfig.json`, but he has the `any` type all over the place, so it throws errors while compiling.
- `node_modules` and compiled JS files are not ignored in the `.gitignore`.
- There are no scripts for building the app in the `package.json`. He mentions using `tsc` by installing it globally to build the app in the `README`, even though he included `typescript` as a dev dependency.
- He didn’t use `Promise.all` while retrieving site details and outages.
- The error handling logic is in the retry utility function.
- There is no error handling for the main function.
- There are no logs, making it difficult to tell what is going on when you run the app.
- He didn’t include any integration tests.

*/