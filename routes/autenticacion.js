const express = require('express');
const router = express.Router();
const pool=require('../database');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

//---AUTENTICACION DE USUARIOS---//

    //  registro de usuario
    router.get('/signup', (req,res)=>{  
        res.render('auth/signup', {messages: req.flash('mensaje')});
    });

    router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    //  logueo
    router.get('/signin',(req,res)=>{  
        return res.render('auth/signin', {messages: req.flash('mensaje')});
    });

    router.post('/signin', (req,res,next)=>{
        passport.authenticate('local.signin', {           
            successRedirect: '/profile',
            failureRedirect: '/signin',
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
        res.redirect('/signin')        
    })

    router.get('/users',  async (req, res) => {
        const user = await pool.query('SELECT * FROM users');                
        return res.render('auth/users', {user, messages: req.flash('mensaje')});
    });

    router.get('/deleteUser/:idUsers', async (req,res)=>{
        console.log(req.params.idUsers);
        await pool.query('DELETE FROM users WHERE idUsers = ?', req.params.idUsers);
        // Flavio: Agregado await antes de la asignación del par:valor
        req.flash('mensaje', 'Usuario eliminado exitosamente');        
        res.redirect('/users');
    });

module.exports = router;

    


