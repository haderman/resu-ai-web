import { CvTheme } from "../themes";

export type ThemeSwitchProps = {
  value: CvTheme
  onChange: (theme: CvTheme) => void
}

export function ThemeSwitch(props: ThemeSwitchProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.value as CvTheme);
  }

  return (
    <div style={{ backgroundColor: 'gray' }}>
      <label>
        <input type="radio" name="theme" value="dark-space" onChange={handleChange} />
        Dark Space
      </label>
      <label>
        <input type="radio" name="theme" value="light-space" onChange={handleChange} />
        Light Space
      </label>
    </div>
  );
}
