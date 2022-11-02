import { expect } from '@jest/globals';
// import Fuzz from 'jest-fuzz';

import { Profile } from '@/shared/types/resume';
import { Fuzz, FuzzerSchema } from '@/server/test-helpers/fuzzer';

var profileFuzzerSchema: FuzzerSchema<Profile> = {
  title: Fuzz.string(),
  description: Fuzz.string(),
};

var profileFuzzer = Fuzz.Fuzzer(profileFuzzerSchema);

describe('Profile type', () => {
  // based on this https://www.brianthicks.com/post/2017/04/24/add-safety-to-your-elm-json-encoders-with-fuzz-testing/
  Fuzz.test('serialization', profileFuzzer(), (data: Profile) => {
    const encodedResume = Profile.encode(data);
    const decodedResume = Profile.decode(encodedResume);
    expect(decodedResume).toEqual(data);
  });
});
