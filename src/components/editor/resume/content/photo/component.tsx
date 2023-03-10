import Image from 'next/image';

import { Box } from '@/components/editor/common';

export function Photo() {

  return (
    <Box color="black" as="picture">
      <Image
        src="/profile-photo.png"
        alt="CV photo"
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );
}
