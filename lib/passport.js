const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

/* passport.use(new LocalStrategy(
    
    async (username, password, done) => {
  
    //const { fullname } = req.body;
    let newUser = {
      //fullname,
      username,
      password
    };

    newUser.password = await helpers.encryptPassword(password);
    // Saving in the Database
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
  })); */

  passport.use(new LocalStrategy(async (username, password, done) => {
      let newUser = {
          username,
          password
      }
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query('INSERT INTO users SET ? ', newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
  }));
      

//se guardan los datos del usuario para que mantenga la sesion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});

