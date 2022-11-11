import apiSlice, { useResumeUpdaters, selectResumeResult, useGetResumeQuery } from './slice';
import { selectors as profileSelectors, useProfileUpdater } from './selectors-and-updaters/profile';
import * as skillsApi from './selectors-and-updaters/skills';

export const apiState = {
  resume: {
    selectors: {
      selectResumeResult,
    },
    useResumeUpdaters,
    useGetResumeQuery,
  },
  profile: { selectors: profileSelectors, useProfileUpdater },
  skills: skillsApi,
} as const;

export default apiSlice;
