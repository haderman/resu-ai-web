import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/components/cv/types';
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
      console.log('HYDRATE', action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export function selectColor(state: AppState): Color {
  return state.photo.color;
}
