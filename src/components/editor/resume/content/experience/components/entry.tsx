import * as React from 'react';
import { useSelector } from 'react-redux';

import { Stack, Text } from '@/components/editor/common';
import { apiState } from '@/state/api';
import { Color, Experience, LocationType } from '@/shared/types';

import styles from '../styles.module.scss';

export type EntryProps = Experience['entries'][number];

export function Entry(props: EntryProps) {
  return (
    <Card>
      <header>
        <div data-side="left">
          <MemoText as="h2" weight="bold" size="medium" align="left">
            {props.company}
          </MemoText>
          <MemoText as="h3" weight="light" align="left">
            {props.title}
          </MemoText>
        </div>
        <div data-side="right">
          <MemoText align="right" color="blue">
            {props.location} - {LocationType.toFriendlyString(props.locationType)}
          </MemoText>
          <MemoText align="right" color="gray">
            {props.startDate} - {props.endDate}
          </MemoText>
        </div>
      </header>
      <ul>
        {props.achievements.map((a, idx) => {
          return (
            <li key={idx}>
              <MemoText as="p">
                {a}
              </MemoText>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function Card(props: React.PropsWithChildren<{}>) {
  const color = useSelector(
    selectResumeProperty<Color>('experience.entryStyle.background', 'secondary')
  );

  if (!Color.isColor(color)) {
    console.error('Invalid value type in Card');
    return null;
  }

  return (
    <Stack
      as="article"
      padding="medium"
      borderRadius="medium"
      color={color}
      className={styles.card}
    >
      {props.children}
    </Stack>
  );
}

const { selectResumeProperty } = apiState.resume.selectors;

const MemoText = React.memo(Text);
