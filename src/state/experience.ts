import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/shared/types';
import { AppState } from './store';

export type ExperienceState = {
  color: Color
  background: Color
}

const initialState: ExperienceState = {
  background: 'primary',
  color: 'secondary',
};

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<Color>) {
      state.color = action.payload;
    },
    setBackground(state, action: PayloadAction<Color>) {
      state.background = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.experience,
      };
    },
  },
});

export function selectColor(state: AppState): Color {
  return state.experience.color;
}

export function selectBackground(state: AppState): Color {
  return state.experience.background;
}
