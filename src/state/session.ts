import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Session } from 'next-auth';

import { AppState } from './store';

export type SessionState = {
  user?: Session['user']
  expires?: Session['expires']
  isSessionActive: boolean
};

const initialState: SessionState = {
  isSessionActive: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<Session | null>) {
      if (action.payload) {
        state.user = action.payload.user;
        state.expires = action.payload.expires;
        state.isSessionActive = true;
      } else {
        state.isSessionActive = false;
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return action.payload.session;
    },
  },
});

export function selectSession(state: AppState): SessionState  {
  return state.session;
}
