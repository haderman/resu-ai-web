import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { CvTheme } from '@/components/cv/themes';
import { AppState } from './store';

export type EditorState = {
  theme: CvTheme
}

const initialState: EditorState = {
  theme: 'default'
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<CvTheme>) {
      state.theme = action.payload;
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

export function selectTheme(state: AppState): CvTheme {
  return state.editor.theme;
}
