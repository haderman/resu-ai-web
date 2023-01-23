import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Resume, ResumeContent, ResumeStyle, ResumeLayout } from '@/shared/types';
import { getHost } from '@/shared/helpers/get-host';
import { useSelector } from 'react-redux';
import { createAction, createSelector } from '@reduxjs/toolkit';
import { ResumeSections } from '@/shared/types/resume/sections';

export const apiSlice = createApi({
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
    updateResume: builder.mutation<void, Partial<Resume>>({
      query: (resume) => {
        return {
          url: `resume/${resume.id}`,
          method: 'PATCH',
          body: resume,
        };
      },
      onQueryStarted: async (resume, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getResume', undefined, (draft) => {
            if (resume.content) {
              updateDraftContent(draft, resume.content);
            }

            if (resume.layout) {
              updateDraftLayout(draft, resume.layout);
            }

            if (resume.style) {
              updateDraftStyle(draft, resume.style);
            }

            if (resume.sections) {
              updateDraftSections(draft, resume.sections);
            }
          })
        );
        try {
          dispatch(resumeUpdated(resume));
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const resumeUpdated = createAction<Partial<Resume>>('resume-updated');

export const { useGetResumeQuery } = apiSlice;

const selectResumeResult = apiSlice.endpoints.getResume.select();

export const selectResumeStatus = createSelector(
  selectResumeResult,
  (result) => result.status,
);

export const selectResume = createSelector(
  selectResumeResult,
  (result) => result.data
);

export const selectResumeId = createSelector(
  selectResume,
  (resume) => resume?.id
);

export function useResumeUpdaters() {
  const resumeId = useSelector(selectResumeId);
  const [updateResume_, meta] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume', });

  function updateResume(resume: any) {
    updateResume_({
      ...resume,
      id: resumeId,
    });
  }

  return [updateResume, meta] as const;
}

/**
 * This is kind of a deep merge, instead of replace the whole content
 *
 *  draft.content = content
 *
 * it replaces more specific properties so it takes adventage of immer
 * and it's going to update only the specific property that changed into the state
 * for example, it would update:
 *
 *  draft.content.profile.title = content.profile.title
 *
 * then Immer is going to update only the title property of the profile in the state
 * saving some re-rendering
 */
function updateDraftContent(draft: Resume, content: ResumeContent): void {
  for (const outerKey in content) {
    const contentValue: any = content[outerKey as keyof ResumeContent];
    for (const innerKey in contentValue) {
      // TODO: I don't know how to type this properly
      // @ts-ignore
      draft.content[outerKey][innerKey] = contentValue[innerKey];
    }
  }
}

function updateDraftStyle(draft: Resume, style: ResumeStyle): void {
  for (const outerKey in style) {
    // TODO: I don't know how to type this properly
    // @ts-ignore
    draft.style[outerKey] = style[outerKey as keyof ResumeStyle];
  }
}

function updateDraftLayout(draft: Resume, layout: ResumeLayout): void {
  draft.layout = layout;
}

function updateDraftSections(draft: Resume, sections: ResumeSections): void {
  draft.sections = sections;
}

export default apiSlice;
