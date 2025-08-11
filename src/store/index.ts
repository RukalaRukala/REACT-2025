import { configureStore } from '@reduxjs/toolkit';

import selectedItemsReducer from './selectedItemsSlice';

import { petsApi } from './api/petsApi';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [petsApi.reducerPath]: petsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();

    return defaultMiddleware.concat(petsApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
