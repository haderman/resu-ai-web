import { expect } from '@jest/globals';

import { mutateObjectProperties } from '@/shared/helpers/mutate-object-properties';

/**
 * These test cases were created by chatGTP
 */
describe('mutateObjectProperties', () => {
  it('should mutate specific properties at level 1', () => {
    const obj = {
      name: 'John Doe',
      age: 30,
      occupation: 'Engineer',
    };

    const partial = {
      age: 31,
      occupation: 'Developer',
    };

    mutateObjectProperties(obj, partial);

    expect(obj).toEqual({
      name: 'John Doe',
      age: 31,
      occupation: 'Developer',
    });
  });

  it('should mutate specific properties at level 2', () => {
    const obj = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
      },
    };

    const partial = {
      address: {
        city: 'New York',
        zip: '10001',
      },
    };

    mutateObjectProperties(obj, partial);

    expect(obj).toEqual({
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'CA',
        zip: '10001',
      },
    });
  });

  it('should not mutate properties at level 3 or deeper', () => {
    const obj = {
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      },
    };

    const partial = {
      address: {
        coordinates: {
          latitude: 40.7128,
        },
      },
    };

    mutateObjectProperties(obj, partial);

    expect(obj).toEqual({
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        coordinates: {
          latitude: 40.7128,
          longitude: -122.4194,
        },
      },
    });
  });
});
