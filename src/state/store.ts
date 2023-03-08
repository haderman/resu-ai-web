import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import { editorSlice } from './editor';
import { sessionSlice } from './session';
import { authProvidersSlice } from './auth-providers';
import apiSlice from './api';
import { blocksSlice } from './blocks';
import { pageSlice } from './page';

function makeStore() {
  const store = configureStore({
    reducer: {
      [editorSlice.name]: editorSlice.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
      [authProvidersSlice.name]: authProvidersSlice.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [blocksSlice.name]: blocksSlice.reducer,
      [pageSlice.name]: pageSlice.reducer,
    },
    devTools: true,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    },
  });

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);

