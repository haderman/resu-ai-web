import * as React from 'react';
import styles from './toggle-group.module.scss';

export type ToggleGroupProps = {
  legend: string
  name: string
  selected: string | null
  onChange: (value: string | null) => void
  children: JSX.Element | JSX.Element[]
};

export function ToggleGroup<T>(props: ToggleGroupProps) {
  if (!checkIfChildrenAreToggleGroupItems(props.children)) {
    throw new Error('ToggleGroup children must be of type ToggleGroup.Item');
  }

  function handleClick(value: string) {
    return () => {
      props.onChange(props.selected === value ? null : value);
    };
  }

  return (
    <div className={styles.root} role="group" aria-labelledby="group-options">
      <p id="group-options">
        {props.legend}:
      </p>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          onClick: handleClick(child.props.value),
          name: props.name,
          'aria-pressed': child.props.value === props.selected,
         });
      })}
    </div>
  );
}

export type ToggleGroup = typeof ToggleGroup & {
  Item: typeof ToggleGroupItem
};

ToggleGroup.Item = ToggleGroupItem;

export type ToggleGroupItemProps = {
  id: string
  label?: string
  value: string
  name?: string
  children?: JSX.Element
};

function ToggleGroupItem(props: ToggleGroupItemProps) {
  return (
    <button
      type="button"
      aria-label={props.label}
      className={styles.btn}
      {...props}
    >
      {props.children}
    </button>
  );
}

// HELPERS
function checkIfChildrenAreToggleGroupItems(children: JSX.Element | JSX.Element[]) {
  if (Array.isArray(children)) {
    return children.every((child) => child.type === ToggleGroupItem);
  } else {
    return children.type === ToggleGroupItem;
  }
}
