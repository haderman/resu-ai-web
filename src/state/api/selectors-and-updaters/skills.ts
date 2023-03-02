import * as React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { DeepPartial, ResumeContent, Skills } from '@/shared/types';

import { selectResumeStatus, selectResume, useResumeUpdaters } from '../slice';

const selectSkills = createSelector(
  selectResume,
  (resume) => resume?.content.skills ?? Skills.create(),
);

const selectTitle = createSelector(
  selectSkills,
  (skills) => skills.title,
);

const selectCardBackground = createSelector(
  selectSkills,
  (skills) => skills.cardStyle.background,
);

const selectItems = createSelector(
  selectSkills,
  (skills) => skills.items,
);

const selectItemStyle = createSelector(
  selectSkills,
  (skills) => skills.itemStyle,
);

export function useUpdateSkills() {
  const updateResume = useResumeUpdaters();

  function updateSkills(newSkills: DeepPartial<Skills>) {
    updateResume({
      content: {
        skills: newSkills,
      } as ResumeContent
    });
  }

  return updateSkills;
}

export function useSkillsUpdater() {
  const updateResume = useResumeUpdaters();

  const update = React.useCallback(
    (newContent: DeepPartial<ResumeContent>) => {
      updateResume({ content: newContent });
    },
    [updateResume]
  );

  return update;
}

export const selectors = {
  selectResumeStatus,
  selectSkills,
  selectTitle,
  selectCardBackground,
  selectItems,
  selectItemStyle,
};
