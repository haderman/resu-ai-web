import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import type { Color } from '@/shared/types';

import { Skills } from '@/components/editor/content';
import type { SkillsData } from '@/components/editor/content/skills';

import { ResizableBox } from '../../helpers';
import { Container } from '../../helpers/container';

export default {
  title: 'editor/content/skills',
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
