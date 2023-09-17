import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { CvItem } from '@/components/editor/types';
import { AppState } from './store';

export type EditorState = {
  selectedItem: CvItem | null
}

const initialState: EditorState = {
  selectedItem: 'profile',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<CvItem | null>) {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.editor,
      };
    },
  },
});

export function selectSelectedItem(state: AppState): CvItem | null {
  return state.editor.selectedItem;
}
