const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
// Agregada por Flavio
const { flash } = require('express-flash-message');
//const flash = require('connect-flash-plus');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');

//INICIALIZACIONES
const port = '3000';
const app=express();
require('./lib/passport');

//SETTINGS  
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

//MIDDLEWARES
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))
// Modificada por Flavio
app.use(flash({ sessionKeyName: 'flashMessage' }))
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', router());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


//VARIABLES GLOBALES
app.use((req,res,next)=>{
  app.locals.alerta = req.flash('alerta')
  app.locals.mensaje = req.flash('mensaje')
  next();
})

app.listen(port,()=>{
    console.log('escuchando en el puerto',port);
})