import * as React from 'react';
import { IconCaretDown } from '@tabler/icons';

import styles from './combobox.module.scss';

export type ComboBoxProps = {
  id: string
  label?: string
  value?: string
  onChange?: (value: string) => void
}

export function Combobox(props: ComboBoxProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const labelId = `${props.id}-label`;
  const comboId = `${props.id}-combo`;
  const listboxId = `${props.id}-listbox`;

  const label = props.label || 'Combobox';
  const placeholder = props.value || 'Select an option';

  function handleComboClick() {
    setIsOpen(!isOpen);
  }

  function handleOpenChange(index: number) {
    setActiveIndex(index);
  }

  function handleOptionClick(index: number) {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      selectItem(index);
    };
  }

  function selectItem(index: number) {
    setSelectedIndex(index);
    setIsOpen(false);
  }

  function handleComboKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const max = options.length - 1;
    const action = getActionFromKey(event, isOpen);

    switch (action) {
      case 'last':
      case 'first':
        return setIsOpen(true);
      case 'next':
      case 'previous':
      case 'page-up':
      case 'page-down':
        event.preventDefault();
        return handleOpenChange(
          getUpdatedIndex(activeIndex, max, action)
        );
      case 'close-select':
        event.preventDefault();
        return selectItem(activeIndex);
      case 'close':
        event.preventDefault();
        return setIsOpen(false);
      case 'type':
        return handleComboType(event.key);
      case 'open':
        event.preventDefault();
        return setIsOpen(true);
    }
  }

  function handleComboType(letter: string) {

  }

  return (
    <div className={styles.root}>
      <label id={labelId} className="combo-label">
        {label}:
      </label>
      <div>
        <div
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={props.id}
          aria-activedescendant={`${props.id}-value-${activeIndex}`}
          id={comboId}
          className="combo-input"
          tabIndex={0}
          onClick={handleComboClick}
          onKeyDown={handleComboKeyDown}
        >
          <div>
            {selectedIndex !== undefined ? (
              <span>{options[selectedIndex].label}</span>
            ) : (
              <span>{placeholder}</span>
            )}
            <i aria-hidden="true">
              <IconCaretDown stroke={1} className={styles.icon} />
            </i>
          </div>
        </div>
        <div
          role="listbox"
          className={isOpen ? '' : 'visually-hidden'}
          id={listboxId}
          aria-labelledby={props.id}
          tabIndex={-1}
        >
          {isOpen && (
            <div>
              {options.map((option, idx) => {
                return (
                  <div
                    key={option.value}
                    id={`${props.id}-value-${option.value}`}
                    className="combo-option"
                    role="option"
                    aria-selected={activeIndex === idx}
                    onClick={handleOptionClick(idx)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' },
  { value: 'pear', label: 'Pear' },
  { value: 'peach', label: 'Peach' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'blackberry', label: 'Blackberry' },
];

type SelectAction =
  | 'close'
  | 'close-select'
  | 'first'
  | 'last'
  | 'next'
  | 'open'
  | 'page-down'
  | 'page-up'
  | 'previous'
  | 'select'
  | 'type';

function getActionFromKey(event: React.KeyboardEvent<HTMLDivElement>, menuOpen: boolean): SelectAction {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return 'open';
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return 'first';
  }
  if (key === 'End') {
    return 'last';
  }

  // handle typing characters when open or closed
  if (
    key === 'Backspace' ||
    key === 'Clear' ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return 'type';
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return 'close-select';
    } else if (key === 'ArrowDown' && !altKey) {
      return 'next';
    } else if (key === 'ArrowUp') {
      return 'previous';
    } else if (key === 'PageUp') {
      return 'page-up';
    } else if (key === 'PageDown') {
      return 'page-down';
    } else if (key === 'Escape') {
      return 'close';
    } else if (key === 'Enter' || key === ' ' || key === 'Tab') {
      return 'close-select';
    }
  }

  return 'select';
}

function getUpdatedIndex(currentIndex: number, maxIndex: number, action: SelectAction) {
  const pageSize = 10; // used for pageup/pagedown

  switch (action) {
    case 'first':
      return 0;
    case 'last':
      return maxIndex;
    case 'previous':
      return Math.max(0, currentIndex - 1);
    case 'next':
      return Math.min(maxIndex, currentIndex + 1);
    case 'page-up':
      return Math.max(0, currentIndex - pageSize);
    case 'page-down':
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}
