import * as React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { selectSelectedItem, editorSlice } from '@/state';

import { CvItem } from '../../types';
import styles from './style.module.scss';

const { actions } = editorSlice;

export type SelectableCardProps = React.PropsWithChildren<{
  item: CvItem
}>


export function SelectableCard(props: SelectableCardProps) {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectSelectedItem);

  function handleFocus(evt: React.FocusEvent<HTMLDivElement>) {
    evt.stopPropagation();
    dispatch(actions.setSelectedItem(props.item));
  }

  return (
    <div
      tabIndex={0}
      onFocus={handleFocus}
      data-is-slected={selectedItem === props.item}
      className={styles.selectable}
    >
      {props.children}
    </div>
  );
}
