const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path'); //PARA CONCATENAR DIRECCIONES
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');

/*********** INICIALIZACIONES ************/

//PUERTO
const port = '3000';

//PARA CREAR EL SERVIDOR
const app = express();

//PARA LA VALIDACION DE USUARIOS
require('./lib/passport');


/*********** SETTINGS ************/  

//ESTA LINEA LE DICE AL SERVER DONDE ESTÁ LA CARPETA "VIEWS"
//path.join() ES UNA FUNCION QUE NOS PERMITE CONCATENAR 
//__dirname NOS DA LA DIRECCION HASTA LA CARPETA QUE LE INDIQUEMOS
app.set("views", path.join(__dirname, "views"));


//CONFIGURAMOS EL MOTOR DE VISTAS (HANDLEBARS)
app.engine(
  ".hbs",  //DEFINIMOS EL MOTOR

  //CREAMOS UN OBJETO CON LAS CONFIGURACIONES
  exphbs({      
    defaultLayout: "main",    //PLANTILLA PRINCIPAL (LIENZO)
    layoutsDir: path.join(app.get("views"), "layouts"),   //CARPETA DONDE VA A ESTAR LA CARPETA "LAYOUTS"
    extname: ".hbs",    //EXTENSION DE LOS ARCHIVOS HANDLEBARS
    helpers: require("./lib/handlebars")    //SE EXPORTA ESTE ARCHIVO PARA SU USO EN LAS PLANTILLAS .HBS
  })
);

//ESTABLECEMOS ÉSTA CONFIGURACION COMO MOTOR DE VISTAS
app.set("view engine", ".hbs");   


/*********** MIDDLEWARES ************/ 

//CONFIGURAMOS LOS PARÁMETROS DE SESION
app.use(session({
  secret: 'keyboard cat',   //LE DAMOS UN NOMBRE A LA SESION
  resave: false,            //PARA QUE NO LA GUARDE
  saveUninitialized: false, //PARA QUE NO INICIE CON LA ÚLTIMA SESION
  store: new MySQLStore(database)  //DONDE SE GUARDA LA SESION MIENTRAS SE NAVEGA
}))

app.use(morgan('dev')); //PARA OBTENER LAS DIRECCIONES Y RESPUESTAS DEL SERVIDOR EN CONSOLA
app.use(express.urlencoded({extended: false}));   //LE DICE AL SERVER QUE CADA VEZ Q LLEGUEN DATOS DE FORMULARIOS, LOS CONVIERTA EN JSON
app.use(express.json());    //NOS PERMITE ENVIAR Y RECIBIR JSON
app.use(flash());   //PARA ENVIAR MENSAJES Y DATOS ENTRE VISTAS
app.use(passport.initialize()); //INICIALIZA EL MODULO DE PASSPORT
app.use(passport.session());    //INICIALIZA EL MODULO DE SESION DE PASSPORT


/*********** PUBLIC ************/
//ACA VAN LOS ARCHIVOS ESTÁTICOS

app.use(express.static(path.join(__dirname, 'public')));


/*********** VARIABLES GLOBALES ************/

//SON VARIABLES ACCESIBLES DESDE CUALQUIER PARTE DE LA APLICACION
// REQ -> LO REQUERIDO POR EL CLIENTE
// RES -> LA RESPUESTA DEL SERVIDOR
// NEXT() -> FUNCION PARA CONTINUAR EL PROCESO
app.use((req,res,next)=>{
  app.locals.message = req.flash('mensaje');
  app.locals.user = req.user;
  next();
})


/*********** RUTAS ************/

//ACÁ SE DEFINEN TODAS LAS RUTAS QUE SE VAN A UTILIZAR
app.use(require('./routes/autenticacion'));
app.use(require('./routes/index'));
app.use(require('./routes/alumnos')); 


/*********** SERVIDOR ************/

app.listen(port,()=>{
    console.log('escuchando en el puerto',port);
})