import * as React from 'react';

import styles from './input-text.module.scss';

export type InputTextProps = InputBaseProps & {
  id: string
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
      <label htmlFor={props.id}>
        {props.label}:
      </label>
      <input
        {...props}
        type="text"
        id={props.id}
        value={props.value}
        onChange={handleChange}
      />
      <span className={styles.hint}>
        {props.hint ?? ''}
      </span>
    </div>
  );
}
