import { defineConfig } from "cypress";
import fs from 'fs'
import pdfParser from 'pdf-parse'
import {pdf_file_read, waitForFileToDownload, waitForMultipleFilesToDownload} from "./libs/admin/fileOperations"
// const pdfParser = require('pdf-parse');


const runDate = new Date();
const resultFolder = "cypress\\reports"//String("results\\D_" + runDate.getFullYear() + "-" + Number(runDate.getMonth() + 1) + "-" + runDate.getDate() + "_T_" + runDate.getHours() + "-" + runDate.getMinutes() + "-" + runDate.getSeconds());

export default defineConfig({

  viewportWidth: 1920,
   viewportHeight: 1080,
   defaultCommandTimeout: 5_000,
   pageLoadTimeout: 10_000,
   chromeWebSecurity: false,
   videoCompression: false,

//   reporter: 'mochawesome',
//   reporterOptions: {
//     reportDir: resultFolder,
//     reportFilename: "report-[status]",
//     reportPageTitle: "Mochawesome",
//     embeddedScreenshots: true,
//     charts: true,
//     html: true,
//     json: true,
//     overwrite: true,
//     inlineAssets: false,
//     saveAllAttempts: false,
//     code: false,
//     autoOpen: true,
//     quiet: false,
//     ignoreVideos: true,
//  },

  "reporter": "cypress-multi-reporters",
    "reporterOptions": {
      "reporterEnabled": "mochawesome",
      "mochawesomeReporterOptions": {
          "reportDir": resultFolder,
          "reportFilename": "reportDummy",
          "quite": true,
          "overwrite": true,
          "html": true,
          "json": true,
          "autoOpen": true,
          "screenshotOnRunFailure": true

      }
  },
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        outputRoot: resultFolder,
        outputTarget: {
          'cypress-log.txt': 'txt',
        },
        printLogsToFile: "always",
      };

      // on('task', {
      //   waitForFileToDownload
      // })

      // on('task', {
      //   waitForMultipleFilesToDownload
      // })

      // on('task', {
      //   pdf_file_read
      // })

      // on('task',{
      //   log(value){
      //     console.log(">>>>>>>>" + value)

      //     return null
      //   }
      // })
    
      require('cypress-terminal-report/src/installLogsPrinter')(on, options);
      // require('cypress-mochawesome-reporter/plugin')(on);
    },
  },

  screenshotsFolder: resultFolder + "\\screenshots",
  videosFolder: resultFolder + "\\videos",
  downloadsFolder: resultFolder + "\\downloads",
});
