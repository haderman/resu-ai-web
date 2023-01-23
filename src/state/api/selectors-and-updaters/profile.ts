import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { Profile } from '@/shared/types';

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
  const profile = useSelector(selectProfile);
  const [updateResume] = useResumeUpdaters();

  function updateProfile(newProfile: Partial<Profile>) {
    updateResume({
      content: {
        profile: Profile.update(profile, newProfile),
      },
    });
  }

  function updateProfleTitle(title: Partial<Profile['title']>) {
    updateProfile(Profile.updateTitle(profile, title));
  }

  function updateProfleDescription(description: Partial<Profile['description']>) {
    updateProfile(Profile.updateDescription(profile, description));
  }

  function updateCardStyle(style: Partial<Profile['cardStyle']>) {
    updateProfile(Profile.updateCardStyle(profile, style));
  }

  const updater = {
    updateProfile,
    updateProfleTitle,
    updateProfleDescription,
    updateCardStyle,
  };

  return [updater] as const;
}

export const selectors = {
  selectResumeStatus,
  selectProfile,
  selectProfileTitle,
  selectProfileDescription,
  selectProfileCardBackground,
};
