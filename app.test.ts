
import axios from "axios";
import { tryRequest, get, post, main } from "./app";

jest.mock('axios');  // Mock the axios module for testing

describe("tryRequest function", () => {
    it("should retry the request on 500 error", async () => {
        const mockRequest = jest.fn().mockRejectedValueOnce({ response: { status: 500 } })
            .mockResolvedValueOnce({ data: "success" });
        const response = await tryRequest(mockRequest);
        expect(response).toBe("success");
        expect(mockRequest).toHaveBeenCalledTimes(2);
    });

    it("should throw an error on 403", async () => {
        const mockRequest = jest.fn().mockRejectedValue({ response: { status: 403 } });
        await expect(tryRequest(mockRequest)).rejects.toThrow();
    });

    it("should throw an error on 404", async () => {
        const mockRequest = jest.fn().mockRejectedValue({ response: { status: 404 } });
        await expect(tryRequest(mockRequest)).rejects.toThrow();
    });

    it("should throw an error on 429", async () => {
        const mockRequest = jest.fn().mockRejectedValue({ response: { status: 429 } });
        await expect(tryRequest(mockRequest)).rejects.toThrow();
    });

    it("should throw an unknown error", async () => {
        const mockRequest = jest.fn().mockRejectedValue({});
        await expect(tryRequest(mockRequest)).rejects.toThrow("An unknown error has occurred.");
    });
});

describe("API request functions", () => {
    it("should make a GET request with the correct endpoint and headers", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: "success" });
        const response = await get("test-endpoint");
        expect(axios.get).toHaveBeenCalledWith("https://api.krakenflex.systems/interview-tests-mock-api/v1/test-endpoint", { headers: { 'x-api-key': process.env.API_KEY } });
        expect(response).toBe("success");
    });

    it("should make a POST request with the correct endpoint, data, and headers", async () => {
        const testData = { key: "value" };
        (axios.post as jest.Mock).mockResolvedValue({ data: "success" });
        const response = await post("test-endpoint", testData);
        expect(axios.post).toHaveBeenCalledWith("https://api.krakenflex.systems/interview-tests-mock-api/v1/test-endpoint", testData, { headers: { 'x-api-key': process.env.API_KEY } });
        expect(response).toBe("success");
    });
});

describe("main function", () => {
    it("should filter outages by date correctly", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{ begin: "2022-01-01T00:00:00.000Z" }, { begin: "2021-12-31T23:59:59.999Z" }] })
            .mockResolvedValueOnce({ data: { devices: [] } });
        await main();
        expect(axios.post).toHaveBeenCalledWith(expect.anything(), [{ begin: "2022-01-01T00:00:00.000Z" }]);
    });

    it("should report only outages related to specific site devices", async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] })
            .mockResolvedValueOnce({ data: { devices: [{ id: 1 }] } });
        await main();
        expect(axios.post).toHaveBeenCalledWith(expect.anything(), [{ id: 1 }]);
    });

    // ... (additional tests for main function's logic)
});

