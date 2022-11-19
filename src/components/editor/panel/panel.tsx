import { useSelector } from 'react-redux';

import { selectSelectedItem } from '@/state';

import { CvItem } from '../types';
import {
  ContactOptions,
  ProfileOptions,
  SkillsOptions,
  ExperienceOptions,
  PhotoOptions,
  ProjectsOptions,
} from '../resume/content';
import styles from './panel.module.scss';

export type PanelProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'id'>;

export function Panel(props: PanelProps) {
  const selectedItem = useSelector(selectSelectedItem);

  const optionsMap: Record<CvItem, JSX.Element | null> = {
    contact: <ContactOptions />,
    education: null,
    experience: <ExperienceOptions />,
    skills: <SkillsOptions />,
    photo: <PhotoOptions />,
    profile: <ProfileOptions />,
    projects: <ProjectsOptions />,
  };

  const ControlsComponent = selectedItem && selectedItem in optionsMap
    ? optionsMap[selectedItem]
    : null;

  return (
    <div {...props} className={styles.panel}>
      {ControlsComponent}
    </div>
  );
}

