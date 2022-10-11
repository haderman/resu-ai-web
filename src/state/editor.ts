import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { CvTheme } from '@/components/editor/themes';
import { CvItem } from '@/components/editor/types';
import { AppState } from './store';

export type EditorState = {
  theme: CvTheme
  selectedItem: CvItem | null
}

const initialState: EditorState = {
  theme: 'dark-space',
  selectedItem: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<CvTheme>) {
      state.theme = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<CvItem | null>) {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
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

export function selectSelectedItem(state: AppState): CvItem | null {
  return state.editor.selectedItem;
}
