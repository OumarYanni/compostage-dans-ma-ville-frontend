module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom'
}
