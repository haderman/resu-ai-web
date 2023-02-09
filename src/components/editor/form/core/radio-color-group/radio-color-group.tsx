import { Color } from '@/shared/types';
import * as React from 'react';
import { IconCheck } from '@tabler/icons';

import styles from './radio-color-group.module.scss';

export type RadioColorGroupProps = {
  legend: string
  name: string
  selected: Color
  onChange: (value: Color) => void
};

export function RadioColorGroup(props: RadioColorGroupProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value as Color);
  }

  return (
    <div
      role="radiogroup"
      aria-labelledby="group-options"
      className={styles.root}
      onChange={handleChange}
    >
      <p id="group-options">{props.legend}</p>
      <div className={styles.wrapper}>
        {Color.values.map((color) => {
          return (
            <MemoizedItem
              key={color}
              color={color}
              label={Color.toLabel(color)}
              name={props.name}
              checked={color === props.selected}
            />
          );
        })}
      </div>
    </div>
  );
}

function HiddenSpan(props: { children: React.ReactNode }) {
  return <span className="visually-hidden">{props.children}</span>;
}

type ItemProps = {
  color: Color
  label: string
  name: string
  checked: boolean
}

const MemoizedItem = React.memo(Item);

function Item(props: ItemProps) {
  return (
    <label htmlFor={props.color} className={styles.label}>
      <input
        type="radio"
        id={props.color}
        name={props.name}
        value={props.color}
        defaultChecked={props.checked}
      />
      <Circle color={props.color} />
      <HiddenSpan>{props.color}</HiddenSpan>
    </label>
  );
}

export type CircleProps = {
  color: Color
}

function Circle(props: CircleProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={styles.colored}
      data-color={props.color}
    >
      <circle cx="50" cy="50" r="50" />
      <IconCheck x="10%" y="15%" size={72} strokeWidth={2} className={styles.check} />
    </svg>
  );
}
