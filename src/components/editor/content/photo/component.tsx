import Image from 'next/image';
import styled from 'styled-components';

import { Color } from '../../types';

export type PhotoProps = {
  background?: Color
}

export function Photo(props: PhotoProps) {
  return (
    <Picture {...props}>
      <Image src="/profile-photo.png" alt="CV photo" layout="fill" objectFit="contain" />
    </Picture>
  );
}

const Picture = styled.picture<PhotoProps>`
  display: flex;
  width: 100%;
  height: 100%;

  ${(props) => props.background && `
    background-color: ${props.theme.colors[props.background].background};
  `}
`;

