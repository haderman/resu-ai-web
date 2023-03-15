import * as React from 'react';
import { IconCaretDown } from '@tabler/icons';

import styles from './combobox.module.scss';

export type ComboBoxProps = {
  id: string
  label?: string
  value?: string
  onChange?: (value: string) => void
  options: { label: string, value: string }[]
}

type Options = ComboBoxProps['options'];

export function Combobox(props: ComboBoxProps) {
  const searchTimeoutRef = React.useRef<number | undefined>(undefined);
  const searchStringRef = React.useRef<string>('');

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
    const max = props.options.length - 1;
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
        event.preventDefault();
        event.stopPropagation();
        return handleComboType(event.key);
      case 'open':
        event.preventDefault();
        return setIsOpen(true);
    }
  }

  function handleComboType(letter: string) {
    setIsOpen(true);

    const searchString = getSearchString(letter);
    const searchIndex = getIndexByLetter(props.options, searchString, activeIndex + 1);

    // if a match was found, go to it
    if (searchIndex >= 0) {
      setActiveIndex(searchIndex);
    }
    // if no matches, clear the timeout and search string
    else {
      window.clearTimeout(searchTimeoutRef.current);
      searchStringRef.current = '';
    }
  }

  function getSearchString(char: string) {
    if (typeof searchTimeoutRef.current === 'number') {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      searchStringRef.current = '';
    }, 500);

    searchStringRef.current = searchStringRef.current + char;
    return searchStringRef.current;
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
              <span>{props.options[selectedIndex].label}</span>
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
              {props.options.map((option, idx) => {
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

// return the index of an option from an array of options, based on a search string
// if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
function getIndexByLetter(options: Options, filter: string, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array: string[]) => array.every((letter) => letter === array[0]);

  // first check if there is an exact match for the typed string
  if (firstMatch) {
    return options.indexOf(firstMatch);
  }

  // if the same letter is being repeated, cycle through first-letter matches
  else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  }

  // if no matches, return -1
  else {
    return -1;
  }
}

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(options: Options = [], filter: string, exclude: Options = []) {
  return options.filter((option) => {
    const matches = option.value.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}
