import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, TextEditor, Combobox, Textarea } from '@/components/editor/form';
import { ExperienceEntry, Field, LocationType } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

import styles from './style.module.scss';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputExperienceAdapterProps = Exclude<Field, 'type'>;

export function InputExperienceAdapter(props: InputExperienceAdapterProps) {
  const entries = useSelector(
    apiState.resume.selectors.selectResumeProperty<ExperienceEntry[]>(
      props.path,
      []
    )
  );
  const update = useUpdater();

  function saveEntries(entries: ExperienceEntry[]) {
    update(
      createObjectFromPath(
        props.path,
        entries
      )
    );
  }

  function handleUpdate(index: number) {
    return (entry: ExperienceEntry) => {
      const newEntries = [...entries as ExperienceEntry[]];
      newEntries[index] = entry;
      saveEntries(newEntries);
    };
  }

  function handleOnDelete(id: string) {
    const newEntries: Array<ExperienceEntry> = entries.filter((_, index) => String(index) !== id);
    saveEntries(newEntries);
  }

  function handleOnAddNewEntry() {
    saveEntries([...entries as ExperienceEntry[], {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      achievements: [],
      locationType: 'on-site',
      location: '',
      skills: []
    }]);
  }

  return (
    <>
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
                achievements={entry.achievements}
                locationType={entry.locationType}
                location={entry.location}
                onChange={handleUpdate(index)}
                onDelete={handleOnDelete}
              />
            </div>
          );
        })}
        <ButtonNewEntry onClick={handleOnAddNewEntry} />
      </div>
    </>
  );
}

type EntryCardProps = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  achievements: Array<string>;
  locationType: LocationType;
  location: string;
  onChange: (value: ExperienceEntry) => void;
  onDelete?: (id: string) => void;
}

function EntryCard(props: EntryCardProps) {
  const [entryData, setEntryData] = React.useState({
    title: props.title,
    company: props.company,
    startDate: props.startDate,
    endDate: props.endDate,
    achievements: props.achievements,
    locationType: props.locationType,
    location: props.location,
    skills: []
  });

  function handleOnSave() {
    props.onChange(entryData);
  }

  function handleOnDelete() {
    if (props.onDelete) {
      props.onDelete(props.id);
    }
  }

  const handleChange = React.useCallback((key: string) =>
    (value: string | LocationType | undefined | Array<string>) => {
      setEntryData(prevData =>  ({
        ...prevData,
        [key]: value
      }));
    },
    []
  );

  return (
    <div className={styles.layout}>
      <InputTitle
        value={entryData.title}
        onChange={handleChange('title')}
      />
      <InputCompany
        value={entryData.company}
        onChange={handleChange('company')}
      />
      <InputLocation
        value={entryData.location}
        onChange={handleChange('location')}
      />
      <ComboboxLocationType
        id={props.id}
        value={entryData.locationType}
        onChange={handleChange('locationType')}
      />
      <InputStartDate
        value={entryData.startDate}
        onChange={handleChange('startDate')}
      />
      <InputEndDate
        value={entryData.endDate}
        onChange={handleChange('endDate')}
      />
      <InputAchievements
        value={entryData.achievements}
        onChange={handleChange('achievements')}
      />
      <div data-full-width="true" className={styles.actions}>
        {props.onDelete &&
          <button onClick={handleOnDelete} data-variant="danger">
          Delete
          </button>
        }
        <button onClick={handleOnSave}>
          Save
        </button>
      </div>
    </div>
  );
}

type InputTitleProps = {
  value: string;
  onChange: (value: string) => void;
}

const InputTitle = React.memo(
  function InputTitleComponent({value, onChange}: InputTitleProps) {
    return (
      <div>
        <InputText
          id="entry-title"
          name="entry-title"
          label="Title"
          value={value}
          onChange={onChange}
          data-layout="extended"
          hint="e.g. Frontend Developer."
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);


type InputCompanyProps = {
  value: string
  onChange: (value: string) => void
}
const InputCompany = React.memo(
  function InputCompany(props: InputCompanyProps) {
    return (
      <div>
        <InputText
          id="entry-company"
          name="entry-company"
          label="Company"
          value={props.value}
          onChange={props.onChange}
          hint="e.g. Google."
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputLocationProps = {
  value: string
  onChange: (value: string) => void
}

const InputLocation = React.memo(
  function InputLocation(props: InputLocationProps) {
    return (
      <div>
        <InputText
          id="entry-location"
          name="entry-location"
          label="Location"
          value={props.value}
          onChange={props.onChange}
          hint="e.g. San Francisco, CA."
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputStartDateProps = {
  value: string
  onChange: (value: string) => void
}
const InputStartDate = React.memo(
  function InputStartDate(props: InputStartDateProps) {
    return (
      <div>
        <InputText
          id="entry-start-date"
          name="entry-start-date"
          label="Start Date"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputEndDateProps = {
  value: string
  onChange: (value: string) => void
}

const InputEndDate = React.memo(
  function InputEndDate(props: InputEndDateProps) {
    return (
      <div>
        <InputText
          id="entry-end-date"
          name="entry-end-date"
          label="End Date"
          value={props.value}
          onChange={props.onChange}
          data-layout="extended"
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputAchievementsProps = {
  value: Array<string>
  onChange: (value: Array<string>) => void
}

const InputAchievements = React.memo(
  function InputAchievementsComponent(props: InputAchievementsProps) {
    const [newAchievement, setNewAchievement] = React.useState('');

    function addNewAchievement() {
      if (!newAchievement) {
        return;
      }

      const newAchievements = [...props.value, newAchievement];
      props.onChange(newAchievements);
      setNewAchievement('');
    }

    function updateAchievement(index: number) {
      return (value: string) => {
        const newAchievements = [...props.value];
        newAchievements[index] = value;
        props.onChange(newAchievements);
      };
    }

    return (
      <div data-full-width="true" className={styles.achievements}>
        <ul data-full-width="true">
          {props.value.map((achievement, index) => {
            return (
              <li key={index}>
                <Textarea
                  id={`entry-achievement-${index}`}
                  name={`entry-achievement-${index}`}
                  label={`Achievement ${index + 1}`}
                  value={achievement}
                  onChange={updateAchievement(index)}
                />
              </li>
            );
          })}
        </ul>
        <div>
          <Textarea
            id="entry-achievement-new"
            name="entry-achievement-new"
            label="New Achievement"
            value={newAchievement}
            onChange={setNewAchievement}
            onEnter={addNewAchievement}
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type ComboboxLocationTypeProps = {
  id: string;
  value: LocationType;
  onChange: (value: LocationType) => void;
}

const ComboboxLocationType = React.memo(
  function ComboboxLocationType(props: ComboboxLocationTypeProps) {
    return (
      <div>
        <Combobox
          fullWidth
          id={`entry-location-type-${props.id}`}
          label="Location Type"
          value={props.value}
          placeholder="Select a location type"
          options={LocationType.values.map((value) => {
            return {
              value,
              label: LocationType.toFriendlyString(value),
            };
          })}
          onChange={(v) => props.onChange(v as LocationType)}
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
    && prevProps.id === nextProps.id
);

type ButtonNewEntryProps = {
  onClick: () => void;
}

function ButtonNewEntry(props: ButtonNewEntryProps) {
  return (
    <button onClick={props.onClick}>
      Add New Experience Entry
    </button>
  );
}

