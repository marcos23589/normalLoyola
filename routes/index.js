const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

    router.get('/', (req, res) => {
        res.render('home')
    });  
    
module.exports = router;



