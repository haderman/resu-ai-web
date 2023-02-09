import { Color } from '@/shared/types';
import * as React from 'react';
import { IconCheck } from '@tabler/icons';

import styles from './radio-group.module.scss';

export type RadioGroupProps = {
  legend: string
  name: string
  selected: string | null
  onChange: (value: string | null) => void
  children: JSX.Element | JSX.Element[]
};

export function RadioGroup(props: RadioGroupProps) {
  const refButtons = React.useRef<HTMLElement[]>([]);


  const addNodeToRefButtons = React.useCallback(
    (node: HTMLButtonElement) => {
      if (node !== null) {
        refButtons.current.push(node);
      }
    },
    []
  );

  if (!checkIfChildrenAreRadioGroupItems(props.children)) {
    throw new Error('ToggleGroup children must be of type ToggleGroup.Item');
  }

  function handleClick(value: string) {
    return () => {
      props.onChange(props.selected === value ? null : value);
    };
  }

  function handleKeyDown(idx: number) {
    return (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const nextNode = refButtons.current[idx === 0 ? refButtons.current.length - 1 : idx - 1];
        nextNode.focus();
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const nextNode = refButtons.current[(idx + 1) % refButtons.current.length];
        nextNode.focus();
      }
    };
  }

  function handleChange(event: React.ChangeEvent<HTMLFieldSetElement>) {
    // @ts-ignore
    console.log(event.target.value);
  }

  return (
    <div role="radiogroup" aria-labelledby="group-options" className={styles.root}>
      <p id="group-options">Example:</p>
      <div className={styles.wrapper}>
        <label htmlFor="r-1" className={styles.label}>
          <input type="radio" id="r-1" name="example" value="a" />
          <Circle color="green" />
          <HiddenSpan>option a</HiddenSpan>
        </label>
        <label htmlFor="r-2" className={styles.label}>
          <input type="radio" id="r-2" name="example" value="b" />
          <Circle color="pink" />
          <HiddenSpan>option b</HiddenSpan>
        </label>
        <label htmlFor="r-3" className={styles.label}>
          <input type="radio" id="r-3" name="example" value="c" />
          <Circle color="blue" />
          <HiddenSpan>option c</HiddenSpan>
        </label>
      </div>
    </div>
  );
}

function HiddenSpan(props: { children: React.ReactNode }) {
  return <span className="visually-hidden">{props.children}</span>;
}


export type RadioGroup = typeof RadioGroup & {
  Item: typeof RadioGroupItem
};

export type RadioGroupItemProps = React.PropsWithChildren<{
  label: string
  value: string
  id?: string
  isSelected?: boolean
  tabIndex?: number
  name?: string
}>;

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem(props, ref) {
    const {
      isSelected,
      label,
      children,
      tabIndex,
      ...restProps
    } = props;

    return (
      <fieldset>
        <legend>
          {label}
        </legend>
        <label htmlFor="a">
          <input id="a" type="radio" checked />
          option 1
        </label>
        <label htmlFor="b">
          <input id="b" type="radio" />
          option 2
        </label>
        <label htmlFor="c">
          <input id="c" type="radio" />
          option 3
        </label>
      </fieldset>
    );
  }
);

RadioGroup.Item = RadioGroupItem;

// HELPERS
function checkIfChildrenAreRadioGroupItems(children: JSX.Element | JSX.Element[]) {
  if (Array.isArray(children)) {
    return children.every((child) => child.type === RadioGroupItem);
  } else {
    return children.type === RadioGroupItem;
  }
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
      data-color={props.color}
    >
      <circle cx="50" cy="50" r="50" />
      <IconCheck x="10%" y="15%" size={72} strokeWidth={2} className={styles.check} />
    </svg>
  );
}
