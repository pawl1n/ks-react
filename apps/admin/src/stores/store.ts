import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import tokenSlice from './tokenSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { productsApi } from '../services/products';
import {
  authApi,
  authMiddleware,
  unauthenticatedErrorMiddleware,
} from '../services/auth';
import { usersApi, usersMiddleware } from '../services/users';
import { categoriesApi } from '../services/categories';
import { imagesApi } from '../services/images';
import toastSlice, { toastMiddleware } from './toastSlice';
import { variationsApi } from '../services/variations';

export const store: ToolkitStore = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    token: tokenSlice,
    toasts: toastSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
    [variationsApi.reducerPath]: variationsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(imagesApi.middleware)
      .concat(variationsApi.middleware)
      .concat(toastMiddleware)
      .concat(authMiddleware)
      .concat(usersMiddleware)
      .concat(unauthenticatedErrorMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
