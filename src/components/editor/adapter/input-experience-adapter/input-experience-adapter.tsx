import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, TextEditor, Combobox } from '@/components/editor/form';
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
            <EntryCard
              id={String(index)}
              title={entry.title}
              company={entry.company}
              startDate={entry.startDate}
              endDate={entry.endDate}
              description={entry.description}
              locationType={entry.locationType}
              location={entry.location}
              onChange={handleUpdate(index)}
            />
          </div>
        );
      })}
      <EntryCard
        id="new-entry"
        title=""
        company=""
        startDate=""
        endDate=""
        description=""
        location=""
        locationType="on-site"
        onChange={handleOnChange}
      />
    </div>
  );
}

type EntryCardProps = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  locationType: LocationType;
  location: string;
  onChange: (value: Entry) => void;
}

function EntryCard(props: EntryCardProps) {
  const [entryData, setEntryData] = React.useState({
    title: props.title,
    company: props.company,
    startDate: props.startDate,
    endDate: props.endDate,
    description: props.description,
    locationType: props.locationType,
    location: props.location,
    skills: []
  });

  function handleOnSave() {
    props.onChange(entryData);
  }

  const handleChange = (key: string) => (value: string | LocationType | undefined) => {
    setEntryData(prevData => ({ ...prevData, [key]: value }));
  };

  return (
    <div className={styles.layout}>
      <div>
        <InputText
          id="entry-title"
          name="entry-title"
          label="Title"
          value={entryData.title}
          onChange={handleChange('title')}
          data-layout="extended"
          hint="e.g. Frontend Developer."
        />
      </div>
      <div>
        <InputText
          id="entry-company"
          name="entry-company"
          label="Company"
          value={entryData.company}
          onChange={handleChange('company')}
          hint="e.g. Google."
        />
      </div>
      <div>
        <InputText
          id="entry-location"
          name="entry-location"
          label="Location"
          value={entryData.location}
          onChange={handleChange('location')}
          hint="e.g. San Francisco, CA."
        />
      </div>
      <div>
        <Combobox
          fullWidth
          id={`entry-location-type-${props.id}`}
          label="Location Type"
          value={entryData.locationType}
          placeholder="Select a location type"
          options={LocationType.values.map((value) => {
            return {
              value,
              label: LocationType.toFriendlyString(value),
            };
          })}
          onChange={handleChange('locationType')}
        />
      </div>
      <div>
        <InputText
          id="entry-start-date"
          name="entry-start-date"
          label="Start Date"
          value={entryData.startDate}
          onChange={handleChange('startDate')}
        />
      </div>
      <div>
        <InputText
          id="entry-end-date"
          name="entry-end-date"
          label="End Date"
          value={entryData.endDate}
          onChange={handleChange('endDate')}
          data-layout="extended"
        />
      </div>
      <div data-full-width="true">
        <TextEditor
          id="entry-description"
          name="entry-description"
          label="Description"
          markdown={entryData.description}
          onChange={handleChange('description')}
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

