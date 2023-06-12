/// <reference types="cypress" />

// import 'cypress-mochawesome-reporter/register';
require("cypress-terminal-report/src/installLogsCollector")();
import '@cypress/xpath';
import 'cypress-plugin-tab';
import { forEach } from 'cypress/types/lodash';
var fs = require('fs');
import pdfParser from 'pdf-parse'
const addContext = require('mochawesome/addContext');
import "cypress-iframe"

