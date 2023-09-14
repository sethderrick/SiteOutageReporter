import axios, { AxiosError } from 'axios';
import { tryRequest } from '../../src/utils/utils';

// Mocking axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Utility functions', () => {
    afterEach(() => {
        jest.clearAllMocks();  // Clear any mocked calls after each test
    });

    describe('tryRequest function', () => {
        it('should return data on successful request', async () => {
            const mockData = { foo: 'bar' };
            const mockRequest = jest.fn().mockResolvedValueOnce({ data: mockData });

            const result = await tryRequest(mockRequest);
            expect(result).toEqual(mockData);
        });

        it('should retry on 500 error and eventually throw', async () => {
            const mockError: AxiosError = {
                isAxiosError: true,
                config: {
                    headers: {} as any, // May need 'Content-Type': 'application/json' here
                    url: "",
                    method: "get"
                },
                toJSON: jest.fn(),
                name: '',
                message: '',
                response: { status: 500, data: '', statusText: '', headers: {}, config: { headers: {} as any } }
            };
            const mockRequest = jest.fn()
                .mockRejectedValueOnce(mockError)
                .mockRejectedValueOnce(mockError)
                .mockRejectedValueOnce(mockError);

            await expect(tryRequest(mockRequest)).rejects.toThrow();
            expect(mockRequest).toHaveBeenCalledTimes(3);  // Ensure retries happened
        });

        // TODO: Add tests for other error scenarios (403, 404, 429, etc.)
    });
});
