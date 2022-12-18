import Image from 'next/image';

import { Color } from '@/shared/types';
import { Box } from '@/components/editor/common';

export type PhotoProps = {
  background?: Color
}

export function Photo(props: PhotoProps) {

  return (
    <Box color={props.background} as="picture" style={{ height: '2in', width: '2in', position: 'relative' }} >
      <Image
        src="/profile-photo.png"
        alt="CV photo"
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
}
