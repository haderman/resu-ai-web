import { useSelector } from 'react-redux';

import { selectSelectedItem } from '@/state';

import { CvItem } from './types';
import {
  ContactOptions,
  ProfileOptions,
  SkillsOptions,
  ExperienceOptions,
  PhotoOptions,
  ProjectsOptions,
} from './resume/content';

export type CustomizationPanelProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'id'>;

export function CustomizationPanel(props: CustomizationPanelProps) {
  const selectedItem = useSelector(selectSelectedItem);

  const customizationOptionsMap: Record<CvItem, JSX.Element | null> = {
    contact: <ContactOptions />,
    education: null,
    experience: <ExperienceOptions />,
    skills: <SkillsOptions />,
    photo: <PhotoOptions />,
    profile: <ProfileOptions />,
    projects: <ProjectsOptions />,
  };

  const ControlsComponent = selectedItem && selectedItem in customizationOptionsMap
    ? customizationOptionsMap[selectedItem]
    : null;

  return (
    <div {...props}>
      {ControlsComponent}
    </div>
  );
}

