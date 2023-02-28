import apiSlice, { useResumeUpdaters, selectResume, useGetResumeQuery, useResumeUpdateStatus, selectResumeProperty } from './slice';
import { selectors as profileSelectors, useProfileUpdater } from './selectors-and-updaters/profile';
import * as skillsApi from './selectors-and-updaters/skills';
import * as StyleApi from './selectors-and-updaters/style';
import * as LayoutApi from './selectors-and-updaters/layout';
import * as SectionsApi from './selectors-and-updaters/sections';

export const apiState = {
  resume: {
    selectors: {
      selectResume,
      selectResumeProperty,
    },
    useResumeUpdaters,
    useGetResumeQuery,
    useResumeUpdateStatus,
  },
  profile: { selectors: profileSelectors, useProfileUpdater },
  skills: skillsApi,
  style: StyleApi,
  layout: LayoutApi,
  sections: SectionsApi,
} as const;

export default apiSlice;
