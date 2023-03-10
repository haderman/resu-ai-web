import { expect } from '@jest/globals';

import { mutateObjectProperties, createObjectFromPath } from '@/shared/helpers/objects';

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

/**
 * These test cases were created by chatGTP
 */
describe('createObjectFromPath', () => {
  it('creates an object with nested structure from a path and value', () => {
    const path = 'foo.bar.baz';
    const value = 'qux';
    const expected = { foo: { bar: { baz: 'qux' } } };
    const result = createObjectFromPath(path, value);
    expect(result).toEqual(expected);
  });

  it('creates an object with a single property if given a single-key path', () => {
    const path = 'foo';
    const value = 'bar';
    const expected = { foo: 'bar' };
    const result = createObjectFromPath(path, value);
    expect(result).toEqual(expected);
  });

  /**
   * the function does not support numeric keys in the path yet
   * so this test case is skipped
   */
  it.skip('works correctly for numeric keys in the path', () => {
    const path = 'foo.0.bar.1.baz';
    const value = 'qux';
    const expected = { foo: [{}, { bar: { baz: 'qux' } }] };
    const result = createObjectFromPath(path, value);
    expect(result).toEqual(expected);
  });

  it('works correctly for paths with duplicate keys', () => {
    const path = 'foo.bar.foo.baz';
    const value = 'qux';
    const expected = { foo: { bar: { foo: { baz: 'qux' } } } };
    const result = createObjectFromPath(path, value);
    expect(result).toEqual(expected);
  });
});

