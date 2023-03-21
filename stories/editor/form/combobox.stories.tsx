import * as React from 'react';
import { useAddonState } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Combobox } from '@/components/editor/form';
import { Container, ResizableBox } from '../../helpers';

export default {
  title: 'editor/form/combobox',
  component: Combobox,
  argTypes: {},
} as ComponentMeta<typeof Combobox>;

export const Basic: ComponentStory<typeof Combobox> = (args) => {
  const [selected, setSelected] = useAddonState<string | undefined>('editor/form/combobox', undefined);

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
};

const ITEMS = [1, 2, 3, 4, 5, 6];

const OPTIONS = [
  { value: 'afghanistan', label: 'Afghanistan' },
  { value: 'albania', label: 'Albania' },
  { value: 'algeria', label: 'Algeria' },
  { value: 'andorra', label: 'Andorra' },
  { value: 'angola', label: 'Angola' },
  { value: 'antigua and barbuda', label: 'Antigua and Barbuda' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'armenia', label: 'Armenia' },
  { value: 'australia', label: 'Australia' },
  { value: 'austria', label: 'Austria' },
  { value: 'azerbaijan', label: 'Azerbaijan' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'bahrain', label: 'Bahrain' },
  { value: 'bangladesh', label: 'Bangladesh' },
  { value: 'barbados', label: 'Barbados' },
  { value: 'belarus', label: 'Belarus' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'belize', label: 'Belize' },
  { value: 'benin', label: 'Benin' },
  { value: 'bhutan', label: 'Bhutan' },
  { value: 'bolivia', label: 'Bolivia' },
  { value: 'bosnia and herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'botswana', label: 'Botswana' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'brunei', label: 'Brunei' },
  { value: 'bulgaria', label: 'Bulgaria' },
  { value: 'burkina faso', label: 'Burkina Faso' },
  { value: 'burundi', label: 'Burundi' },
  { value: 'cambodia', label: 'Cambodia' },
  { value: 'cameroon', label: 'Cameroon' },
  { value: 'canada', label: 'Canada' },
  { value: 'cape verde', label: 'Cape Verde' },
  { value: 'central african republic', label: 'Central African Republic' },
  { value: 'chad', label: 'Chad' },
  { value: 'chile', label: 'Chile' },
  { value: 'china', label: 'China' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'comoros', label: 'Comoros' },
  { value: 'congo', label: 'Congo' },
  { value: 'costa rica', label: 'Costa Rica' },
  { value: 'croatia', label: 'Croatia' },
  { value: 'cuba', label: 'Cuba' },
  { value: 'cyprus', label: 'Cyprus' },
];
