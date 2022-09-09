import styled from 'styled-components';

import { Text } from './text';
import { Size } from '../types';

export type ChipProps = React.PropsWithChildren<{
  size?: Size
}>;

export function Chip(props: ChipProps) {
  return (
    <ChipContainer>
      <Text size={props.size}>{props.children}</Text>
    </ChipContainer>
  );
}

const ChipContainer = styled.span`
  padding: .5mm;
  border: 0.3mm solid hsl(0, 0%, 80%);
  display: inline-block;
  border-radius: 1.6mm;
  font-size: 3.5mm;
`;
