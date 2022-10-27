import { expect, jest, test } from '@jest/globals';

import { Resume } from '@/shared/types/resume';

describe('Resume', () => {
  test('should be defined', () => {
    expect(Resume.create).toBeDefined();
  });
});
