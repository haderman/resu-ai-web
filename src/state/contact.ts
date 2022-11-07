import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/shared/types';
import { AppState } from './store';

export type ContactState = {
  color: Color
}

const initialState: ContactState = {
  color: 'blue',
};

export const contactSlice = createSlice({
  name: 'contact',
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
        ...action.payload.contact,
      };
    },
  },
});

export function selectColor(state: AppState): Color {
  return state.contact.color;
}
