import { useSelector } from 'react-redux';

import { selectColor } from '@/state/contact';

import { Contact } from './component';

/**
 * This is a test
 * @returns
 */
export function ContactContainer() {
  const color = useSelector(selectColor);

  return <Contact color={color} />;
}
