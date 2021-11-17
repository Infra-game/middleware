// /*const express = require('express');
// const app = express();
// app.listen(3000, () => {console.log('server is listening on port 3000')});
// */
// const express = require('express');
// const fs = require('fs');
// const { hostname } = require('os');
// const path = require ('path');
// const {NodeSSH} = require ('node-ssh');

// const app = express();
// const ssh = new NodeSSH();

// app.listen(3000, () => {console.log('server is listening on port 3000')});

// app.get ('/commande/VMBuild', (req,res) => {
//         ssh.connect({
//             host: '192.168.68.91',
//             username: 'user',
//             port: 22,
//             password: 'Infra1!game2021',
//           })
//     .then(function() {
//         ssh.execCommand('apt update').then(function(result) {
//             res.send(result.stdout);
//             console.log(result.stdout);
//         })
        
//     })

const express = require('express');
const fs = require('fs');
const { hostname } = require('os');
const path = require ('path');
const puppeteer = require ('puppeteer');
const morgan = require ('morgan');
const winston = require('winston');


const app = express();


app.listen(3000, () => {console.log('server is listening on port 3000')});

// (async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     await page.goto('http://192.168.68.86:3000')
//     console.log('creation de page web')
// })

app.get('/', morgan('combined'), (req, res) => {
    res.send(winston);

});
'use strict'
const remoteLog = new winston.transports.Http({
  host: "192.168.68.86",
  port: 3000,
  path: "/errors"
})
const consoleLog = new winston.transports.Console()

module.exports = {
    requestLogger: createRequestLogger([consoleLog]),
    errorLogger: createErrorLogger([remoteLog, consoleLog])
}

function createRequestLogger(transports) {
    const requestLogger = winston.createLogger({
        format: getRequestLogFormatter(),
        transports: transports
    })

    return function logRequest(req, res, next) {
        requestLogger.info({req, res})
        next()
    }
}

function createErrorLogger(transports) {
    const errLogger = winston.createLogger({
        level: 'error',
        transports: transports
    })

    return function logError(err, req, res, next) {
        errLogger.error({err, req, res})
        next()
    }
}

function getRequestLogFormatter() {
    const {combine, timestamp, printf} = winston.format;

    return combine(
        timestamp(),
        printf(info => {
            const {req, res} = info.message;
        })
    );
}

// const loggers = {
// mjson: winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   transports: [new winston.transports.File({ filename: 'app-info.log'})],
// }),

// simple: winston.createLogger({
//   level: 'error',
//   format: winston.format.simple(),
//   transports: [new winston.transports.File({ filename: 'app-error.log'}),],
// })
// };

// loggers.mjson.info('Information message');
// loggers.mjson.error('Error message');
// loggers.mjson.debug('Some message');

// loggers.simple.error('Error message');
// loggers.simple.info('Information message');
// loggers.simple.warn('Warning message');
// loggers.simple.debug('Some message');