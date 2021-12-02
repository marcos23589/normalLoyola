const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
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
    //partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

//MIDDLEWARES
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}))

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

//VARIABLES GLOBALES
app.use((req,res,next)=>{
  app.locals.message = req.flash('mensaje');
  app.locals.user = req.user;
  next();
})

//RUTAS
app.use(require('./routes/autenticacion'));
app.use(require('./routes/index'));
app.use(require('./routes/alumnos'));

//SERVIDOR
app.listen(port,()=>{
    console.log('escuchando en el puerto',port);
})