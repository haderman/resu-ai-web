import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, TextEditor, Textarea } from '@/components/editor/form';
import { ProjectItem, Field } from '@/shared/types';
import { createObjectFromPath } from '@/shared/helpers';

import styles from './style.module.scss';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputProjectAdapterProps = Exclude<Field, 'type'>;

export function InputProjectAdapter(props: InputProjectAdapterProps) {
  const entries = useSelector(
    apiState.resume.selectors.selectResumeProperty<ProjectItem[]>(
      props.path,
      []
    )
  );
  const update = useUpdater();

  function saveEntries(entries: ProjectItem[]) {
    update(
      createObjectFromPath(
        props.path,
        entries
      )
    );
  }

  function handleUpdate(index: number) {
    return (entry: ProjectItem) => {
      const newEntries = [...entries as ProjectItem[]];
      newEntries[index] = entry;
      saveEntries(newEntries);
    };
  }

  function handleOnDelete(id: string) {
    const newEntries: Array<ProjectItem> = entries.filter((_, index) => String(index) !== id);
    saveEntries(newEntries);
  }

  function handleOnAddNewEntry() {
    saveEntries([...entries as ProjectItem[], {
      name: '',
      description: '',
      technologies: [],
      repository: '',
      website: ''
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
                name={entry.name}
                description={entry.description}
                technologies={entry.technologies}
                repository={entry.repository || ''}
                website={entry.website || ''}
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
  name: string;
  description: string;
  technologies: Array<string>;
  repository: string;
  website: string;
  onChange: (value: ProjectItem) => void;
  onDelete?: (id: string) => void;
}

function EntryCard(props: EntryCardProps) {
  const [entryData, setEntryData] = React.useState({
    name: props.name,
    description: props.description,
    technologies: props.technologies,
    repository: props.repository,
    website: props.website
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
    (value: string | Array<string>) => {
      setEntryData(prevData => ({
        ...prevData,
        [key]: value
      }));
    },
    []
  );

  return (
    <div className={styles.layout}>
      <InputName
        value={entryData.name}
        onChange={handleChange('name')}
      />
      <InputDescription
        value={entryData.description}
        onChange={handleChange('description')}
      />
      <InputTechnologies
        value={entryData.technologies}
        onChange={handleChange('technologies')}
      />
      <InputRepository
        value={entryData.repository}
        onChange={handleChange('repository')}
      />
      <InputWebsite
        value={entryData.website}
        onChange={handleChange('website')}
      />
      <div className={styles.actions}>
        <button onClick={handleOnSave}>Save</button>
        <button onClick={handleOnDelete}>Delete</button>
      </div>
    </div>
  );
}

type InputNameProps = {
  value: string
  onChange: (value: string) => void
}

const InputName = React.memo(
  function InputNameComponent({value, onChange}: InputNameProps) {
    return (
      <div>
        <InputText
          id="entry-name"
          name="entry-name"
          label="Project Name"
          value={value}
          onChange={onChange}
          data-layout="extended"
          hint="e.g. E-commerce Platform."
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputDescriptionProps = {
  value: string
  onChange: (value: string) => void
}

const InputDescription = React.memo(
  function InputDescriptionComponent(props: InputDescriptionProps) {
    return (
      <div data-full-width="true">
        <TextEditor
          id="entry-description"
          name="entry-description"
          label="Description"
          markdown={props.value}
          onChange={props.onChange}
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputTechnologiesProps = {
  value: Array<string>
  onChange: (value: Array<string>) => void
}

const InputTechnologies = React.memo(
  function InputTechnologiesComponent(props: InputTechnologiesProps) {
    const [newTechnology, setNewTechnology] = React.useState('');

    function addNewTechnology() {
      if (!newTechnology) {
        return;
      }

      const newTechnologies = [...props.value, newTechnology];
      props.onChange(newTechnologies);
      setNewTechnology('');
    }

    function updateTechnology(index: number) {
      return (value: string) => {
        const newTechnologies = [...props.value];
        newTechnologies[index] = value;
        props.onChange(newTechnologies);
      };
    }

    function removeTechnology(index: number) {
      const newTechnologies = props.value.filter((_, i) => i !== index);
      props.onChange(newTechnologies);
    }

    return (
      <div data-full-width="true" className={styles.technologies}>
        <ul data-full-width="true">
          {props.value.map((technology, index) => {
            return (
              <li key={index}>
                <InputText
                  id={`entry-technology-${index}`}
                  name={`entry-technology-${index}`}
                  label={`Technology ${index + 1}`}
                  value={technology}
                  onChange={updateTechnology(index)}
                />
                <button onClick={() => removeTechnology(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
        <div>
          <InputText
            id="entry-technology-new"
            name="entry-technology-new"
            label="New Technology"
            value={newTechnology}
            onChange={setNewTechnology}
            // onEnter={addNewTechnology}
          />
          <button onClick={addNewTechnology}>Add Technology</button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputRepositoryProps = {
  value: string
  onChange: (value: string) => void
}

const InputRepository = React.memo(
  function InputRepository(props: InputRepositoryProps) {
    return (
      <div>
        <InputText
          id="entry-repository"
          name="entry-repository"
          label="Repository"
          value={props.value}
          onChange={props.onChange}
          hint="e.g. https://github.com/username/project"
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type InputWebsiteProps = {
  value: string
  onChange: (value: string) => void
}

const InputWebsite = React.memo(
  function InputWebsite(props: InputWebsiteProps) {
    return (
      <div>
        <InputText
          id="entry-website"
          name="entry-website"
          label="Website"
          value={props.value}
          onChange={props.onChange}
          data-layout="extended"
          hint="e.g. https://myproject.com"
        />
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

type ButtonNewEntryProps = {
  onClick: () => void;
}

function ButtonNewEntry(props: ButtonNewEntryProps) {
  return (
    <button onClick={props.onClick}>
      Add New Project Entry
    </button>
  );
}
