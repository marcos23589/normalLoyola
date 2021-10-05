const express = require('express');
const router = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash-plus');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');


const port = '3000';
const app=express();

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


app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', router());
app.use(express.static(path.join(__dirname, 'public')));

//VARIABLES GLOBALES
app.use((req,res,next)=>{
  app.locals.alerta = req.flash('alerta')
  next();
})

app.listen(port,()=>{
    console.log('escuchando en el puerto',port);
})