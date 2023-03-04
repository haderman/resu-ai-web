import { expect } from '@jest/globals';

import { Resume, ResumeContent } from '@/shared/types/resume';
import {
  FuzzerSchema,
  Fuzz,
  profileFuzzer,
  skillsFuzzer,
  basicInfoFuzzer,
  contactFuzzer,
} from '@/server/test-helpers';

/**
 * ResumeContent schema
 */
var contentFuzzerSchema: FuzzerSchema<ResumeContent> = {
  basicInfo: basicInfoFuzzer(),
  profile: profileFuzzer(),
  skills: skillsFuzzer(),
  experience: Fuzz.undefined(),
  contact: contactFuzzer(),
};

var contentFuzzer = Fuzz.Fuzzer(contentFuzzerSchema);

/**
 * ResumeStyle schema
 */
var styleFuzzerSchema: FuzzerSchema<Resume['style']> = {
  theme: Fuzz.theme(),
};

var styleFuzzer = Fuzz.Fuzzer(styleFuzzerSchema);

/**
 * Resume schema
 */
var resumeFuzzerSchema: FuzzerSchema<Resume> = {
  id: Fuzz.string(),
  userId: Fuzz.string(),
  content: contentFuzzer(),
  style: styleFuzzer(),
  layout: Fuzz.layout(),
  sections: Fuzz.sections(),
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
