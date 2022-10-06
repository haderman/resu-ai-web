import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Color } from '@/components/editor/types';
import { Skill } from '@/components/editor/content';
import { AppState } from './store';

export type SkillsState = {
  color: Color
  backgroundColor: Color
  skills: Skill[]
}

const initialState: SkillsState = {
  color: 'blue',
  backgroundColor: 'secondary',
  skills: [
    { name: 'Typescript', years: 2 },
    { name: 'Css', years: 6 },
    { name: 'Html', years: 6 },
    { name: 'React', years: 5 },
  ],
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setColor(state, action: PayloadAction<Color>) {
      state.color = action.payload;
    },
    setBackground(state, action: PayloadAction<Color>) {
      state.backgroundColor = action.payload;
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
  return state.skills.color;
}

export function selectBackground(state: AppState): Color {
  return state.skills.backgroundColor;
}

export function selectSkills(state: AppState): Skill[] {
  return state.skills.skills;
}
