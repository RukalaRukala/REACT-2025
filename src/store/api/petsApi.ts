import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pet } from '../../components/Search/Search.model';
import type { RootState } from '../index';

export const PETS_API_TAGS = {
  Pet: 'Pet',
  PetsList: 'PetsList',
} as const;

export const petsApi = createApi({
  reducerPath: 'petsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://petstore.swagger.io/v2',
  }),

  tagTypes: [PETS_API_TAGS.Pet, PETS_API_TAGS.PetsList],

  endpoints: (builder) => ({
    getPetsByStatus: builder.query<Pet[], string>({
      query: (status) => `pet/findByStatus?status=${status}`,

      providesTags: (result, _error, status) => [
        { type: PETS_API_TAGS.PetsList, id: status },
        ...(result
          ? result.map(({ id }) => ({ type: PETS_API_TAGS.Pet, id }))
          : []),
      ],

      transformResponse: (response: Pet[] | null): Pet[] => {
        return response || [];
      },
    }),

    getAllPets: builder.query<Pet[], undefined>({
      queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
        const [availableResult, pendingResult, soldResult] = await Promise.all([
          baseQuery('pet/findByStatus?status=available'),
          baseQuery('pet/findByStatus?status=pending'),
          baseQuery('pet/findByStatus?status=sold'),
        ]);

        if (availableResult.error) return { error: availableResult.error };
        if (pendingResult.error) return { error: pendingResult.error };
        if (soldResult.error) return { error: soldResult.error };

        const allPets: Pet[] = [
          ...((availableResult.data as Pet[]) || []),
          ...((pendingResult.data as Pet[]) || []),
          ...((soldResult.data as Pet[]) || []),
        ];

        return { data: allPets };
      },

      providesTags: (result) => [
        { type: PETS_API_TAGS.PetsList, id: 'ALL' },
        ...(result
          ? result.map(({ id }) => ({ type: PETS_API_TAGS.Pet, id }))
          : []),
      ],
    }),

    getPetById: builder.query<Pet | null, number>({
      queryFn: async (id, api): Promise<{ data: Pet | null }> => {
        const state = api.getState() as RootState;
        const cachedData =
          petsApi.endpoints.getAllPets.select(undefined)(state);

        if (cachedData.data) {
          const pet: Pet | undefined = cachedData.data.find(
            (p: Pet) => p.id === id
          );
          return { data: pet || null };
        }

        const result = await api.dispatch(
          petsApi.endpoints.getAllPets.initiate(undefined)
        );
        if ('data' in result && result.data) {
          const pet: Pet | undefined = result.data.find(
            (p: Pet) => p.id === id
          );
          return { data: pet || null };
        }

        return { data: null };
      },

      providesTags: (_result, _error, id) => [{ type: PETS_API_TAGS.Pet, id }],
    }),
  }),
});

export const { useGetPetsByStatusQuery, useGetPetByIdQuery } = petsApi;
