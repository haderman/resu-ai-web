import { HYDRATE } from 'next-redux-wrapper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Resume, ResumeContent, ResumeStyle, ResumeLayout } from '@/shared/types';
import { getHost } from '@/shared/helpers/get-host';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ResumeSections } from '@/shared/types/resume/sections';

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
    updateResume: builder.mutation<void, Resume>({
      query: (resume) => {
        return {
          url: 'resume',
          method: 'PUT',
          body: resume,
        };
      },
      onQueryStarted: async (resume, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getResume', undefined, (draft) => {
            updateDraftContent(draft, resume.content);
            updateDraftStyle(draft, resume.style);
            updateDraftLayout(draft, resume.layout);
            updateDraftSections(draft, resume.sections);
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

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

export function useResumeUpdaters() {
  const [updateResume_, meta] = apiSlice.useUpdateResumeMutation({ fixedCacheKey: 'update-resume' });
  const { data } = useSelector(selectResumeResult);

  function updateContent(content: Partial<ResumeContent>) {
    if (data) {
      updateResume_({
        ...data,
        content: {
          ...data.content,
          ...content,
        },
      });
    }
  }

  function updateStyle(style: Partial<ResumeStyle>) {
    if (data) {
      updateResume_({
        ...data,
        style: {
          ...data.style,
          ...style,
        },
      });
    }
  }

  function updateLayout(layout: ResumeLayout) {
    if (data) {
      updateResume_({ ...data, layout });
    }
  }

  function updateSections(sections: ResumeSections) {
    if (data) {
      updateResume_({ ...data, sections });
    }
  }

  const updaters = {
    updateContent,
    updateStyle,
    updateLayout,
    updateSections,
  };

  return [updaters, meta] as const;
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
