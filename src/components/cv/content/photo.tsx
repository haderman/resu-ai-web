import Image from 'next/image';
import styled from 'styled-components';

export function Photo() {
  return (
    <Picture>
      <Image src="/profile-photo.png" alt="CV photo" layout="fill" objectFit="contain" />
    </Picture>
  );
}

const Picture = styled.picture`
  width: 100%;
  height: 100%;
`;

