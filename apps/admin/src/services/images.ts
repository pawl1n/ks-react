import { createApi } from '@reduxjs/toolkit/query/react';

import { Image, ImageRequest, UpdateRequestProps } from 'types/request';
import { ApiArrayResponse } from 'shared/types/response';
import { baseQueryWithReauthorization } from './baseQueryWithReauthorization';

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  tagTypes: ['Images'],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getImages: builder.query<Image[], void>({
      query: () => `/images`,
      transformResponse: (response: ApiArrayResponse<Image>) =>
        response._embedded?.images ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Images', id } as const)),
              { type: 'Images', id: 'LIST' },
            ]
          : [{ type: 'Images', id: 'LIST' }],
    }),
    getImageById: builder.query<Image, number>({
      query: (id: number) => `/${id}`,
      providesTags: (result) => [{ type: 'Images', id: result?.id }],
    }),
    createImage: builder.mutation<Image, ImageRequest>({
      query: (image) => ({
        url: '/images',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: image,
      }),
      invalidatesTags: [{ type: 'Images', id: 'LIST' }],
    }),
    updateImage: builder.mutation<
      Image,
      UpdateRequestProps<Image, ImageRequest>
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
        { type: 'Images', id: entity.id },
      ],
    }),
    deleteImage: builder.mutation<void, Image>({
      query: (image) => ({
        url: image._links.self.href,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Images', id: 'LIST' }],
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

export const {
  useGetImagesQuery,
  useGetImageByIdQuery,
  useCreateImageMutation,
  useDeleteImageMutation,
  useUpdateImageMutation,
} = imagesApi;
