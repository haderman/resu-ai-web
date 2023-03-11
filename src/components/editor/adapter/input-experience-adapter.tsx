import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText } from '@/components/editor/form';
import { Experience, Field } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';
import { Stack } from '../common';

const useUpdater = apiState.resume.useResumeContentUpdater;

type Entry = Experience['entries'][number];

export type InputExperienceAdapterProps = Exclude<Field, 'type'>;

export function InputExperienceAdapter(props: InputExperienceAdapterProps) {
  const entries = useSelector(apiState.resume.selectors.selectResumeProperty<Experience['entries']>(props.path, []));
  const update = useUpdater();

  console.log('entries', entries);

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

  function saveEntries(entries: Entry[]) {
    update(
      createObjectFromPath(
        props.path,
        entries
      )
    );
  }

  function handleOnChange(entry: Entry) {
    saveEntries([...entries as Entry[], entry]);
  }

  return (
    <div
      style={{
        border: '1px solid hsl(0 0% 20%)',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
      <label>Experience Entries</label>
      <EntryCard onChange={handleOnChange} />
    </div>
  );
}

type EntryCardProps = {
  onChange: (value: Entry) => void;
}

function EntryCard(props: EntryCardProps) {
  const [title, setTitle] = React.useState<string>('');
  const [company, setCompany] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  function handleOnSave() {
    props.onChange({
      title,
      company,
      startDate,
      endDate,
      description,
    });
  }

  return (
    <div>
      <InputText
        id="entry-title"
        name="entry-title"
        label="Title"
        value={title}
        onChange={setTitle}
      />
      <InputText
        id="entry-company"
        name="entry-company"
        label="Company"
        value={company}
        onChange={setCompany}
      />
      <InputText
        id="entry-start-date"
        name="entry-start-date"
        label="Start Date"
        value={startDate}
        onChange={setStartDate}
      />
      <InputText
        id="entry-end-date"
        name="entry-end-date"
        label="End Date"
        value={endDate}
        onChange={setEndDate}
      />
      <InputText
        id="entry-description"
        name="entry-description"
        label="Description"
        value={description}
        onChange={setDescription}
      />
      <button onClick={handleOnSave}>
        Save
      </button>
    </div>
  );
}
