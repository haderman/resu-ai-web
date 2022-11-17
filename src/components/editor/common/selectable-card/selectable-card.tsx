import * as React from 'react';
import styled from 'styled-components';
import { useSelector, useStore } from 'react-redux';

import { selectSelectedItem, editorSlice } from '@/state';

import { CvItem } from '../../types';
import styles from './style.module.scss';

const { actions } = editorSlice;

export type SelectableCardProps = React.PropsWithChildren<{
  item: CvItem
}>


export function SelectableCard(props: SelectableCardProps) {
  const store = useStore();
  const selectedItem = useSelector(selectSelectedItem);

  function handleFocus(evt: React.FocusEvent<HTMLDivElement>) {
    evt.stopPropagation();
    store.dispatch(actions.setSelectedItem(props.item));
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

  return (
    <StyledSelectableCard
      tabIndex={0}
      isSelected={selectedItem === props.item}
      onFocus={handleFocus}
    >
      {props.children}
    </StyledSelectableCard>
  );
}

const StyledSelectableCard = styled.div<{isSelected: boolean}>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;

  ${(props) => props.isSelected && `
    outline: 2px solid ${props.theme.colors.gray.background};
    transform: scale(1);
    z-index: 1;
  `};
`;
