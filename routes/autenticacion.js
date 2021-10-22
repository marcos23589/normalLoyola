const express = require('express');
const router = express.Router();
const pool=require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const alert = require('alert');

//---AUTENTICACION DE USUARIOS---//

    //  registro de usuario
    router.get('/register', isNotLoggedIn, (req,res)=>{  
        res.render('auth/register', {messages: req.flash('mensaje')});
    });

    router.post('/register', isNotLoggedIn, passport.authenticate('local.register', {
        successRedirect: '/links',
        failureRedirect: '/register',
        failureFlash: true
    }));

    //  logueo
    router.get('/login',isNotLoggedIn,(req,res)=>{  
        return res.render('auth/login', {messages: req.flash('mensaje')});
    });

    router.post('/login', isNotLoggedIn, (req,res,next)=>{
        passport.authenticate('local.login', {           
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        }) (req, res, next);
        
    })

    //  vista del perfil del usuario
    router.get('/profile', isLoggedIn,(req,res)=>{
        return res.render('auth/profile', {messages: req.flash('mensaje')})        
    })

    router.get('/logout', (req,res)=>{
        req.logOut();
        req.flash('mensaje', 'Sesión finalizada')
        alert('Sesión finalizada!');
        res.redirect('/login')        
    })

    router.get('/users',  async (req, res) => {
        const user = await pool.query('SELECT * FROM users');            
        return res.render('auth/users', {user, messages: req.flash('mensaje')});
    });

    router.get('/deleteUser/:idUsers', async (req,res)=>{
        console.log(req.params.idUsers);
        await pool.query('DELETE FROM users WHERE idUsers = ?', req.params.idUsers);        
        req.flash('mensaje', 'Usuario eliminado exitosamente');        
        res.redirect('/users');
    });

module.exports = router;

    


