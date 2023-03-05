import { createSelector } from '@reduxjs/toolkit';

import { selectResume, useResumeUpdater } from '../slice';
import { ResumeSections } from '@/shared/types/resume/sections';

const selectSections = createSelector(
  selectResume,
  (resume) => resume?.sections,
);

export function useUpdaters() {
  const updateResume = useResumeUpdater();

  function updateSections(sections: ResumeSections) {
    updateResume({ sections });
  }

  const updaters = {
    updateSections,
  };

  return [updaters] as const;
}

export const selectors = {
  selectSections,
};
