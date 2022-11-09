export type InputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Input(props: InputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value);
  }

  return (
    <input
      type="text"
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder}
      style={{ flex: 1 }}
    />
  );
}
