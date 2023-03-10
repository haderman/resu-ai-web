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

  const handleFocus = React.useCallback(
    (evt: React.FocusEvent<HTMLDivElement>) => {
      evt.stopPropagation();
      dispatch(actions.setSelectedItem(props.item));
    }, [dispatch, props.item]
  );

  return (
    <MemoizedSelectableCardComponent
      isSelected={selectedItem === props.item}
      onFocus={handleFocus}
    >
      {props.children}
    </MemoizedSelectableCardComponent>
  );
}

type SelectableCardComponentProps = React.PropsWithChildren<{
  isSelected: boolean
  onFocus: (evt: React.FocusEvent<HTMLDivElement>) => void
}>

const MemoizedSelectableCardComponent = React.memo(
  function SelectableCardComponent(props: SelectableCardComponentProps) {
    return (
      <div
        tabIndex={0}
        onFocus={props.onFocus}
        data-is-selected={props.isSelected}
        className={styles.selectable}
      >
        {props.children}
      </div>
    );
  }
);
