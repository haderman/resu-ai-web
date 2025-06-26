import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { AuthButtonContainer } from '@/components/common';
import { selectMode, settingsSlice } from '@/state/settings';

import style from './header.module.scss';

export type HeaderProps = React.DataHTMLAttributes<{}>;

export function Header(props: HeaderProps) {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  const handleModeSwitch = () => {
    dispatch(settingsSlice.actions.setMode(mode === 'chat' ? 'panel' : 'chat'));
  };

  return (
    <div className={style.header} {...props}>
      <h1>My CV</h1>
      <Link href="/">Home</Link>
      {/* <ResumeSavingIndicator />
      <AuthButtonContainer /> */}
      <button
        onClick={handleModeSwitch}
        style={{
          padding: '0.4em 1em',
          borderRadius: '6px',
          background: '#f3f4f6',
          color: '#222',
          fontWeight: 500,
          border: '1px solid #d1d5db',
          cursor: 'pointer',
        }}
      >
        Switch to {mode === 'chat' ? 'panel' : 'chat'} mode
      </button>
    </div>
  );
}

function ResumeSavingIndicator() {
  const [{ isLoading }] = apiState.resume.useResumeUpdateStatus();

  return (
    <span>
      {isLoading ? 'Saving...' : ''}
    </span>
  );
}
