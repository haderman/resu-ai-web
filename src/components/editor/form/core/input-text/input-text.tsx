import * as React from 'react';

import styles from './input-text.module.scss';

export type InputTextProps = InputBaseProps & {
  value: string
  label: string
  onChange: (value: string) => void
  hint?: string
}

type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'>

export function InputText(props: InputTextProps): JSX.Element {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="input-test">{props.label}:</label>
      <input
        {...props}
        id="input-test"
        type="text"
        value={props.value}
        onChange={handleChange}
      />
      <span className={styles.hint}>
        {props.hint ?? ''}
      </span>
    </div>
  );
}
