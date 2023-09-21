import * as React from 'react';

import styles from './text-area.module.scss';

export type TextareaProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
};

export function Textarea(props: TextareaProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const labelId = React.useMemo(() => `label-${Math.random()}`, []);
  const descriptionId = React.useMemo(() => `description-${Math.random()}`, []);

  React.useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = '0';
    const newHeight = calculateHeight(textAreaRef.current);
    textAreaRef.current.style.height = `${newHeight}px`;
  }, [props.value]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!props.onEnter) {
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      props.onEnter();
    }
  }

  return (
    <div className={styles.wrapper}>
      <span
        aria-label={props.label}
        id={labelId}
        className={styles.label}
      >
        {props.label}:
        </span>
      <textarea
        ref={textAreaRef}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ overflow: 'hidden' }}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        className={styles.textarea}
        onKeyDown={handleKeyDown}
      />
      <Hint id={descriptionId} />
    </div>
  );
}

type HintProps = {
  id: string;
};

function Hint(props: HintProps) {
  return (
    <div id={props.id} className={styles.hint}>
      <span>Use <kbd>Cmd</kbd> + <kbd>b</kbd> to <strong>bold</strong> and use <kbd>Cmd</kbd> + <kbd>i</kbd> to <i>italic</i></span>
    </div>
  );
}

function calculateHeight(textarea: HTMLTextAreaElement): number {
  const border = getComputedBorder(textarea);
  const fontSize = parseFloat(window.getComputedStyle(textarea).fontSize);

  const padTop = parseFloat(getComputedStyle(textarea).paddingTop);
  const padBottom = parseFloat(getComputedStyle(textarea).paddingBottom);
  const pad = padTop + padBottom;

  // const calculatedHeight = Math.min(textarea.scrollHeight - pad, 2 * fontSize);
  const calculatedHeight = Math.min(textarea.scrollHeight + border, 10 * fontSize);
  return calculatedHeight;

  // const padTop = parseFloat(getComputedStyle(textarea).paddingTop);
  // const padBottom = parseFloat(getComputedStyle(textarea).paddingBottom);
  // const pad = padTop + padBottom - border;
  // return textarea.scrollHeight + border;
}

function getComputedBorder(element: HTMLElement) {
  const computedStyle = window.getComputedStyle(element);
  const borderTop = parseFloat(computedStyle.borderTopWidth);
  const borderBottom = parseFloat(computedStyle.borderBottomWidth);
  return borderTop + borderBottom;
}
