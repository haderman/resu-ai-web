import Link from 'next/link';

import { apiState } from '@/state/api';
import { AuthButtonContainer } from '@/components/common';

import style from './header.module.scss';

export type HeaderProps = React.DataHTMLAttributes<{}>;

export function Header(props: HeaderProps) {
  return (
    <div className={style.header} {...props}>
      <h1>My CV</h1>
      <Link href="/">Home</Link>
      <ResumeSavingIndicator />
      <AuthButtonContainer />
    </div>
  );
}

function ResumeSavingIndicator() {
  const [_, { isLoading }] = apiState.resume.useResumeUpdaters();

  return (
    <span>
      {isLoading ? 'Saving...' : ''}
    </span>
  );
}
