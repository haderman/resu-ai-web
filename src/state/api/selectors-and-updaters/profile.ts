import * as React from 'react';
import { createSelector } from '@reduxjs/toolkit';

import { DeepPartial, Profile, ResumeContent } from '@/shared/types';

import { selectResumeStatus, selectResume, useResumeUpdaters } from '../slice';

const selectProfile = createSelector(
  selectResume,
  (resume) => resume?.content.profile ?? Profile.create(),
);

const selectProfileTitle = createSelector(
  selectProfile,
  (profile) => profile.title,
);

const selectTitleText = createSelector(
  selectProfileTitle,
  (title) => title.text,
);

const selectTitleColor = createSelector(
  selectProfileTitle,
  (title) => title.color,
);

const selectTitleSize = createSelector(
  selectProfileTitle,
  (title) => title.size,
);

const selectTitleAlign = createSelector(
  selectProfileTitle,
  (title) => title.align,
);

const selectProfileDescription = createSelector(
  selectProfile,
  (profile) => profile.description,
);

const selectDescriptionText = createSelector(
  selectProfileDescription,
  (description) => description.text,
);

const selectDescriptionColor = createSelector(
  selectProfileDescription,
  (description) => description.color,
);

const selectDescriptionSize = createSelector(
  selectProfileDescription,
  (description) => description.size,
);

const selectProfileCardBackground = createSelector(
  selectProfile,
  (profile) => profile.cardStyle.background,
);

export function useProfileUpdater() {
  const updateResume = useResumeUpdaters();

  const updateProfile = React.useCallback(
    (newContent: DeepPartial<ResumeContent>) => {
      updateResume({ content: newContent });
    },
    [updateResume]
  );

  return updateProfile;
}

export const selectors = {
  selectResumeStatus,
  selectProfile,
  selectProfileTitle,
  selectProfileDescription,
  selectProfileCardBackground,
  selectTitleText,
  selectTitleColor,
  selectTitleSize,
  selectTitleAlign,
  selectDescriptionText,
  selectDescriptionColor,
  selectDescriptionSize,
};
