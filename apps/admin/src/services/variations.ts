import { createApi } from "@reduxjs/toolkit/query/react";

import type {
  Variation,
  VariationOption,
  VariationOptionRequestParams,
  VariationRequest,
} from "shared/types/variation";
import type { ApiArrayResponse } from "shared/types/response";
import type { Pageable } from "shared/types/pageable";
import type { UpdateRequestProps } from "types/request";
import { baseQueryWithReauthorization } from "./baseQueryWithReauthorization";

export const variationsApi = createApi({
  reducerPath: "variationsApi",
  tagTypes: ["Variations", "VariationOptions"],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getVariations: builder.query<
      ApiArrayResponse<Variation>,
      Pageable<Variation>
    >({
      query: (pageable?: Pageable<Variation>) => ({
        url: "/variations",
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
            ...(result?._embedded?.variations ?? []).map(
              ({ id }) => ({ type: "Variations", id }) as const,
            ),
            { type: "Variations", id: "LIST" },
          ]
          : [{ type: "Variations", id: "LIST" }],
    }),
    getVariationById: builder.query<Variation, number>({
      query: (id: number) => `/variations/${id}`,
      providesTags: (result) => [{ type: "Variations", id: result?.id }],
    }),
    createVariation: builder.mutation<
      ApiArrayResponse<Variation>,
      VariationRequest
    >({
      query: (variation) => ({
        url: "/variations",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: variation,
      }),
      invalidatesTags: [{ type: "Variations", id: "LIST" }],
    }),
    updateVariation: builder.mutation<
      Variation,
      UpdateRequestProps<Variation, VariationRequest>
    >({
      query: ({ entity, data }) => ({
        url: entity._links.self.href,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: (result, error, { entity }) => [
        { type: "Variations", id: entity.id },
      ],
    }),
    deleteVariation: builder.mutation<void, Variation>({
      query: (variation) => ({
        url: variation._links.self.href,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Variations", id: "LIST" }],
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
              ({ id }) => ({ type: "VariationOptions", id }) as const,
            ),
            { type: "VariationOptions", id: "LIST" },
          ]
          : [{ type: "VariationOptions", id: "LIST" }],
    }),
    createVariationOption: builder.mutation<
      VariationOption,
      VariationOptionRequestParams
    >({
      query: ({ variation, option }) => ({
        url: variation._links.options.href,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: option,
      }),
      invalidatesTags: (result, error, { variation }) => [
        { type: "Variations", id: variation.id },
        { type: "VariationOptions", id: "LIST" },
      ],
    }),
    deleteVariationOption: builder.mutation<VariationOption, VariationOption>({
      query: ({ _links }) => ({
        url: _links.self.href,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "VariationOptions", id: "LIST" }],
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
  useDeleteVariationOptionMutation,
} = variationsApi;
