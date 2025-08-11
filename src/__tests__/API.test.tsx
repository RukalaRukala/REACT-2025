import { searchPetsByStatus } from '../components/Search/Search.api';

const mockConsole = jest.spyOn(console, 'error').mockImplementation(() => {});

const mockFetch = jest.fn();
global.fetch = mockFetch;

const testPets = [
  {
    id: 1,
    name: 'Tusik',
    status: 'available' as const,
    category: { id: 1, name: 'Dogs' },
    photoUrls: ['tusik.jpg'],
  },
  {
    id: 2,
    name: 'Belka',
    status: 'available' as const,
    category: { id: 2, name: 'Cats' },
    photoUrls: ['belka.jpg'],
  },
];

describe('API Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockConsole.mockClear();
  });

  afterAll(() => {
    mockConsole.mockRestore();
    jest.restoreAllMocks();
  });

  it('calls API correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(testPets),
    });

    const result = await searchPetsByStatus('available');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://petstore.swagger.io/v2/pet/findByStatus?status=available'
    );
    expect(result).toEqual(testPets);
  });

  it('works with different status', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([]),
    });

    await searchPetsByStatus('sold');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://petstore.swagger.io/v2/pet/findByStatus?status=sold'
    );
  });

  it('returns empty array when null', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(null),
    });

    const result = await searchPetsByStatus('pending');

    expect(result).toEqual([]);
  });

  it('handles errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(searchPetsByStatus('invalid')).rejects.toThrow(
      'HTTP error! status: 404'
    );
  });

  it('shows correct pets data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(testPets),
    });

    const result = await searchPetsByStatus('available');

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Tusik');
    expect(result[1].name).toBe('Belka');
  });
});
