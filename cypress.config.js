// const { defineConfig } = require('cypress')
import { defineConfig } from 'cypress';
import * as path from 'path';
import fs from 'fs-extra';


function getConfigurationByFile(file){
  const pathToConfigFile = path.resolve('..', 'cypress-automation/cypress/config', `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'cypress/fixtures',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
  defaultCommandTimeout: 8000,
  execTimeout: 8000,
  requestTimeout: 8000,
  responseTimeout: 8000,

  e2e: {
    setupNodeEvents(on, config) {
      const file = config.env.fileConfig;
      return getConfigurationByFile(file);
    },
  },
});
