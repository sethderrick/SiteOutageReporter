import { tryRequest, get, post } from "./src/app";
import axios, { AxiosError } from "axios";

// Mocking Axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const BASE_URL = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/';
const API_KEY = process.env.API_KEY;

describe('get', () => {

    beforeEach(() => {
        mockedAxios.get.mockReset();
    });

    it('invokes tryRequest with correct axios GET request', async () => {
        const endpoint = '/data';
        const responseData = { message: 'Success' };
        mockedAxios.get.mockResolvedValueOnce({ data: responseData });

        const result = await get(endpoint);
        expect(result).toEqual(responseData);

        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
            headers: {
                'x-api-key': API_KEY,
            },
        });
    });

    it('properly handles errors from tryRequest', async () => {
        const endpoint = '/data';
        mockedAxios.get.mockRejectedValueOnce(new Error('Failed request'));

        await expect(get(endpoint)).rejects.toThrow('Failed request');
    });
});

describe('post', () => {
    const endpoint = '/data';
    const postData = { key: 'value' };

    beforeEach(() => {
        mockedAxios.get.mockReset();
    });

    it('invokes tryRequest with correct axios POST request and data', async () => {
        const responseData = { message: 'Post Success' };
        mockedAxios.post.mockResolvedValueOnce({ data: responseData });

        const result = await post(endpoint, postData);
        expect(result).toEqual(responseData);

        expect(mockedAxios.post).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, postData, {
            headers: {
                'x-api-key': API_KEY,
            },
        });
    });

    it('properly handles errors from tryRequest', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Failed post request'));

        await expect(post(endpoint, postData)).rejects.toThrow('Failed post request');
    });
});

describe("tryRequest", () => {
    let mockRequestFunc: jest.Mock;

    beforeEach(() => {
        mockRequestFunc = jest.fn();
        mockedAxios.get.mockReset();
    });

    it("handles successful request", async () => {
        const data = { message: "Success" };
        mockRequestFunc.mockResolvedValue({ data });

        const result = await tryRequest(mockRequestFunc);
        expect(result).toEqual(data);
    });

    it("retries on 500 error", async () => {
        const error = {
            isAxiosError: true,
            response: { status: 500 }
        };

        mockRequestFunc.mockRejectedValueOnce(error)
            .mockRejectedValueOnce(error)
            .mockRejectedValueOnce(error);

        await expect(tryRequest(mockRequestFunc)).rejects.toEqual(error);
        expect(mockRequestFunc).toHaveBeenCalledTimes(3);
    });

    const errorCodes = [403, 404, 429];
    for (let code of errorCodes) {
        it(`throws immediately on ${code} error`, async () => {
            const error = {
                isAxiosError: true,
                response: { status: code }
            };

            mockRequestFunc.mockRejectedValue(error);
            await expect(tryRequest(mockRequestFunc)).rejects.toEqual(error);
        });
    }

    it("throws on unknown error", async () => {
        const error = {
            isAxiosError: true,
            response: { status: 418 }
        };

        mockRequestFunc.mockRejectedValue(error);
        await expect(tryRequest(mockRequestFunc)).rejects.toEqual(error);
    });
});
