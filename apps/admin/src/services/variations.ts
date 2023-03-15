import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

import Variation, {
  VariationOption,
  VariationOptionRequestParams,
  VariationRequest,
} from '../interfaces/Variation';
import { ApiArrayResponse } from 'interfaces/apiResponse';
import { Pageable, UpdateRequestProps } from '../interfaces';

const baseUrl = 'http://localhost:8080/api/variations';

export const variationsApi = createApi({
  reducerPath: 'variationsApi',
  tagTypes: ['Variations', 'VariationOptions'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVariations: builder.query<
      ApiArrayResponse<Variation>,
      Pageable<Variation> | void
    >({
      query: (pageable?: Pageable<Variation>) => ({
        url: '',
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.variations ?? []).map(
                ({ id }) => ({ type: 'Variations', id } as const),
              ),
              { type: 'Variations', id: 'LIST' },
            ]
          : [{ type: 'Variations', id: 'LIST' }],
    }),
    getVariationById: builder.query<Variation, number>({
      query: (id: number) => `/${id}`,
    }),
    createVariation: builder.mutation<
      ApiArrayResponse<Variation>,
      VariationRequest
    >({
      query: (variation) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: variation,
      }),
      invalidatesTags: [{ type: 'Variations', id: 'LIST' }],
    }),
    updateVariation: builder.mutation<
      Variation,
      UpdateRequestProps<Variation, VariationRequest>
    >({
      query: ({ entity, data }) => ({
        url: entity._links.self.href,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: (result, error, { entity }) => [
        { type: 'Variations', id: entity.id },
      ],
    }),
    deleteVariation: builder.mutation<void, Variation>({
      query: (variation) => ({
        url: variation._links.self.href,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Variations', id: 'LIST' }],
    }),
    getVariationOptions: builder.query<
      ApiArrayResponse<VariationOption>,
      Variation
    >({
      query: (variation) => ({
        url: variation._links.options.href,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.options ?? []).map(
                ({ id }) => ({ type: 'VariationOptions', id } as const),
              ),
              { type: 'VariationOptions', id: 'LIST' },
            ]
          : [{ type: 'VariationOptions', id: 'LIST' }],
    }),
    createVariationOption: builder.mutation<
      VariationOption,
      VariationOptionRequestParams
    >({
      query: ({ variation, option }) => ({
        url: variation._links.options.href,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: option,
      }),
      invalidatesTags: (result, error, { variation }) => [
        { type: 'Variations', id: variation.id },
        { type: 'VariationOptions', id: 'LIST' },
      ],
    }),
    deleteVariationOption: builder.mutation<VariationOption, VariationOption>({
      query: ({ _links }) => ({
        url: _links.self.href,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'VariationOptions', id: 'LIST' }],
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
export const {
  useGetVariationsQuery,
  useGetVariationByIdQuery,
  useCreateVariationMutation,
  useDeleteVariationMutation,
  useUpdateVariationMutation,
  useGetVariationOptionsQuery,
  useCreateVariationOptionMutation,
  // useUpdateVariationOptionMutation,
  useDeleteVariationOptionMutation,
} = variationsApi;
