import { useSelector } from 'react-redux';

import { selectColor, selectBackground } from '@/state/experience';

import { Experience } from './component';

/**
 * This is the Experience component but connected to the store
 * @returns Profile component
 */
export function ExperienceContainer() {
  const color = useSelector(selectColor);
  const background = useSelector(selectBackground);

  return <Experience color={color} background={background} />;
}
