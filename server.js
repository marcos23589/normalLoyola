const express=require('express');
const router=require('./routes');
const exphbs = require('express-handlebars');
const path=require('path');
const morgan=require('morgan');


const port = '3000';
const app=express();


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


app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', router());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port,()=>{
    console.log('escuchando en el puerto',port);
})