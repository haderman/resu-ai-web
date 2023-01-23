import { createSelector } from '@reduxjs/toolkit';

import { ResumeStyle } from '@/shared/types';

import { selectResume, useResumeUpdaters } from '../slice';

const selectTheme = createSelector(
  selectResume,
  (resume) => resume?.style.theme,
);

export function useUpdaters() {
  const [updateResume] = useResumeUpdaters();

  function updateTheme(theme: ResumeStyle['theme']) {
    updateResume({
      style: {
        theme,
      },
    });
  }

  const updaters = {
    updateTheme,
  };

  return [updaters] as const;
}

export const selectors = {
  selectTheme,
};
