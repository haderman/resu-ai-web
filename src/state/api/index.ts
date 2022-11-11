import apiSlice, { useResumeUpdaters, selectResumeResult, useGetResumeQuery } from './slice';
import { selectors as profileSelectors, useProfileUpdater } from './selectors-and-updaters/profile';
import * as skillsApi from './selectors-and-updaters/skills';
import * as StyleApi from './selectors-and-updaters/style';

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
  style: StyleApi,
} as const;

export default apiSlice;
