import { selectors, useProfileUpdater } from './selectors-and-updaters/profile';
import apiSlice, { useUpdateResume, selectResumeResult, useGetResumeQuery } from './slice';

export const apiState = {
  resume: {
    selectors: {
      selectResumeResult,
    },
    useUpdateResume, useGetResumeQuery
  },
  profile: { selectors, useProfileUpdater },
} as const;

export default apiSlice;
