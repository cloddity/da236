module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    'react-router-dom': '<rootDir>/__mocks__/react-router-dom.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};