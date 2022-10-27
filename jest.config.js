// source: https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

// jest.config.js
const nextJest = require('next/jest');
const { configureNextJestPreview } = require('jest-preview');

// if npm run jest throws an error regarding to import some library using esModules, add it here
const esModules = ['nanoid'];

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
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [`/node_modules/(?!(${esModules.join('|')})/)`],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};

module.exports = async () => {
  const jestConfig = await configureNextJestPreview(createJestConfig(customJestConfig));
  return {
    ...jestConfig,
    transformIgnorePatterns: jestConfig.transformIgnorePatterns.filter(
      (ptn) => ptn !== '/node_modules/'
    ), // ['^.+\\.module\\.(css|sass|scss)$', '/node_modules/(?!(package1|package2)/']
  };
};
