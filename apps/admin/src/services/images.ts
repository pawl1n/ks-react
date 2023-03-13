import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

import Image, { ImageRequest } from '../interfaces/Image';
import { ApiArrayResponse } from 'interfaces/apiResponse';
import { UpdateRequestProps } from '../interfaces';

const baseUrl = 'http://localhost:8080/api/images';

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  tagTypes: ['Images'],
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
    getImages: builder.query<Image[], void>({
      query: () => ``,
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
    }),
    createImage: builder.mutation<Image, ImageRequest>({
      query: (image) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: image,
      }),
      invalidatesTags: [{ type: 'Images', id: 'LIST' }],
    }),
    updateImage: builder.mutation<Image, UpdateRequestProps<ImageRequest>>({
      query: (props) => ({
        url: `/${props.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: props.data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Images', id }],
    }),
    deleteImage: builder.mutation<ApiArrayResponse<Image>, string>({
      query: (url) => ({
        url: url,
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
