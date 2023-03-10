import { createSelector } from '@reduxjs/toolkit';

import { ResumeLayout } from '@/shared/types';

import { selectResume, useResumeUpdater } from '../slice';

const selectLayout = createSelector(
  selectResume,
  (resume) => resume?.layout,
);

export function useUpdaters() {
  const updateResume = useResumeUpdater();

  function updateLayout(layout: ResumeLayout) {
    updateResume({ layout });
  }

  const updaters = {
    updateLayout,
  };

  return [updaters] as const;
}

export const selectors = {
  selectLayout,
};
