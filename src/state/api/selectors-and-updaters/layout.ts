import { createSelector } from '@reduxjs/toolkit';

import { ResumeLayoutType } from '@/shared/types';

import { selectResumeResult, useResumeUpdaters } from '../slice';

const selectLayout = createSelector(
  selectResumeResult,
  (result) => result.data?.layout,
);

// refactor this code to use selectLayout
const selectLayoutType = createSelector(
  selectLayout,
  (layout) => layout?.type,
);

export function useUpdaters() {
  const [resumeUpdater] = useResumeUpdaters();

  function updateLayout(type: ResumeLayoutType) {
    resumeUpdater.updateLayout({ type });
  }

  const updaters = {
    updateLayout,
  };

  return [updaters] as const;
}

export const selectors = {
  selectLayout,
  selectLayoutType,
};
