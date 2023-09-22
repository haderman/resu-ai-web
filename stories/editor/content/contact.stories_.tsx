import type { Meta, StoryObj } from '@storybook/react';

import { Contact } from '@/components/editor/resume/content';
import { Container } from '../../helpers/container';

const meta: Meta<typeof Contact> = {
  title: 'editor/content/contact',
  component: Contact,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Contact>

export const Basic: Story = {
  args: {},
  render: (args) => {
    return (
      <Container>
        <Contact />
      </Container>
    );
  }
};
