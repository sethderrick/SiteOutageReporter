import { tryRequest } from "./utils/utils";
import { get, post } from "./api/api";
import { Outage } from './models/Outage';
import { Device } from './models/Device';
import logger from "./utils/logger"; // Winston logger

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
        logger.error(`Error fetching outages: ${error}`);
        throw error;
    }
}

async function fetchSiteInfo(siteName: string): Promise<SiteInfo> {
    try {
        return await tryRequest(() => get(`site-info/${siteName}`));
    } catch (error) {
        logger.error(`Error fetching site info: ${error}`);
        throw error;
    }
}

export async function main(siteName: string) {
    try {
        // Start both get requests simultaneously with individual error handling
        const [outages, siteInfo] = await Promise.all([fetchOutages(), fetchSiteInfo(siteName)]);

        const filteredOutages = outages
            .filter(o => new Date(o.begin) >= new Date("2022-01-01T00:00:00.000Z"));

        const outagesToReport = filteredOutages.filter(outage =>
            siteInfo.devices.some(device => device.id === outage.id)
        ).map(outage => {
            const matchingDevice = siteInfo.devices.find(device => device.id === outage.id);
            return { ...outage, name: matchingDevice?.name };
        });

        const postResult = await post(`site-outages/${siteName}`, outagesToReport);
    } catch (error) {
        logger.error(`An error occurred in main function: ${error}`);
    }
}

const siteName = process.argv[2];
if (!siteName) {
    logger.error(`Please provide a site name as an argument.`);
    process.exit(1);
}
main(siteName);
