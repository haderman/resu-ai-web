import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import { editorSlice } from './editor';
import { contactSlice } from './contact';
import { profileSlice } from './profile';
import { skillsSlice } from './skills';

function makeStore() {
  const store = configureStore({
    reducer: {
      [editorSlice.name]: editorSlice.reducer,
      [contactSlice.name]: contactSlice.reducer,
      [profileSlice.name]: profileSlice.reducer,
      [skillsSlice.name]: skillsSlice.reducer,
    },
    devTools: true,
  });

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);

