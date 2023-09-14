import axios, { AxiosError } from "axios";
import logger from "./logger";  // Winston logger

// Function to implement retry mechanism
// NOTE: If necessary to meet more explicit requirements, this function could be replaced with a more 
//  elegant exponential backoff algorithm or a circuit breaker algorithm. 
export async function tryRequest(requestFunc: () => Promise<any>, retries = 3): Promise<any> {
    while (retries > 0) {
        try {
            const response = await requestFunc();
            logger.log('info', `Request successful.`)
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 500) {
                retries -= 1;
                if (retries === 0) throw error;
            } else if (axiosError.response && axiosError.response.status === 403) {
                logger.error(`You do not have the required permissions to make this request.`);
                throw error;
            } else if (axiosError.response && axiosError.response.status === 404) {
                logger.error(`You have requested a resource that does not exist.`);
                throw error;
            } else if (axiosError.response && axiosError.response.status === 429) {
                logger.error(`You've exceeded your limit for your API key.`);
                throw error;
            } else {
                logger.error(`An unknown error has occurred.`);
                throw error;
            }
        }
    }
}
