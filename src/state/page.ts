import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from './store';
import { PageDimensions } from '@/shared/types/page';

export type PageState = {
  dimensions: PageDimensions
};

const initialState: PageState = {
  dimensions: {
    offsetHeight: 1,
    paddingTop: 1,
    paddingBottom: 1,
    marginBottom: 1,
  },
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setDimensions(state, action: PayloadAction<PageDimensions>) {
      state.dimensions = action.payload;
    },
    // setColor(state, action: PayloadAction<Color>) {
    //   state.color = action.payload;
    // },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.page,
      };
    },
  },
});

export function selectPageState(state: AppState): PageState {
  return state.page;
}

export function selectPageDimensions(state: AppState): PageDimensions {
  return state.page.dimensions;
}

// export function selectColor(state: AppState): Color {
//   return state.contact.color;
// }
