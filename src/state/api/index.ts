import apiSlice, {
  useResumeUpdater,
  selectResume,
  useGetResumeQuery,
  useResumeUpdateStatus,
  selectResumeProperty,
  useResumeContentUpdater,
} from './slice';
import * as StyleApi from './selectors-and-updaters/style';
import * as LayoutApi from './selectors-and-updaters/layout';
import * as SectionsApi from './selectors-and-updaters/sections';

export const apiState = {
  resume: {
    selectors: {
      selectResume,
      selectResumeProperty,
    },
    useResumeUpdater,
    useGetResumeQuery,
    useResumeUpdateStatus,
    useResumeContentUpdater,
  },
  style: StyleApi,
  layout: LayoutApi,
  sections: SectionsApi,
} as const;

export default apiSlice;
