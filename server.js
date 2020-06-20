const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const route = require('./route/routes.js');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const db = './database/database.json';
const service = require('./service/index.js');

const {
    PORT = 8981
} = process.env

/**
 * Initialize BodyParser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Initialize Route
 */
app.use('/api', route);
/**
 * Initialize Header
 */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, apikey, token, accept-language');
    next();
});

/**
 * Initialize Static Path
*/
function initializeStaicPath() {
    app.use('/', express.static(path.join(__dirname, 'public')));
}


function init() {
    initializeStaicPath();
}

/**
 * Call init 
 */
init();

server.listen(PORT, () => console.log(`Weather Station app listening on port ${PORT}!`))

io.on('connection', (socket) => {
    socket.on('form-submit', (data) => {
        let { name, email, phone, message } = data;
        fs.readFile(db, 'utf8', (err, jsonString) => {
            if (err) {
                //return res.send({ message: 'error with json db', data: err });
            } else {
                let arrayOfObjects = JSON.parse(jsonString);
                last = Object.keys(arrayOfObjects.table)[Object.keys(arrayOfObjects.table).length - 1];
                arrayOfObjects.table.push({
                    _id: typeof last !== "undefined" ? parseInt(last) + 1 : 0,
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                });
                fs.writeFile(db, JSON.stringify(arrayOfObjects), (err,data) => {
                    if (err) {
                        //return res.send({ message: 'error with json db', data: err });
                    } else {
                        //return res.send({ message: ' you have been successfully registared ', data: { name, email, phone, message } });
                        let options = {
                            name: name,
                            to: email,
                            phone: phone
                        }
                        service.mailNotification.sendMail(options);
                        service.smsNotification.sendSms(options);
                    }
                });
            }
        });
    });
});