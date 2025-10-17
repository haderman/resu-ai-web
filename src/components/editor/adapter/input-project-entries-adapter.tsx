import * as React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { InputText, Textarea } from '@/components/editor/form';
import { ProjectItem, Field } from '@/shared/types';
import { createObjectFromPath, useDebouncedFunction } from '@/shared/helpers';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type InputProjectEntriesAdapterProps = Exclude<Field, 'type'>;

export function InputProjectEntriesAdapter(props: InputProjectEntriesAdapterProps) {
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
    return (project: ProjectItem) => {
      const newEntries = [...entries as ProjectItem[]];
      newEntries[index] = project;
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
      website: '',
    }]);
  }

  return (
    <div>
      <h3>{props.label}</h3>
      {entries.map((project, index) => (
        <ProjectItemEditor
          key={index}
          id={String(index)}
          project={project}
          onUpdate={handleUpdate(index)}
          onDelete={handleOnDelete}
        />
      ))}
      <button onClick={handleOnAddNewEntry}>Add New Project</button>
    </div>
  );
}

type ProjectItemEditorProps = {
  id: string;
  project: ProjectItem;
  onUpdate: (project: ProjectItem) => void;
  onDelete: (id: string) => void;
};

function ProjectItemEditor(props: ProjectItemEditorProps) {
  const { project, onUpdate, onDelete, id } = props;

  const debouncedOnUpdate = useDebouncedFunction(onUpdate, 300);

  const handleNameChange = React.useCallback(
    (name: string) => {
      debouncedOnUpdate({ ...project, name });
    },
    [project, debouncedOnUpdate]
  );

  const handleDescriptionChange = React.useCallback(
    (description: string) => {
      debouncedOnUpdate({ ...project, description });
    },
    [project, debouncedOnUpdate]
  );

  const handleTechnologiesChange = React.useCallback(
    (technologiesStr: string) => {
      const technologies = technologiesStr
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);
      debouncedOnUpdate({ ...project, technologies });
    },
    [project, debouncedOnUpdate]
  );

  const handleRepositoryChange = React.useCallback(
    (repository: string) => {
      debouncedOnUpdate({ ...project, repository });
    },
    [project, debouncedOnUpdate]
  );

  const handleWebsiteChange = React.useCallback(
    (website: string) => {
      debouncedOnUpdate({ ...project, website });
    },
    [project, debouncedOnUpdate]
  );

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px 0' }}>
      <button
        onClick={() => onDelete(id)}
        style={{ float: 'right', background: 'red', color: 'white', border: 'none', padding: '4px 8px' }}
      >
        Delete
      </button>
      
      <InputText
        id={`project-name-${id}`}
        label="Project Name"
        value={project.name}
        onChange={handleNameChange}
      />

      <Textarea
        id={`project-description-${id}`}
        name={`project-description-${id}`}
        label="Description"
        value={project.description}
        onChange={handleDescriptionChange}
      />

      <InputText
        id={`project-technologies-${id}`}
        label="Technologies (comma-separated)"
        value={project.technologies.join(', ')}
        onChange={handleTechnologiesChange}
      />

      <InputText
        id={`project-repository-${id}`}
        label="Repository"
        value={project.repository || ''}
        onChange={handleRepositoryChange}
      />

      <InputText
        id={`project-website-${id}`}
        label="Website"
        value={project.website || ''}
        onChange={handleWebsiteChange}
      />
    </div>
  );
}