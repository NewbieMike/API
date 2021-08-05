const express = require('express');
const router = express.Router();
const randomID = require('@newbiemike/randomid-generator');

const db = require('../db');

// Całe DB
router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials);
});
// Konkretny element DB
router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials[`${req.params.id}`]);
});
// Losowy wynik DB
router.route('/testimonials/:random').get((req, res) => {
    const random = Math.floor(Math.random() * db.testimonials.length);
	res.json(db.testimonials[random]);
});
// Dodawanie rekordu
router.route('/testimonials').post((req, res) => {
    const enteredData = {
        id: randomID(9),
        author: req.body.author,
        text: req.body.text,
    }
    db.testimonials.push(enteredData);
    res.json({message: 'Data added!'})
})
//Modyfikacja rekordu
router.route('/testimonials/:id').put((req, res) => {
    db.testimonials[req.params.id].author = req.body.author;
	db.testimonials[req.params.id].text = req.body.text;
	res.json({ message: 'Data changed!' });
})
//Usuwanie rekordu
router.route('/testimonials/:id').delete((req, res) => {
	db.testimonials.splice(`${req.params.id}`, 1);
	res.json({ message: 'Data deleted!' });
});

module.exports = router;