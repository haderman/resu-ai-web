import * as React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { Profile, ResumeContent } from '@/shared/types';

import { selectResumeStatus, selectResume, useResumeUpdaters } from '../slice';

const selectProfile = createSelector(
  selectResume,
  (resume) => resume?.content.profile ?? Profile.create(),
);

const selectProfileTitle = createSelector(
  selectProfile,
  (profile) => profile.title,
);

const selectProfileDescription = createSelector(
  selectProfile,
  (profile) => profile.description,
);

const selectProfileCardBackground = createSelector(
  selectProfile,
  (profile) => profile.cardStyle.background,
);

export function useProfileUpdater() {
  const updateResume = useResumeUpdaters();

  const updateProfile = React.useCallback(
    (newProfile: Partial<Profile>) => {
      updateResume({
        content: {
          profile: newProfile,
        } as ResumeContent,
      });
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
};
