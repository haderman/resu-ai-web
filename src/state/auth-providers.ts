import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ClientSafeProvider } from 'next-auth/react';

import { AppState } from './store';

export type AuthProvidersState = {
  github: ClientSafeProvider | null;
};

const initialState: AuthProvidersState = {
  github: null,
};

export const authProvidersSlice = createSlice({
  name: 'authProviders',
  initialState,
  reducers: {
    setAuthProviders(state, action: PayloadAction<ClientSafeProvider | undefined>) {
      if (action.payload) {
        state.github = action.payload;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.authProviders,
      };
    },
  },
});

export function selectAuthProviders(state: AppState): AuthProvidersState {
  return state.authProviders;
}
