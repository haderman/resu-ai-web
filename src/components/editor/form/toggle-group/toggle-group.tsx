import * as React from 'react';
import styles from './toggle-group.module.scss';

export type ToggleGroupProps = {
  legend: string
  name: string
  selected: string | null
  onChange: (value: string | null) => void
  children: JSX.Element | JSX.Element[]
};

export function ToggleGroup(props: ToggleGroupProps) {
  const refButtons = React.useRef<HTMLButtonElement[]>([]);

  const addNodeToRefButtons = React.useCallback(
    (node: HTMLButtonElement) => {
      if (node !== null) {
        refButtons.current.push(node);
      }
    },
    []
  );

  if (!checkIfChildrenAreToggleGroupItems(props.children)) {
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
        const nextNode = refButtons.current[idx === 0 ? refButtons.current.length - 1 : idx - 1];
        nextNode.focus();
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        const nextNode = refButtons.current[(idx + 1) % refButtons.current.length];
        nextNode.focus();
      }
    };
  }

  return (
    <div
      className={styles.root}
      role="group"
      aria-labelledby="group-options"
    >
      <p id="group-options">
        {props.legend}:
      </p>
      {React.Children.map(props.children, (child, idx) => {
        return React.cloneElement(child, {
          id: idx,
          ref: addNodeToRefButtons,
          onClick: handleClick(child.props.value),
          onKeyDown: handleKeyDown(idx),
          name: props.name,
          isSelected: child.props.value === props.selected,
         });
      })}
    </div>
  );
}

export type ToggleGroup = typeof ToggleGroup & {
  Item: typeof ToggleGroupItem
};

export type ToggleGroupItemProps = React.PropsWithChildren<{
  id: string
  value: string
  isSelected?: boolean
  label?: string
  name?: string
}>;

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  function ToggleGroupItem(props, ref) {
    const {
      isSelected,
      label,
      children,
      ...restProps
    } = props;

    return (
      <button
        type="button"
        role="radio"
        aria-checked={isSelected}
        aria-label={label}
        className={styles.btn}
        {...restProps}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

ToggleGroup.Item = ToggleGroupItem;

// HELPERS
function checkIfChildrenAreToggleGroupItems(children: JSX.Element | JSX.Element[]) {
  if (Array.isArray(children)) {
    return children.every((child) => child.type === ToggleGroupItem);
  } else {
    return children.type === ToggleGroupItem;
  }
}
