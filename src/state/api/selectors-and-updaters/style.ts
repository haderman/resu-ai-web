import { createSelector } from '@reduxjs/toolkit';

import { ResumeStyle } from '@/shared/types';

import { selectResumeResult, useResumeUpdaters } from '../slice';

const selectTheme = createSelector(
  selectResumeResult,
  (result) => result.data?.style.theme,
);

const selectLayout = createSelector(
  selectResumeResult,
  (result) => result.data?.style.layout,
);

export function useUpdaters() {
  const [resumeUpdater] = useResumeUpdaters();

  function updateTheme(theme: ResumeStyle['theme']) {
    resumeUpdater.updateStyle({ theme });
  }

  function updateLayout(layout: ResumeStyle['layout']) {
    resumeUpdater.updateStyle({ layout });
  }

  const updaters = {
    updateTheme,
    updateLayout,
  };

  return [updaters] as const;
}

export const selectors = {
  selectLayout,
  selectTheme,
};
