// const { createLogger, format, transports } = require('winston');

// const logger = createLogger({
//   level: 'info',
//   exitOnError: false,
//   format: format.json(),
//   transports: [
//     new transports.File({ filename: `${appRoot}/test.log` }),
//   ],
// });

// module.exports = logger;

// // Exemple de logs
// logger.log('info', 'Voici un log simple');
// logger.info('Voici un log avec des métadonnées',{color: 'blue' });

const express = require('express');
const fs = require('fs');
const { hostname } = require('os');
const path = require ('path');
const puppeteer = require ('puppeteer');
const morgan = require ('morgan');



const app = express();

app.listen(3000, () => {console.log('server is listening on port 3000')});

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://192.168.68.86:3000')
    console.log('creation de page web')
})();
app.get('/', morgan (req, res) => {
    res.send([1,2,3,4]);
});
