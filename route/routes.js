const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = './database/database.json';

// Routes
router.get('/', async (req, res) => {
    try {
        return res.send({ message: 'hart beat is alive', data: "" });
    } catch (err) {
        return res.send({ message: 'server error', data: err });
    }
});

router.get('/all-users', async (req, res) => {
    try {
        fs.readFile(db, 'utf8', (err, jsonString) => {
            if (err) {
                return res.send({ message: 'error with json db', data: err });
            } else { 
                let arrayOfObjects = JSON.parse(jsonString);
                return res.send({ message: 'all users', data: arrayOfObjects });
            }
        });
    } catch (err) {
        return res.send({ message: 'server error', data: err });
    }
});

module.exports = router;
