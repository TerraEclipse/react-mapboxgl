module.exports = {
  // roots in ./tools/test-module
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '__fixtures__'
  ],
  // collectCoverageFrom in ./tools/test-module
  // coverageDirectory in ./tools/test-module
  coveragePathIgnorePatterns: [
    '__fixtures__',
    '\\.story\\.js$'
  ],
  coverageThreshold: {
    'global': {
      'branches': 60,
      'functions': 85,
      'lines': 85,
      'statements': 85
    }
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tools/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/tools/__mocks__/styleMock.js'
  }
}
