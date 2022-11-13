import styled from 'styled-components';

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
    />
  );
}

const StyledTextarea = styled.textarea`
  flex: 1;
  resize: vertical;
  width: 100%;
  min-height: 200px;
  max-height: 250px;
`;
