const path = require('path');
const fs = require('fs');
const { jsWithTs: tsjPreset } = require('ts-jest/presets');

const presets = require('../lib/presets');

let envConfigPath = path.resolve(__dirname, './jest/fallback.env.config.js');
const appEnvConfigPath = path.resolve(process.cwd(), './env.config.js');

if (fs.existsSync(appEnvConfigPath)) {
  envConfigPath = appEnvConfigPath;
}

module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  setupFiles: [
    path.resolve(__dirname, 'jest/setupTest.js'),
  ],
  rootDir: process.cwd(),
  moduleNameMapper: {
    '\\.svg': path.resolve(__dirname, 'jest/svgrMock.jsx'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': path.resolve(__dirname, 'jest/fileMock.js'),
    '\\.(css|scss)$': 'identity-obj-proxy',
    'env.config': envConfigPath,
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'setupTest.js',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@(open)?edx)',
  ],
  transform: {
    '^.+\\.jsx?$': [
      'babel-jest',
      {
        configFile: presets.babel.resolvedFilepath,
      },
    ],
    ...tsjPreset.transform,
  },
  watchPathIgnorePatterns: [
    '/node_modules/',
  ],
};
