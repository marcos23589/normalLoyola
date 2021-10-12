const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

//  estrategia de logueo
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    console.log('ROWS->', rows);
    if (rows.length > 0){
        //  se guarda el arreglo devuelto con los datos del usuario
        const user = rows[0];
        //  se busca validar el password pasado por formulario con el del usuario obtenido de la BD
        // devuelve un booleano
        const validPassword = await helpers.matchPassword(password, user.password);
        console.log('password', validPassword)
        if(validPassword){
            done(null, user, req.flash('mensaje','Bienvenidx'));
        }else{          
            
            done(null, false, req.flash('mensaje','Contraseña incorrecta!'));
        }
    }else{
        return done(null, false, req.flash('mensaje','Usuario o Contraseña incorrecta!'));
    }
}));

//  estrategia de registro
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
  
    //const { fullname } = req.body;
    const newUser = {
      //fullname,
      username,
      password
    };

    const consulta = await pool.query('SELECT * FROM users WHERE username = ?', username);        
    console.log('CONSULTA->',consulta)
    if (consulta.length > 0){        
         await done(null,false, req.flash('mensaje', 'Este usuario ya se encuentra registrado!'));
    }else{
        newUser.password = await helpers.encryptPassword(password);
        // se guarda en la Database
        const result = await pool.query('INSERT INTO users SET ? ', [newUser]);        
        // en "result.insertId" se encuentra el id con q se registró en la BD
        console.log('RESULT->',result)
        newUser.id = result.insertId;
        // se almacena en la sesión
        done(null, newUser, req.flash('mensaje', 'Usuario registrado!'));
    }    
  }));
  
      

// se guardan los datos del usuario para que mantenga la sesion
passport.serializeUser((user, done) => {
    console.log('SER->', user);
    done(null, user.idUsers);
  });

// método para obtener los datos del usuario a partir del id
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE idUsers = ?', id);
    console.log('DES->', rows);
    done(null, rows[0]);
  });
