import { expect } from '@jest/globals';

import { FuzzerSchema, Fuzz, profileFuzzer } from '@/server/test-helpers';
import {
  Resume,
  ResumeContent,
  Skills,
  Skill,
} from '@/shared/types/resume';

/**
 * Skills schema
 */
var skillFuzzerSchema: FuzzerSchema<Skill> = {
  title: Fuzz.string(),
  yearsOfExperience: Fuzz.int({
    min: 0,
    max: 30,
  }),
};

var skillsFuzzerSchema: FuzzerSchema<Skills> = {
  entries: Fuzz.array({
    type: Fuzz.Fuzzer(skillFuzzerSchema)(),
  }),
};

var skillsFuzzer = Fuzz.Fuzzer(skillsFuzzerSchema);

/**
 * ResumeContent schema
 */
var contentFuzzerSchema: FuzzerSchema<ResumeContent> = {
  fullName: Fuzz.string(),
  jobTitle: Fuzz.string(),
  profile: profileFuzzer(),
  skills: skillsFuzzer(),
  experience: Fuzz.undefined(),
  contact: Fuzz.undefined(),
};

var contentFuzzer = Fuzz.Fuzzer(contentFuzzerSchema);

/**
 * Resume schema
 */
var resumeFuzzerSchema: FuzzerSchema<Resume> = {
  id: Fuzz.string(),
  userId: Fuzz.string(),
  content: contentFuzzer(),
};

var resumeFuzzer = Fuzz.Fuzzer(resumeFuzzerSchema);

/**
 * Resume tests
 */
describe('Resume type', () => {
  // based on this https://www.brianthicks.com/post/2017/04/24/add-safety-to-your-elm-json-encoders-with-fuzz-testing/
  Fuzz.test('serialization', resumeFuzzer(), (data: Resume) => {
    const encodedResume = Resume.encode(data);
    const decodedResume = Resume.decode(encodedResume);
    expect(decodedResume).toEqual(data);
  });
});
