const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const authController = require("../controllers/authController")

router.get('/register', isNotLoggedIn, authController.registerGet);
router.post('/register', isNotLoggedIn, authController.registerPost);
router.get('/login',isNotLoggedIn,authController.logueoGet);
router.post('/login', isNotLoggedIn, authController.logueoPost);
router.get('/logout', authController.logOutGet);
router.get('/profile', isLoggedIn, authController.profileGet);    
router.get('/users',  authController.usersGet);
router.get('/deleteUser/:idUsers', authController.deleteUserGet);

module.exports = router;

    


