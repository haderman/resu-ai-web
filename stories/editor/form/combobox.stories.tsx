import * as React from 'react';
import { useState } from '@storybook/preview-api';

import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '@/components/editor/form';
import { Container } from '../../helpers';

const meta: Meta<typeof Combobox> = {
  title: 'editor/form/combobox',
  component: Combobox,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const ITEMS = [1, 2, 3, 4, 5, 6];

const OPTIONS = [
  { value: 'afghanistan', label: 'Afghanistan' },
  { value: 'albania', label: 'Albania' },
  { value: 'algeria', label: 'Algeria' },
  { value: 'andorra', label: 'Andorra' },
  { value: 'angola', label: 'Angola' },
];

export const Basic: Story = {
  args: {},
  render: function Wrapper(args) {
    const [selected, setSelected] = useState<string | undefined>(undefined);

    return (
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            alignItems: 'center',
            gap: '200px',
            overflow: 'auto',
            height: '100%',
            width: '300px',
            background: 'hsl(210 10% 30%)',
          }}
        >
          {ITEMS.map((item) => {
            return (
              <Combobox
                key={item}
                fullWidth
                id={`example-${item}`}
                options={OPTIONS}
                label="Example"
                placeholder="Select a country"
                value={selected}
                onChange={setSelected}
              />
            );
          })}
        </div>
      </Container>
    );
  }
};
