import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';

const { selectors } = apiState.style;

export type ThemeContainerProps = React.PropsWithChildren<{}>;

export function ThemeContainer(props: ThemeContainerProps) {
  const selectedTheme = useSelector(selectors.selectTheme);

  return (
    <div className="theme-container" data-resume-theme={selectedTheme}>
      {props.children}
    </div>
  );
}
