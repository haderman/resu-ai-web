import * as React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { apiState } from '@/state/api';

import {
  ContactContainer,
  ExperienceContainer,
  PhotoContainer,
  ProjectsContainer,
  SkillsContainer,
  ProfileContainer,
} from './content';
import { SelectableCard } from '../common';
import styles from './resume.module.scss';

const { selectors } = apiState.style;

export type ResumeProps = {};

export const Resume = React.forwardRef<HTMLDivElement, ResumeProps>(
  function ResumeComponent(props: ResumeProps, ref) {
    return (
      <Layout ref={ref}>
        <PhotoContainer />
        <ProfileContainer />
        <ContactContainer />
        <SkillsContainer />
        <ExperienceContainer />
        <ProjectsContainer />
      </Layout>
    );
  }
);

const Layout = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  function LayoutComponent(props, ref) {
    const selectedLayout = useSelector(selectors.selectLayout);

    return (
      <div ref={ref} className={classNames(styles.layout, styles.page)} data-layout={selectedLayout}>
        {props.children}
      </div>
    );
  }
);
