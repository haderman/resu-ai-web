import { createSelector } from '@reduxjs/toolkit';

import { selectResume, useResumeUpdaters } from '../slice';
import { ResumeSections } from '@/shared/types/resume/sections';

const selectSections = createSelector(
  selectResume,
  (resume) => resume?.sections,
);

export function useUpdaters() {
  const [resumeUpdater] = useResumeUpdaters();

  function updateSections(sections: ResumeSections) {
    // resumeUpdater.updateSections(sections);
  }

  const updaters = {
    updateSections,
  };

  return [updaters] as const;
}

export const selectors = {
  selectSections,
};
