import { expect } from '@jest/globals';

import { Profile } from '@/shared/types/resume';
import { Fuzz, profileFuzzer } from '@/server/test-helpers';

describe('Profile type', () => {
  // based on this https://www.brianthicks.com/post/2017/04/24/add-safety-to-your-elm-json-encoders-with-fuzz-testing/
  Fuzz.test('serialization', profileFuzzer(), (data: Profile) => {
    const encodedProfile = Profile.encode(data);
    const decodedProfile = Profile.decode(encodedProfile);
    expect(decodedProfile).toEqual(data);
  });
});
