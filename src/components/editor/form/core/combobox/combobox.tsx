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

export function Combobox(props: ComboBoxProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    isOpen: false,
    selectedIndex: undefined,
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

  const label = props.label || 'Combobox';
  const placeholder = props.value || 'Select an option';

  React.useEffect(() => {
    const { previousState } = mutableStateRef.current;

    const $option = mutableStateRef.current.$options[state.activeIndex];
    if (!$option || !mutableStateRef.current.$listbox) {
      return;
    }

    if (isScrollable(mutableStateRef.current.$listbox)) {
      maintainScrollVisibility($option, mutableStateRef.current.$listbox);
    }

    if (!previousState.isOpen && state.isOpen) {
      console.log('opened');
      if (!isElementInView($option)) {
        $option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    mutableStateRef.current.previousState = state;
  }, [state]);

  function handleComboClick() {
    dispatch({ type: state.isOpen ? 'close' : 'open' });
  }

  function handleOptionClick(index: number) {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      dispatch({ type: 'select', index });
      mutableStateRef.current.$combo?.focus();
    };
  }

  function handleComboKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    // handle opening when closed
    if (!state.isOpen && openKeys.includes(event.key)) {
      dispatch({ type: 'open' });
    }

    // home and end move the selected option when open or closed
    if (event.key === 'Home') {
      dispatch({ type: 'first' });
    }
    if (event.key === 'End') {
      return dispatch({ type: 'last' });
    }

    // handle typing characters when open or closed
    if (
      event.key === 'Backspace' ||
      event.key === 'Clear' ||
      (event.key.length === 1 && event.key !== ' ' && !event.altKey && !event.ctrlKey && !event.metaKey)
    ) {
      event.stopPropagation();
      handleComboType(event.key);
      dispatch({ type: 'type', letter: event.key });
    }

    if (!state.isOpen) {
      return;
    }

    if (event.key === 'ArrowUp' && event.altKey) {
      dispatch({ type: 'close-select' });
    } else if (event.key === 'ArrowDown' && !event.altKey) {
      dispatch({ type: 'next' });
    } else if (event.key === 'ArrowUp') {
      dispatch({ type: 'previous' });
    } else if (event.key === 'PageUp') {
      // return 'page-up';
    } else if (event.key === 'PageDown') {
      // return 'page-down';
    } else if (event.key === 'Escape') {
      dispatch({ type: 'close' });
    } else if (event.key === 'Enter' || event.key === ' ' || event.key === 'Tab') {
      dispatch({ type: 'select', index: state.activeIndex });
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
    <div className={styles.root}>
      <label id={labelId} className="combo-label">
        {label}:
      </label>
      <div>
        <div
          role="combobox"
          ref={ref => { mutableStateRef.current.$combo = ref; }}
          aria-controls={listboxId}
          aria-expanded={state.isOpen}
          aria-haspopup="listbox"
          aria-labelledby={props.id}
          aria-activedescendant={`${props.id}-value-${state.activeIndex}`}
          id={comboId}
          className="combo-input"
          tabIndex={0}
          onClick={handleComboClick}
          onKeyDown={handleComboKeyDown}
          onBlur={handleComboBlur}
        >
          <div>
            {state.selectedIndex !== undefined ? (
              <span>{props.options[state.selectedIndex].label}</span>
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
          ref={ref => { mutableStateRef.current.$listbox = ref; }}
          className={state.isOpen ? '' : 'visually-hidden'}
          id={listboxId}
          aria-labelledby={props.id}
          tabIndex={-1}
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
      </div>
    </div>
  );
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

// check if element is visible in browser view port
function isElementInView($element: HTMLElement) {
  var bounding = $element.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

// check if an element is currently scrollable
function isScrollable(element: HTMLElement) {
  return element && element.clientHeight < element.scrollHeight;
}

// ensure a given child element is within the parent's visible scroll area
// if the child is not visible, scroll the parent
function maintainScrollVisibility(activeElement: HTMLElement, scrollParent: HTMLElement) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}
