/**
 * @jest-environment node
 */

import { expect } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import * as nextAuth from 'next-auth';
import { nanoid } from 'nanoid';

import handler from '@/pages/api/resume';
import handlerResume from '@/pages/api/resume/[id]';
import { DeepPartial, Resume } from '@/shared/types';

jest.mock('next-auth');

/**
 * Mocks
 */
let sessionMock: nextAuth.Session = {
  expires: '10000',
  user: {
    id: '_set_by_beforeAll_',
    email: 'test@example.com',
    name: 'testerman',
    image: 'c',
  },
};

let resumeMock: Resume = {
  id: '_set_by_beforeAll_',
  userId: '_set_by_beforeAll_',
  content: {
    basicInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
    },
    contact: {
      cardStyle: {
        background: 'white',
      },
      data: {
        email: 'test@example.com',
      }
    },
    profile: {
      title: {
        text: 'Profile',
        align: 'left',
        color: 'black',
        size: 'medium',
      },
      description: {
        text: 'I am a software engineer',
        color: 'black',
        size: 'small',
      },
      cardStyle: {
        background: 'white',
      },
    },
    skills: {
      items: [
        { title: 'JavaScript', yearsOfExperience: 5 },
        { title: 'TypeScript', yearsOfExperience: 3 },
        { title: 'React', yearsOfExperience: 3 },
      ],
      title: {
        text: 'Skills',
        align: 'left',
        color: 'black',
        size: 'medium',
      },
      itemStyle: {
        background: 'white',
        color: 'black',
        size: 'small',
      },
      cardStyle: {
        background: 'white',
      },
    },
    experience: {
      title: {
        text: 'Experience',
        align: 'left',
        color: 'black',
        size: 'medium',
      },
      style: {
        background: 'white',
      },
      entryStyle: {
        background: 'white',
      },
      entries: [
        {
          title: 'Software Engineer',
          company: 'Google',
          startDate: '2020-01-01',
          endDate: '2020-12-31',
          description: 'I worked at Google',
        },
      ],
    }
  },
  style: {
    theme: 'dark-space',
  },
  layout: [
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
  ],
  sections: [
    'photo',
    'profile',
    'contact',
    'skills',
    'experience',
    'projects',
  ],
};

let resumeMockUpdated: Resume = {
  ...resumeMock,
  content: {
    ...resumeMock.content,
    basicInfo: {
      fullName: 'John Doe Updated',
      jobTitle: 'Software Engineer Updated',
    },
  },
};

let resumeValuesToUpdate: DeepPartial<Resume> = {
  content: {
    basicInfo: {
      fullName: 'John Doe Updated',
      jobTitle: 'Software Engineer Updated',
    },
  },
};

// @ts-ignore
nextAuth.unstable_getServerSession.mockResolvedValue(sessionMock);

/**
 * Tests
 */
describe('/api/resume', () => {
  beforeAll(() => {
    resumeMock.id = resumeMockUpdated.id = `test_${nanoid()}`;
    sessionMock.user.id = resumeMock.userId = resumeMockUpdated.userId = `test_${nanoid()}`;
  });

  test('create resume', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: resumeMock,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(resumeMock),
    );
  });

  test('return resume created', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(resumeMock);
  });

  test('update resume', async () => {
    const { req, res } = createMocks({
      method: 'PATCH',
      body: resumeValuesToUpdate,
      query: {
        id: resumeMock.id,
      },
    });

    await handlerResume(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({ msg: 'Ok' }),
    );
  });

  test('return resume updated', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: resumeMock.id,
      },
    });

    await handlerResume(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(resumeMockUpdated);
  });

  test('delete resume', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      query: {
        id: resumeMockUpdated.id,
      },
    });

    await handlerResume(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
