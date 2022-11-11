/**
 * @jest-environment node
 */

import { expect } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import * as nextAuth from 'next-auth';
import { nanoid } from 'nanoid';

import handler from '@/pages/api/resume';
import { Resume } from '@/shared/types';

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
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
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
  },
  style: {
    theme: 'dark-space',
    layout: 'layout-a',
  }
};

let resumeMockUpdated: Resume = {
  ...resumeMock,
  content: {
    ...resumeMock.content,
    fullName: 'Software Engineer (edited)',
    jobTitle: 'Software Engineer (edited)',
  },
  style: {
    ...resumeMock.style,
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
      method: 'PUT',
      body: resumeMockUpdated,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(resumeMockUpdated),
    );
  });

  test('return resume updated', async () => {
    const { req, res } = createMocks({ method: 'GET' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(resumeMockUpdated);
  });

  test('delete resume', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: {
        resumeId: resumeMockUpdated.id,
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
