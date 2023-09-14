import { tryRequest } from "./utils/utils";
import { get, post } from "./api/api";
import { Outage } from './models/Outage';
import { Device } from './models/Device';

interface SiteInfo {
    id: string;         // Unique identifier for the site
    name?: string;      // Optional name of the site
    devices: Device[];  // List of associated devices
}

// Wrap each request with its own error handling function
async function fetchOutages(): Promise<Outage[]> {
    try {
        return await tryRequest(() => get("outages"));
    } catch (error) {
        console.error("Error fetching outages:", error);
        throw error;
    }
}

async function fetchSiteInfo(): Promise<SiteInfo> {
    try {
        return await tryRequest(() => get("site-info/norwich-pear-tree"));
    } catch (error) {
        console.error("Error fetching site info:", error);
        throw error;
    }
}

export async function main() {
    try {
        // Start both get requests simultaneously with individual error handling
        const [outages, siteInfo] = await Promise.all([fetchOutages(), fetchSiteInfo()]);

        const filteredOutages = outages
            .filter(o => new Date(o.begin) >= new Date("2022-01-01T00:00:00.000Z"));

        const outagesToReport = filteredOutages.filter(outage =>
            siteInfo.devices.some(device => device.id === outage.id)
        ).map(outage => {
            const matchingDevice = siteInfo.devices.find(device => device.id === outage.id);
            return { ...outage, name: matchingDevice?.name };
        });

        const postResult = await post("site-outages/norwich-pear-tree", outagesToReport);
    } catch (error) {
        console.error("An error occurred in main function:", error);
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