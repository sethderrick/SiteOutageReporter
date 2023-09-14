import axios from 'axios';
import { get, post } from '../../src/api/api';

// Mocking axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API functions', () => {
    afterEach(() => {
        jest.clearAllMocks();  // Clear any mocked calls after each test
    });

    describe('get function', () => {
        it('should return data on successful API call', async () => {
            const mockData = { foo: 'bar' };
            mockedAxios.get.mockResolvedValueOnce({ data: mockData });

            const result = await get('some-endpoint');
            expect(result).toEqual(mockData);
        });

        // TODO: Add tests for error scenarios (403, 404, 429, 500, etc.)
    });

    describe('post function', () => {
        it('should return data on successful API post', async () => {
            const mockData = { success: true };
            mockedAxios.post.mockResolvedValueOnce({ data: mockData });

            const result = await post('some-endpoint', {});
            expect(result).toEqual(mockData);
        });

        // TODO: Add tests for error scenarios (403, 404, 429, 500, etc.)
    });
});
