import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/components/editor/types';
import { AppState } from './store';

export type ProjectsState = {
  color: Color
  background: Color
  skillsColor: Color
}

const initialState: ProjectsState = {
  color: 'secondary',
  background: 'primary',
  skillsColor: 'pink',
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<Color>) {
      state.color = action.payload;
    },
    setBackground(state, action: PayloadAction<Color>) {
      state.background = action.payload;
    },
    setSkillsColor(state, action: PayloadAction<Color>) {
      state.skillsColor = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.projects,
      };
    },
  },
});

export function selectColor(state: AppState): Color {
  return state.projects.color;
}

export function selectBackground(state: AppState): Color {
  return state.projects.background;
}

export function selectSkillsColor(state: AppState): Color {
  return state.projects.skillsColor;
}
