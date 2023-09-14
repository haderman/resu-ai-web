/**
 * this is based on https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 *
 * TODO: Refactor to improve readability and maintainability
 * TODO: Add support for disabled options
 * TODO: Add support for optgroups
 * TODO: Create abstraction for listbox
 * TODO: move to its own file the DOM manipulation functions (e.g. isScrollable, maintainScrollVisibility)
 */
import * as React from 'react';
import * as FloatingUI from '@floating-ui/react-dom';
import { IconCaretDown } from '@tabler/icons';

import { Portal } from '@/components/common';

import styles from './combobox.module.scss';
import * as DOMHelpers from '../helpers/dom';

export type ComboBoxProps = {
  id: string
  label: string
  placeholder: string
  value: string | undefined
  onChange: (value: string | undefined) => void
  options: { label: string, value: string }[]
  fullWidth?: boolean
}

export function Combobox(props: ComboBoxProps) {
  const { x, y, strategy, refs } = FloatingUI.useFloating({
    strategy: 'fixed',
    whileElementsMounted: FloatingUI.autoUpdate,
    middleware: [
      FloatingUI.offset({ mainAxis: 6 }),
      FloatingUI.flip(),
      FloatingUI.shift(),
      FloatingUI.size({
        apply({ rects }) {
          if (refs.floating.current) {
            refs.floating.current.style.width = `${rects.reference.width}px`;
          }
        },
      }),
    ],
  });

  const [state, dispatch] = React.useReducer(reducer, {
    isOpen: false,
    selectedIndex: findIndexFromValue(props.options, props.value),
    activeIndex: 0,
    max: props.options.length - 1,
  });

  const mutableStateRef = React.useRef<MutableState>({
    $options: [],
    $listbox: null,
    $combo: null,
    searchTimeout: undefined,
    searchString: '',
    previousState: state,
    ignoreBlur: false,
  });

  const addNodeToOptionsRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        mutableStateRef.current.$options.push(node);
      }
    },
    []
  );

  const { labelId, comboId, listboxId } = React.useMemo(() => {
    return {
      labelId: `${props.id}-label`,
      comboId: `${props.id}-combo`,
      listboxId: `${props.id}-listbox`,
    };
  }, [props.id]);

  React.useEffect(() => {
    if (!refs.floating.current) {
      return;
    }

    const { previousState } = mutableStateRef.current;

    const $option = mutableStateRef.current.$options[state.activeIndex];
    if (!$option || !refs.floating) {
      return;
    }

    if (DOMHelpers.isScrollable(refs.floating.current)) {
      DOMHelpers.maintainScrollVisibility($option, refs.floating.current, { offset: 6 });
    }

    if (!previousState.isOpen && state.isOpen) {
      const $selected = mutableStateRef.current.$options[state.selectedIndex || state.activeIndex];
      if (!DOMHelpers.isElementInView($selected)) {
        $selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    mutableStateRef.current.previousState = state;
  }, [state, refs.floating]);

  React.useEffect(() => {
    const index = findIndexFromValue(props.options, props.value);
    if (index) {
      dispatch({ type: 'select', index });
    }
  }, [props.value, props.options]);

  function handleComboClick() {
    dispatch({ type: state.isOpen ? 'close' : 'open' });
  }

  function handleOptionClick(index: number) {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch({ type: 'select', index });
      props.onChange(props.options[index].value);
      mutableStateRef.current.$combo?.focus();
    };
  }

  /**
   * I could have added event.preventDefault() to all the keydown events
   * but I decided to add it only to the ones that need it and don't interfere
   * with the default behavior of the browser in some cases, like pressing Tab or cmd+R
   */
  function handleComboKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    // handle opening when closed
    if (!state.isOpen && openKeys.includes(event.key)) {
      event.preventDefault();
      dispatch({ type: 'open' });
    }

    // home and end move the selected option when open or closed
    if (event.key === 'Home') {
      event.preventDefault();
      dispatch({ type: 'first' });
    }
    if (event.key === 'End') {
      event.preventDefault();
      return dispatch({ type: 'last' });
    }

    // handle typing characters when open or closed
    if (
      event.key === 'Backspace' ||
      event.key === 'Clear' ||
      (event.key.length === 1 && event.key !== ' ' && !event.altKey && !event.ctrlKey && !event.metaKey)
    ) {
      event.preventDefault();
      event.stopPropagation();
      handleComboType(event.key);
      dispatch({ type: 'type', letter: event.key });
    }

    if (!state.isOpen) {
      return;
    }

    switch (true) {
      case event.key === 'ArrowUp' && event.altKey:
        event.preventDefault();
        dispatch({ type: 'close-select' });
        break;
      case event.key === 'ArrowDown' && !event.altKey:
        event.preventDefault();
        dispatch({ type: 'next' });
        break;
      case event.key === 'ArrowUp':
        event.preventDefault();
        dispatch({ type: 'previous' });
        break;
      case event.key === 'PageUp':
        event.preventDefault();
        // return 'page-up';
        break;
      case event.key === 'PageDown':
        event.preventDefault();
        // return 'page-down';
        break;
      case event.key === 'Escape':
        event.preventDefault();
        dispatch({ type: 'close' });
        break;
      case event.key === 'Enter' || event.key === ' ':
        event.preventDefault();
        dispatch({ type: 'select', index: state.activeIndex });
        break;
      case event.key === 'Tab':
        dispatch({ type: 'select', index: state.activeIndex });
      default:
        break;
    }
  }

  function handleComboType(letter: string) {
    const searchString = getSearchString(letter);
    const searchIndex = getIndexByLetter(props.options, searchString, state.activeIndex + 1);

    // if a match was found, go to it
    if (searchIndex >= 0) {
      dispatch({ type: 'active', index: searchIndex });
    }
    // if no matches, clear the timeout and search string
    else {
      window.clearTimeout(mutableStateRef.current.searchTimeout);
      mutableStateRef.current.searchString = '';
    }
  }

  function handleComboBlur() {
    if (mutableStateRef.current.ignoreBlur) {
      mutableStateRef.current.ignoreBlur = false;
      return;
    }

    if (state.isOpen) {
      dispatch({ type: 'close' });
    }
  }

  function getSearchString(char: string) {
    if (typeof mutableStateRef.current.searchTimeout === 'number') {
      clearTimeout(mutableStateRef.current.searchTimeout);
    }

    mutableStateRef.current.searchTimeout = window.setTimeout(() => {
      mutableStateRef.current.searchString = '';
    }, 500);

    mutableStateRef.current.searchString = mutableStateRef.current.searchString + char;
    return mutableStateRef.current.searchString;
  }

  return (
    <div className={styles.root} data-full-width={props.fullWidth}>
      <label id={labelId}>
        {props.label || 'Select an Option'}:
      </label>
      <div>
        <div
          role="combobox"
          ref={refs.setReference}
          aria-controls={listboxId}
          aria-expanded={state.isOpen}
          aria-haspopup="listbox"
          aria-labelledby={props.id}
          aria-activedescendant={`${props.id}-value-${state.activeIndex}`}
          id={comboId}
          tabIndex={0}
          onClick={handleComboClick}
          onKeyDown={handleComboKeyDown}
          onBlur={handleComboBlur}
        >
          <div>
            {state.selectedIndex !== undefined ? (
              <span>{props.options[state.selectedIndex].label}</span>
            ) : (
              <span>{props.placeholder || 'Select Option'}</span>
            )}
            <i aria-hidden="true">
              <IconCaretDown stroke={1} className={styles.icon} />
            </i>
          </div>
        </div>
        <Portal>
          <div
            role="listbox"
            className={`${styles.popup} ${state.isOpen ? '' : 'visually-hidden'}`}
            id={listboxId}
            data-expanded={state.isOpen}
            aria-labelledby={props.id}
            tabIndex={-1}
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
            }}
          >
            <div>
              {props.options.map((option, idx) => {
                return (
                  <div
                    role="option"
                    key={option.value}
                    ref={addNodeToOptionsRef}
                    id={`${props.id}-value-${option.value}`}
                    aria-selected={state.selectedIndex === idx}
                    data-active={state.activeIndex === idx}
                    onClick={handleOptionClick(idx)}
                    onMouseDown={() => { mutableStateRef.current.ignoreBlur = true; }}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
        </Portal>
      </div>
    </div>
  );
}

type Options = ComboBoxProps['options'];

type State = {
  isOpen: boolean
  selectedIndex: number | undefined
  activeIndex: number
  max: number
}

type MutableState = {
  $options: HTMLDivElement[]
  $listbox: HTMLDivElement | null
  $combo: HTMLDivElement | null
  searchTimeout: number | undefined
  searchString: string
  previousState: State
  ignoreBlur: boolean
}

type Action =
  | { type: 'open' }
  | { type: 'close' }
  | { type: 'close-select' }
  | { type: 'select', index: number }
  | { type: 'active', index: number }
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'first' }
  | { type: 'last' }
  | { type: 'type', letter: string }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true };
    case 'close':
      return {
        ...state,
        isOpen: false,
        activeIndex: state.selectedIndex || state.activeIndex,
      };
    case 'select':
      return {
        ...state,
        selectedIndex: action.index,
        isOpen: false,
        activeIndex: action.index,
      };
    case 'active':
      return { ...state, activeIndex: action.index, isOpen: true };
    case 'next':
    case 'previous':
      return {
        ...state,
        activeIndex: getUpdatedIndex(state.activeIndex, state.max, action.type)
      };
    default:
      return state;
  }
}

function getUpdatedIndex(currentIndex: number, maxIndex: number, action: Action['type']) {
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
    // case 'page-up':
    //   return Math.max(0, currentIndex - pageSize);
    // case 'page-down':
    //   return Math.min(maxIndex, currentIndex + pageSize);
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

function findIndexFromValue(options: Options, value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  return options.findIndex((option) => option.value === value) || 0;
}
