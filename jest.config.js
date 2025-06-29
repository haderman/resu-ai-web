// source: https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

// jest.config.js
const nextJest = require('next/jest');
const { configureNextJestPreview } = require('jest-preview');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Add more setup options before each test is run
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};

module.exports = async () => {
  const jestConfig = await configureNextJestPreview(createJestConfig(customJestConfig));
  return jestConfig;
};
