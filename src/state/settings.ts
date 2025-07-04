import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';

export type Mode = 'chat' | 'panel';

export type SettingsState = {
  mode: Mode;
};

const initialState: SettingsState = {
  mode: 'chat',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.settings,
      };
    },
  },
});

export function selectMode(state: AppState): Mode {
  return state.settings.mode;
}
