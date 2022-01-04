const pool = require('../database');
const passport = require('passport');

exports.registerGet = (req, res) =>{ 
    res.render('auth/register', {messages: req.flash('mensaje')});
}

exports.registerPost = passport.authenticate('local.register', {
    successRedirect: '/alumnos',
    failureRedirect: '/register',
    failureFlash: true
});

exports.logueoGet = (req, res) =>{
  return res.render('auth/login', {messages: req.flash('mensaje')});
}

exports.logueoPost = (req, res, next) => {
  passport.authenticate ('local.login', {
    successRedirect: '/alumnos',
    failureRedirect: '/login',
    failureFlash: true
  }) (req,res,next);
}

exports.profileGet = (req, res) => {
  return res.render('auth/profile' , {messages: req.flash('mensaje')});
}

exports.logOutGet = (req, res) => {
  req.logOut();
  req.flash('mensaje', 'Sesión finalizada')        
  res.redirect('/login')
}

exports.usersGet = async (req, res) => {
  const user = await pool.query('SELECT * FROM users');            
  return res.render('auth/users', {user, messages: req.flash('mensaje')});
}

exports.deleteUserGet = async (req,res)=>{
  console.log(req.params.idUsers);
  await pool.query('DELETE FROM users WHERE idUsers = ?', req.params.idUsers);        
  req.flash('mensaje', 'Usuario eliminado exitosamente');        
  res.redirect('/users');
}