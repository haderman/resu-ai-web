import Link from 'next/link';

import style from './home.module.scss';

export function Home() {
  return (
    <div className={style.home}>
      <h1>Haderman</h1>
      <Link href="/editor">Editor</Link>
    </div>
  );
}
