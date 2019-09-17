module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'src', __dirname],
  setupFiles: ['<rootDir>/jest.setup.js'],
  cacheDirectory: '.jest/cache'
};
