import { expect } from '@jest/globals';

import { Profile } from '@/shared/types/resume';
import { test, fc } from '@fast-check/jest';

// Fast-check arbitrary for Profile - replicating original profileFuzzer schema
const profileArb = fc.record({
  title: fc.record({
    text: fc.string(),
    align: fc.constantFrom('left', 'center', 'right'),
    color: fc.constantFrom('primary', 'secondary', 'black', 'white', 'gray'),
    size: fc.constantFrom('none', 'small', 'medium', 'large'),
  }),
  description: fc.record({
    text: fc.string(),
    color: fc.constantFrom('primary', 'secondary', 'black', 'white', 'gray'),
    size: fc.constantFrom('none', 'small', 'medium', 'large'),
  }),
  cardStyle: fc.record({
    background: fc.constantFrom('primary', 'secondary', 'black', 'white', 'gray'),
  }),
});

/**
 * Profile tests
 */
describe('Profile type', () => {
  it('should have encode and decode methods', () => {
    expect(typeof Profile.encode).toBe('function');
    expect(typeof Profile.decode).toBe('function');
  });

  // Property-based test replicating original Fuzz.test
  // The Profile encode/decode logic intentionally injects default values when empty strings are provided
  // So we need to account for this expected behavior in our test
  // based on this https://www.brianthicks.com/post/2017/04/24/add-safety-to-your-elm-json-encoders-with-fuzz-testing/
  test.prop(
    [profileArb],
    { numRuns: 10 }
  )('should serialize and deserialize Profile data correctly', (data) => {
    const encodedProfile = Profile.encode(data as Profile);
    const decodedProfile = Profile.decode(encodedProfile);
    
    // Account for intended default value behavior
    const expectedData = {
      ...data,
      title: {
        ...data.title,
        text: data.title.text || 'Profile', // Empty strings become 'Profile'
      },
      description: {
        ...data.description,
        text: data.description.text || '', // Empty strings stay empty for description
      },
    };
    
    expect(decodedProfile).toEqual(expectedData);
  });
});
