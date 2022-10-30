import { expect } from '@jest/globals';
import Fuzz from 'jest-fuzz';

import { Resume } from '@/shared/types/resume';

var contentFuzzer = Fuzz.Fuzzer({
  fullName: Fuzz.string(),
  jobTitle: Fuzz.string(),
});

var resumeFuzzer = Fuzz.Fuzzer({
  id: Fuzz.string(),
  userId: Fuzz.string(),
  content: contentFuzzer(),
});

describe('Resume type', () => {
  // based on this https://www.brianthicks.com/post/2017/04/24/add-safety-to-your-elm-json-encoders-with-fuzz-testing/
  Fuzz.test('serialization', resumeFuzzer(), (data: Resume) => {
    const encodedResume = Resume.encode(data);
    const decodedResume = Resume.decode(encodedResume);
    expect(decodedResume).toEqual(data);
  });
});
