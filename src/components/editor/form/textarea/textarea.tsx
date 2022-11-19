import styles from './textarea.module.scss';

export type TextareaProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Textarea(props: TextareaProps) {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    props.onChange(event.target.value);
  }

  return (
    <textarea
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder}
      className={styles.textarea}
    />
  );
}
