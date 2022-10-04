import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skills } from '@/components/cv/content';
import type { SkillsData } from '@/components/cv/content/skills';
import type { Color } from '@/components/cv/types';

import { ResizableBox } from '../../helpers';
import { Container } from '../../helpers/container';

export default {
  title: 'CV/content/skills',
  component: Skills,
  argTypes: {
    background: { defaultValue: 'secondary' as Color },
    color: { defaultValue: 'blue' as Color },
    data: {
      defaultValue: [
        { name: 'Typescript', years: 2 },
        { name: 'Css', years: 6 },
        { name: 'Html', years: 6 },
        { name: 'React', years: 5 },
      ] as SkillsData,
    },
  },
} as ComponentMeta<typeof Skills>;

export const Basic: ComponentStory<typeof Skills> = (args) => (
  <Container>
    <ResizableBox>
      <Skills {...args} />
    </ResizableBox>
  </Container>
);
