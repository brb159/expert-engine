const express = require("express");
const morgan = require("morgan");
const {engine} = require('express-handlebars');
const path = require("path");
const flash = require("connect-flash");
const sesion = require("express-session");//almacena los datos en la memoria del servidor
const mysqlstore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport"); //se importa para usar el metodo principal


//inicializaciones
const app = express();
require("./lib/passport");//validacion que creamos para que passport lo use


//configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));//establecemos el directorio de nuestras vistas
app.engine(".hbs", engine({
    defaultLayout: "main",/*Este es el código comun de todas las vistas*/ 
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname:".hbs",
    helpers: require("./lib/handlebars"),
}));

//middlewares
app.use(sesion({
    secret: "misesion",
    resave: false, //define el comportamiento de la sesion
    saveUninitialized: false, //si iniciamos sesion y no guardamos, se guarda
    store: new mysqlstore(database)
}));
app.use(flash());// Flash debe ir despues de la config de la sesion y antes de la V.Global
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); /*Esto tiene que estar antes de las rutas para que tome los json*/
app.use(passport.initialize());//de esta forma passport inicia pero no sabe donde guardar datos
app.use(passport.session());//a que sesión hace referencia, esta es la forma que passport funciona

app.set("view engine", "hbs");
//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash("success");
    next();
  });

  //Rutas
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links')); //anteponiendo links, uso ese directorio como middle


//Archivos Publicos
app.use(express.static(path.join(__dirname, "public")));

//Starting the server
app.listen(app.get("port"),()=>{
    console.log("Server funcionando en puerto", app.get("port"));
});