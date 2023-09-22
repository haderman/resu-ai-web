import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import type { Color } from '@/shared/types';
import { Skills } from '@/components/editor/resume/content';

import { ResizableBox } from '../../helpers';
import { Container } from '../../helpers/container';

export default {
  title: 'editor/content/skills',
  component: Skills,
  // argTypes: {
  //   background: { defaultValue: 'secondary' as Color },
  //   color: { defaultValue: 'blue' as Color },
  //   data: {
  //     defaultValue: [
  //       { title: 'Typescript', yearsOfExperience: 2 },
  //       { title: 'Css', yearsOfExperience: 6 },
  //       { title: 'Html', yearsOfExperience: 6 },
  //       { title: 'React', yearsOfExperience: 5 },
  //     ] as SkillsProps['data'],
  //   },
  // },
} as ComponentMeta<typeof Skills>;

export const Basic: ComponentStory<typeof Skills> = (args) => (
  <Container>
    <ResizableBox>
      <Skills />
    </ResizableBox>
  </Container>
);
