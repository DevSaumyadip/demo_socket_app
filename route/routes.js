const express = require('express');
const router = express.Router();


// Routes
router.get('/', async (req, res) => {
    try {
        return res.send({ message: 'hart beat is alive', data: "" });
    } catch (err) {
        return res.send({ message: 'server error', data: err });
    }
});

// router.post('/register', async (req, res) => {
//     try {
//         let { name, email, phone, message } = req.body;
//         fs.readFile(db, 'utf8', (err, jsonString) => {
//             if (err) {
//                 return res.send({ message: 'error with json db', data: err });
//             } else {
//                 let arrayOfObjects = JSON.parse(jsonString);
//                 last = Object.keys(arrayOfObjects.table)[Object.keys(arrayOfObjects.table).length - 1];
//                 arrayOfObjects.table.push({
//                     _id: typeof last !== "undefined" ? parseInt(last) + 1 : 0,
//                     name: name,
//                     email: email,
//                     phone: phone,
//                     message: message
//                 })
//                 fs.writeFile(db, JSON.stringify(arrayOfObjects), (err) => {
//                     if (err) {
//                         return res.send({ message: 'error with json db', data: err });
//                     } else {
//                         return res.send({ message: ' you have been successfully registared ', data: { name, email, phone, message } });
//                     }
//                 });
//             }
//         });
//     } catch (err) {
//         console.log(err);
//         return res.send({ message: 'server error', data: err });
//     }
// });


module.exports = router;