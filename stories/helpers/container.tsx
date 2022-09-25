import * as React from 'react';
import styled from 'styled-components';

export type ContainerProps = React.PropsWithChildren<{}>

export const Container = styled.div<ContainerProps>`
  height: 100%;
  padding: 10px;
  background: ${({ theme }) => theme.colors.primary.background};
`;
