import { HYDRATE } from 'next-redux-wrapper';
import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Resume, Profile, ResumeContent } from '@/shared/types';
import { getHost } from '@/shared/helpers/get-host';
import { useSelector } from 'react-redux';

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${getHost()}/api/` }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getResume: builder.query<Resume, void>({
      query: () => 'resume',
      transformResponse: Resume.decode,
    }),
    updateResume: builder.mutation<Resume, Resume>({
      query: (resume) => ({
        url: 'resume',
        method: 'PUT',
        body: resume,
      }),
      onQueryStarted: async (resume, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getResume', undefined, (draft) => {
            if (draft) {
              draft.content = resume.content;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
      transformResponse: Resume.decode,
    }),
  }),
});

export const { useGetResumeQuery } = apiSlice;

const selectResumeResult = apiSlice.endpoints.getResume.select();

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

export default apiSlice;
