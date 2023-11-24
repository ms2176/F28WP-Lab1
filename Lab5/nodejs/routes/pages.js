const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.render('index');
});

router.post('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
