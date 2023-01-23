import { createSelector } from '@reduxjs/toolkit';

import { ResumeLayout } from '@/shared/types';

import { selectResume, useResumeUpdaters } from '../slice';

const selectLayout = createSelector(
  selectResume,
  (resume) => resume?.layout,
);

export function useUpdaters() {
  const [updateResume] = useResumeUpdaters();

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
