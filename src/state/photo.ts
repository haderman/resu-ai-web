import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/components/editor/types';
import { AppState } from './store';

export type PhotoState = {
  color: Color
}

const initialState: PhotoState = {
  color: 'almost-black',
};

export const photoSlice = createSlice({
  name: 'photo',
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
        ...action.payload.photo,
      };
    },
  },
});

export function selectColor(state: AppState): Color {
  return state.photo.color;
}
