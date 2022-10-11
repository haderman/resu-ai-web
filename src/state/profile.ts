import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/components/editor/types';
import { AppState } from './store';

export type ContactState = {
  color: Color
}

const initialState: ContactState = {
  color: 'secondary',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<Color>) {
      state.color = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.profile,
      };
    },
  },
});

export function selectColor(state: AppState): Color {
  return state.profile.color;
}
