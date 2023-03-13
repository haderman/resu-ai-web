import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, TextEditor } from '@/components/editor/form';
import { Experience, Field, LocationType } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

import styles from './style.module.scss';

const useUpdater = apiState.resume.useResumeContentUpdater;

type Entry = Experience['entries'][number];

export type InputExperienceAdapterProps = Exclude<Field, 'type'>;

export function InputExperienceAdapter(props: InputExperienceAdapterProps) {
  const entries = useSelector(apiState.resume.selectors.selectResumeProperty<Experience['entries']>(props.path, []));
  const update = useUpdater();

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

  function handleUpdate(index: number) {
    return (entry: Entry) => {
      const newEntries = [...entries as Entry[]];
      newEntries[index] = entry;
      saveEntries(newEntries);
    };
  }

  return (
    <div className={styles.root}>
      {entries?.map((entry, index) => {
        return (
          <div key={index} className={styles.wrapper}>
            <h3>{entry.title} - {entry.company}</h3>
            <EntryCard
              title={entry.title}
              company={entry.company}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
              onChange={handleUpdate(index)}
            />
          </div>
        );
      })}
      <EntryCard
        title=""
        company=""
        startDate=""
        endDate=""
        description=""
        onChange={handleOnChange}
      />
    </div>
  );
}

type EntryCardProps = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  onChange: (value: Entry) => void;
}

function EntryCard(props: EntryCardProps) {
  const [title, setTitle] = React.useState<string>(props.title);
  const [company, setCompany] = React.useState<string>(props.company);
  const [startDate, setStartDate] = React.useState<string>(props.startDate);
  const [endDate, setEndDate] = React.useState<string>(props.endDate);
  const [description, setDescription] = React.useState<string>(props.description);
  const [location, setLocation] = React.useState<string>('');
  const [locationType, setLocationType] = React.useState<LocationType>('remote');
  const [skills, setSkills] = React.useState<string[]>([]);

  function handleOnSave() {
    props.onChange({
      title,
      company,
      startDate,
      endDate,
      description,
      location,
      locationType,
      skills,
    });
  }

  return (
    <div className={styles.layout}>
      <div>
        <InputText
          id="entry-title"
          name="entry-title"
          label="Title"
          value={title}
          onChange={setTitle}
          data-layout="extended"
          hint="e.g. Frontend Developer."
        />
      </div>
      <div>
        <InputText
          id="entry-company"
          name="entry-company"
          label="Company"
          value={company}
          onChange={setCompany}
          hint="e.g. Google."
        />
      </div>
      <div>
        <InputText
          id="entry-start-date"
          name="entry-start-date"
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />
      </div>
      <div>
        <InputText
          id="entry-end-date"
          name="entry-end-date"
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          data-layout="extended"
        />
      </div>
      <div data-full-width="true">
        <TextEditor
          id="entry-description"
          name="entry-description"
          label="Description"
          markdown={description}
          onChange={setDescription}
        />
      </div>
      <div data-align="right">
        <button onClick={handleOnSave}>
          Save
        </button>
      </div>
    </div>
  );
}
