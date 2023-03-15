import {
  createSlice,
  isRejectedWithValue,
  Middleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import Toast, { ToastPayloadObject, ToastType } from '../interfaces/Toast';

const DEFAULT_DELAY = 3000;

interface ToastSlice {
  toasts: Toast[];
}

const initialState: ToastSlice = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastPayloadObject>) => {
      const id = Math.random().toString(36).substring(2, 9);

      state.toasts.push({
        id: id,
        type: action.payload.toast.type,
        message: action.payload.toast.message,
        delay: action.payload.delay ?? DEFAULT_DELAY,
      });
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export const toastMiddleware: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.data?.message) {
      api.dispatch(
        addToast({
          toast: {
            type: ToastType.danger,
            message: action.payload.data.message,
          },
        }),
      );
    }

    for (const key in action.payload.data?.fields) {
      api.dispatch(
        addToast({
          toast: {
            type: ToastType.danger,
            message: `${key}: ${action.payload.data.fields[key]}`,
          },
        }),
      );
    }
    return next(action);
  }

  return next(action);
};

export default toastSlice.reducer;
