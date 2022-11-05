import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { Profile, ResumeContent } from '@/shared/types';

import apiSlice, { selectResumeResult } from '../slice';

const selectResumeStatus = createSelector(
  selectResumeResult,
  (result) => result.status,
);

const selectProfile = createSelector(
  selectResumeResult,
  (result) => result.data?.content.profile ?? Profile.create(),
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

export function useUpdateResume() {
  const [updateResume_, meta] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume' });
  const resume = useSelector(selectResumeResult);

  function updateResume(content: Partial<ResumeContent>) {
    if (resume.data) {
      updateResume_({
        ...resume.data,
        content: {
          ...resume.data.content,
          ...content,
        },
      });
    }
  }

  return [updateResume, meta] as const;
}

export function useProfileUpdater() {
  const profile = useSelector(selectProfile);
  const [updateResume] = useUpdateResume();

  function updateProfile(newProfile: Partial<Profile>) {
    updateResume({
      profile: Profile.update(profile, newProfile),
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
