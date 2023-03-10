import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, InputTextProps } from '@/components/editor/form';
import { Experience, Field, SkillItem } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputExperienceAdapterProps = Exclude<Field, 'type'>;

export function InputExperienceAdapter(props: InputExperienceAdapterProps) {
  const entries = useSelector(apiState.resume.selectors.selectResumeProperty<Experience['entries']>(props.path, []));
  const update = useUpdater();

  const handleChange = React.useCallback(
    (value: string) => {
      update(
        createObjectFromPath(
          props.path,
          value
            .split(',')
            .map(title => ({ title: title.trim(), yearsOfExperience: 1 }))
        )
      );
    },
    [update, props.path]
  );

  return (
    <div>
      Experience Entry Input
    </div>
  );
}
